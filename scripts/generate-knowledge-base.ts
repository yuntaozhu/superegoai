import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

// --- Configuration ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const CONTENT_BASE_DIR = path.join(ROOT_DIR, 'prompt-engineering', 'pages');
const IMG_BASE_DIR = path.join(ROOT_DIR, 'prompt-engineering', 'img');
const OUTPUT_FILE = path.join(ROOT_DIR, 'src', 'generated', 'knowledge_base.json');
const LOG_FILE = path.join(ROOT_DIR, 'scripts', 'indexing_errors.log');

// Ensure output directory exists
if (!fs.existsSync(path.dirname(OUTPUT_FILE))) {
  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
}

// Clear log file
fs.writeFileSync(LOG_FILE, `Indexing Log - ${new Date().toISOString()}\n\n`);

interface IndexEntry {
  id: string;
  path: string;
  title: string;
  description?: string;
  category: string;
  language: 'zh' | 'en';
  source_type: 'zh_native' | 'en_fallback' | 'en_native';
  content: string;
  headers: string[];
  images: string[];
  last_updated_hash: string;
  meta_order?: number;
}

const entries: IndexEntry[] = [];

// --- Helpers ---

function logError(message: string) {
  console.error(`[ERROR] ${message}`);
  fs.appendFileSync(LOG_FILE, `[ERROR] ${message}\n`);
}

function calculateHash(content: string): string {
  return crypto.createHash('md5').update(content).digest('hex');
}

function extractHeaders(content: string): string[] {
  // Extract H1, H2, H3
  const regex = /^#{1,3}\s+(.+)$/gm;
  const headers: string[] = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    headers.push(match[1].trim());
  }
  return headers;
}

function extractAndValidateImages(content: string, filePath: string): string[] {
  // Matches markdown images: ![alt](url) and HTML/Component images: <img src="url" /> or <Screenshot src="url" />
  const regex = /!\[.*?\]\((.*?)\)|<(?:img|Screenshot).*?src=["'](.*?)["']/g;
  const images: string[] = [];
  let match;

  while ((match = regex.exec(content)) !== null) {
    const imgPathRaw = match[1] || match[2];
    if (!imgPathRaw) continue;

    // Resolve path relative to img folder
    // Assuming paths typically start with /img/ or ../img/ or just img/
    let cleanName = imgPathRaw.split('/').pop() || '';
    
    // Check if file exists in prompt-engineering/img
    const physicalPath = path.join(IMG_BASE_DIR, cleanName);
    
    if (fs.existsSync(physicalPath)) {
      images.push(`/img/${cleanName}`);
    } else {
      logError(`Image not found: "${imgPathRaw}" referenced in ${filePath}`);
    }
  }
  return images;
}

function parseMDX(filePath: string) {
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { content, data } = matter(raw);
  return { content, frontmatter: data };
}

// --- Main Indexing Logic ---

async function processDirectory(dirPath: string, categoryId: string) {
  const metaPathZh = path.join(dirPath, '_meta.zh.json');
  const metaPathEn = path.join(dirPath, '_meta.en.json');
  
  // Use English meta as the source of truth for structure, fallback to directory listing if missing
  let metaStructure: Record<string, string> = {};
  
  if (fs.existsSync(metaPathZh)) {
    try {
      metaStructure = JSON.parse(fs.readFileSync(metaPathZh, 'utf-8'));
    } catch (e) {
      logError(`Failed to parse ${metaPathZh}`);
    }
  } else if (fs.existsSync(metaPathEn)) {
    try {
        metaStructure = JSON.parse(fs.readFileSync(metaPathEn, 'utf-8'));
    } catch (e) {
        logError(`Failed to parse ${metaPathEn}`);
    }
  } else {
    // If no meta, read directory
    const files = fs.readdirSync(dirPath);
    files.forEach(f => {
      if (f.endsWith('.zh.mdx') || f.endsWith('.en.mdx')) {
        const id = f.replace(/\.(zh|en)\.mdx$/, '');
        metaStructure[id] = id; // Placeholder title
      }
    });
  }

  const items = Object.entries(metaStructure);
  
  for (let i = 0; i < items.length; i++) {
    const [id, titleFromMeta] = items[i];
    
    // Skip separators or menus if they exist in meta
    if (typeof titleFromMeta !== 'string') continue;

    const zhPath = path.join(dirPath, `${id}.zh.mdx`);
    const enPath = path.join(dirPath, `${id}.en.mdx`);
    const virtualPath = `${categoryId}/${id}`;

    let finalContent = '';
    let finalLang: 'zh' | 'en' = 'zh';
    let sourceType: 'zh_native' | 'en_fallback' | 'en_native' = 'zh_native';
    let finalFrontmatter: any = {};
    let usedFilePath = '';

    // 1. Try Loading Chinese
    const zhData = parseMDX(zhPath);
    
    // Validation Logic for ZH content
    let isZhValid = false;
    if (zhData) {
        // Check for placeholder content or very short content
        const cleanContent = zhData.content.trim();
        if (cleanContent.length > 50 && !cleanContent.includes("同步中") && !cleanContent.includes("Content pending")) {
            isZhValid = true;
        }
    }

    if (isZhValid && zhData) {
        finalContent = zhData.content;
        finalFrontmatter = zhData.frontmatter;
        finalLang = 'zh';
        sourceType = 'zh_native';
        usedFilePath = zhPath;
    } else {
        // 2. Fallback to English
        const enData = parseMDX(enPath);
        if (enData) {
            finalContent = enData.content;
            finalFrontmatter = enData.frontmatter;
            finalLang = 'en'; // It is effectively English content
            sourceType = 'en_fallback';
            usedFilePath = enPath;
            // logError(`Fallback used for: ${virtualPath} (ZH missing or incomplete)`);
        } else {
            // Orphan Logic
            logError(`Orphan detected: ${virtualPath} (No valid ZH or EN file found)`);
            continue; 
        }
    }

    // 3. Extract Metadata
    const headers = extractHeaders(finalContent);
    const images = extractAndValidateImages(finalContent, usedFilePath);
    const hash = calculateHash(finalContent);

    entries.push({
        id: id,
        path: virtualPath,
        title: finalFrontmatter.title || titleFromMeta, // Frontmatter overrides meta
        description: finalFrontmatter.description || '',
        category: categoryId,
        language: finalLang,
        source_type: sourceType,
        content: finalContent,
        headers: headers,
        images: images,
        last_updated_hash: hash,
        meta_order: i
    });
  }
}

async function main() {
  console.log('🚀 Starting Knowledge Base Indexing...');
  
  // Define categories to scan based on folder structure
  const categories = ['techniques', 'applications', 'models', 'prompts', 'risks', 'research', 'agents', 'introduction', 'guides'];

  for (const cat of categories) {
    const catDir = path.join(CONTENT_BASE_DIR, cat);
    if (fs.existsSync(catDir)) {
        await processDirectory(catDir, cat);
    } else {
        logError(`Category directory not found: ${catDir}`);
    }
  }

  // Write Output
  const outputData = {
    generated_at: new Date().toISOString(),
    total_entries: entries.length,
    entries: entries
  };

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(outputData, null, 2));
  console.log(`✅ Indexing complete. Generated ${entries.length} entries.`);
  console.log(`📂 Output saved to: ${OUTPUT_FILE}`);
  console.log(`⚠️ Check ${LOG_FILE} for any validation errors.`);
}

main().catch(err => {
  console.error('Fatal Error during indexing:', err);
  (process as any).exit(1);
});
