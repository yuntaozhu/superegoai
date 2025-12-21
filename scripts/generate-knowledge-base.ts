
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
const OUTPUT_DIR = path.join(ROOT_DIR, 'generated');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'knowledge_base.json');
const LOG_FILE = path.join(ROOT_DIR, 'scripts', 'indexing_errors.log');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
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
    let imgPathRaw = match[1] || match[2];
    if (!imgPathRaw) continue;

    // Clean up path (remove query params, etc)
    imgPathRaw = imgPathRaw.split('?')[0];

    // Resolve path relative to img folder
    const cleanName = path.basename(imgPathRaw);
    
    // Check if file exists in prompt-engineering/img
    const physicalPath = path.join(IMG_BASE_DIR, cleanName);
    
    if (fs.existsSync(physicalPath)) {
      images.push(`/img/${cleanName}`);
    } else {
      // Log error but allow build to proceed
      // logError(`Image not found: "${imgPathRaw}" referenced in ${filePath}`);
    }
  }
  return images;
}

function parseMDX(filePath: string) {
  if (!fs.existsSync(filePath)) return null;
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { content, data } = matter(raw);
    return { content, frontmatter: data };
  } catch (e) {
    logError(`Error parsing MDX ${filePath}: ${e}`);
    return null;
  }
}

// --- Main Indexing Logic ---

async function processDirectory(dirPath: string, categoryId: string) {
  const metaPathZh = path.join(dirPath, '_meta.zh.json');
  const metaPathEn = path.join(dirPath, '_meta.en.json');
  
  // Use Chinese meta as primary structure if available, else English
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
        metaStructure[id] = id; 
      }
    });
  }

  const items = Object.entries(metaStructure);
  
  for (let i = 0; i < items.length; i++) {
    const [id, titleFromMeta] = items[i];
    
    // Skip separators or menus
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
        const cleanContent = zhData.content.trim();
        // Simple heuristic for "empty" or placeholder files
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
            finalLang = 'en'; 
            sourceType = 'en_fallback';
            usedFilePath = enPath;
        } else {
            // Orphan Logic
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
  
  // Define categories to scan
  const categories = ['introduction', 'techniques', 'agents', 'guides', 'applications', 'prompts', 'models', 'risks', 'research'];

  for (const cat of categories) {
    const catDir = path.join(CONTENT_BASE_DIR, cat);
    if (fs.existsSync(catDir)) {
        await processDirectory(catDir, cat);
    }
  }

  // Write Output using Atomic Write Pattern
  // This prevents the frontend from reading a partial file during the write process
  const outputData = {
    generated_at: new Date().toISOString(),
    total_entries: entries.length,
    entries: entries
  };

  const tempFile = OUTPUT_FILE + '.tmp';
  fs.writeFileSync(tempFile, JSON.stringify(outputData, null, 2));
  fs.renameSync(tempFile, OUTPUT_FILE);

  console.log(`✅ Indexing complete. Generated ${entries.length} entries.`);
  console.log(`📂 Output saved to: ${OUTPUT_FILE}`);
}

main().catch(err => {
  console.error('Fatal Error during indexing:', err);
  (process as any).exit(1);
});
