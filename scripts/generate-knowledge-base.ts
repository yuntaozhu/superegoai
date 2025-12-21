
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
const BLOG_BASE_DIR = path.join(ROOT_DIR, 'blog', 'posts');
const IMG_BASE_DIR = path.join(ROOT_DIR, 'prompt-engineering', 'img'); // Shared image dir for now
const OUTPUT_DIR = path.join(ROOT_DIR, 'generated');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'knowledge_base.json');
const LOG_FILE = path.join(ROOT_DIR, 'scripts', 'indexing_errors.log');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Clear log file
fs.writeFileSync(LOG_FILE, `Indexing Log - ${new Date().toISOString()}\n\n`);

interface LocaleEntry {
  title: string;
  description?: string;
  content: string;
  headers: string[];
  frontmatter: Record<string, any>;
}

interface IndexEntry {
  id: string;
  path: string;
  category: string;
  locales: {
    zh?: LocaleEntry;
    en?: LocaleEntry;
  };
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
    // Note: For blog, we might want a separate logic, but sticking to shared folder for simplicity 
    // or absolute URLs.
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
      if (f.endsWith('.zh.mdx') || f.endsWith('.en.mdx') || f.endsWith('.mdx')) {
        const id = f.replace(/\.(zh|en)?\.mdx$/, '');
        metaStructure[id] = id; 
      }
    });
  }

  const items = Object.entries(metaStructure);
  
  for (let i = 0; i < items.length; i++) {
    const [id, titleFromMeta] = items[i];
    
    // Skip separators or menus
    if (typeof titleFromMeta !== 'string') continue;

    // Support standard .zh.mdx and .mdx as default
    let zhPath = path.join(dirPath, `${id}.zh.mdx`);
    if (!fs.existsSync(zhPath)) {
        zhPath = path.join(dirPath, `${id}.mdx`);
    }
    
    const enPath = path.join(dirPath, `${id}.en.mdx`);
    const virtualPath = `${categoryId}/${id}`;

    let zhEntry: LocaleEntry | undefined;
    let enEntry: LocaleEntry | undefined;
    let images: string[] = [];

    // 1. Load Chinese (or default)
    const zhData = parseMDX(zhPath);
    if (zhData) {
        const cleanContent = zhData.content.trim();
        // Validation: Simple heuristic for "empty" files (relaxed threshold to 10 chars)
        if (cleanContent.length > 10 && !cleanContent.includes("同步中") && !cleanContent.includes("Content pending")) {
            zhEntry = {
                title: zhData.frontmatter.title || titleFromMeta,
                description: zhData.frontmatter.description,
                content: zhData.content,
                headers: extractHeaders(zhData.content),
                frontmatter: zhData.frontmatter
            };
            images.push(...extractAndValidateImages(zhData.content, zhPath));
        }
    }

    // 2. Load English
    const enData = parseMDX(enPath);
    if (enData) {
        const cleanContent = enData.content.trim();
        // Validation for English as well
        if (cleanContent.length > 10) {
            enEntry = {
                title: enData.frontmatter.title || titleFromMeta, 
                description: enData.frontmatter.description,
                content: enData.content,
                headers: extractHeaders(enData.content),
                frontmatter: enData.frontmatter
            };
            images.push(...extractAndValidateImages(enData.content, enPath));
        }
    }

    // Skip if both are missing
    if (!zhEntry && !enEntry) continue;

    const hash = calculateHash((zhEntry?.content || '') + (enEntry?.content || ''));

    entries.push({
        id: id,
        path: virtualPath,
        category: categoryId,
        locales: {
            zh: zhEntry,
            en: enEntry
        },
        images: [...new Set(images)], // Dedupe
        last_updated_hash: hash,
        meta_order: i
    });
  }
}

async function main() {
  console.log('🚀 Starting Knowledge Base Indexing...');
  
  // 1. Define categories to scan from Prompt Guide
  const promptCategories = ['introduction', 'techniques', 'agents', 'guides', 'applications', 'prompts', 'models', 'risks', 'research'];

  for (const cat of promptCategories) {
    const catDir = path.join(CONTENT_BASE_DIR, cat);
    if (fs.existsSync(catDir)) {
        await processDirectory(catDir, cat);
    }
  }

  // 2. Scan Blog Posts
  if (fs.existsSync(BLOG_BASE_DIR)) {
    console.log('📝 Indexing Blog Posts...');
    await processDirectory(BLOG_BASE_DIR, 'blog');
  } else {
    console.warn('⚠️ Blog directory not found:', BLOG_BASE_DIR);
  }

  // Write Output using Atomic Write Pattern
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
