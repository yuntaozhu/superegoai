
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

interface TreeNode {
  id: string;
  titles: { en?: string; zh?: string };
  type: 'category' | 'group' | 'page';
  path?: string; // Only for pages
  children?: TreeNode[];
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
  const regex = /^#{1,3}\s+(.+)$/gm;
  const headers: string[] = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    headers.push(match[1].trim());
  }
  return headers;
}

function extractAndValidateImages(content: string, filePath: string): string[] {
  const regex = /!\[.*?\]\((.*?)\)|<(?:img|Screenshot).*?src=["'](.*?)["']/g;
  const images: string[] = [];
  let match;

  while ((match = regex.exec(content)) !== null) {
    let imgPathRaw = match[1] || match[2];
    if (!imgPathRaw) continue;
    imgPathRaw = imgPathRaw.split('?')[0];
    const cleanName = path.basename(imgPathRaw);
    const physicalPath = path.join(IMG_BASE_DIR, cleanName);
    
    if (fs.existsSync(physicalPath)) {
      images.push(`/img/${cleanName}`);
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

// --- Recursive Tree Building Logic ---

// Helper to get meta map for a directory
function getMeta(dirPath: string) {
  const zhPath = path.join(dirPath, '_meta.zh.json');
  const enPath = path.join(dirPath, '_meta.en.json');
  const stdPath = path.join(dirPath, '_meta.json'); // Fallback

  let zhMeta: Record<string, any> = {};
  let enMeta: Record<string, any> = {};

  if (fs.existsSync(zhPath)) {
    try { zhMeta = JSON.parse(fs.readFileSync(zhPath, 'utf-8')); } catch (e) { logError(`Failed to parse ${zhPath}`); }
  }
  if (fs.existsSync(enPath)) {
    try { enMeta = JSON.parse(fs.readFileSync(enPath, 'utf-8')); } catch (e) { logError(`Failed to parse ${enPath}`); }
  } else if (fs.existsSync(stdPath)) {
    try { enMeta = JSON.parse(fs.readFileSync(stdPath, 'utf-8')); } catch (e) { logError(`Failed to parse ${stdPath}`); }
  }

  return { zhMeta, enMeta };
}

async function buildTree(
  currentDir: string, 
  relativePath: string, 
  categoryRoot: string
): Promise<TreeNode[]> {
  const { zhMeta, enMeta } = getMeta(currentDir);
  
  // Determine list of items (union of keys from meta files + file system scan if needed)
  // We prioritize meta keys for ordering
  const metaKeys = new Set([...Object.keys(zhMeta), ...Object.keys(enMeta)]);
  
  // Also scan directory to find items not in meta (optional, but good for safety)
  // For now, we strictly follow meta if it exists, or fall back to FS if no meta
  let items: string[] = [];
  if (metaKeys.size > 0) {
    items = Array.from(metaKeys);
  } else {
    // Fallback: alphabetical sort of files/folders
    const files = fs.readdirSync(currentDir);
    items = files
      .filter(f => !f.startsWith('_') && !f.startsWith('.')) // Skip _meta, .DS_Store
      .map(f => f.replace(/\.(zh|en)?\.mdx$/, ''))
      .filter((v, i, a) => a.indexOf(v) === i); // Dedupe
  }

  const nodes: TreeNode[] = [];

  for (const id of items) {
    // Special check for separator or special keys in meta
    if (zhMeta[id]?.type === 'separator' || enMeta[id]?.type === 'separator') continue; 
    if (typeof zhMeta[id] === 'object' && zhMeta[id] !== null && zhMeta[id].type) continue; // Skip non-string/non-page items for now unless handled

    const itemPath = path.join(currentDir, id);
    const virtualPath = relativePath ? `${relativePath}/${id}` : id;
    
    // Check if it's a directory (Group/Category)
    // We assume it is a directory if fs.stat says so, OR if we don't find .mdx files but find a folder
    const isDir = fs.existsSync(itemPath) && fs.statSync(itemPath).isDirectory();
    const zhFile = path.join(currentDir, `${id}.zh.mdx`);
    const enFile = path.join(currentDir, `${id}.en.mdx`);
    const stdFile = path.join(currentDir, `${id}.mdx`);
    const isFile = fs.existsSync(zhFile) || fs.existsSync(enFile) || fs.existsSync(stdFile);

    // Get titles from meta
    const titleZh = (typeof zhMeta[id] === 'string' ? zhMeta[id] : zhMeta[id]?.title) || id;
    const titleEn = (typeof enMeta[id] === 'string' ? enMeta[id] : enMeta[id]?.title) || id;

    if (isDir) {
      // Recurse
      const children = await buildTree(itemPath, virtualPath, categoryRoot);
      if (children.length > 0) {
        nodes.push({
          id,
          titles: { zh: titleZh, en: titleEn },
          type: relativePath === '' ? 'category' : 'group', // Top level is category
          children
        });
      }
    } else if (isFile) {
      // It's a page, process it for the flat index
      let zhEntry: LocaleEntry | undefined;
      let enEntry: LocaleEntry | undefined;
      let images: string[] = [];

      // Load Chinese
      let actualZhPath = zhFile;
      if (!fs.existsSync(zhFile) && fs.existsSync(stdFile)) actualZhPath = stdFile;
      
      const zhData = parseMDX(actualZhPath);
      if (zhData && zhData.content.length > 10) {
        zhEntry = {
          title: zhData.frontmatter.title || titleZh,
          description: zhData.frontmatter.description,
          content: zhData.content,
          headers: extractHeaders(zhData.content),
          frontmatter: zhData.frontmatter
        };
        images.push(...extractAndValidateImages(zhData.content, actualZhPath));
      }

      // Load English
      const enData = parseMDX(enFile);
      if (enData && enData.content.length > 10) {
        enEntry = {
          title: enData.frontmatter.title || titleEn,
          description: enData.frontmatter.description,
          content: enData.content,
          headers: extractHeaders(enData.content),
          frontmatter: enData.frontmatter
        };
        images.push(...extractAndValidateImages(enData.content, enFile));
      }

      if (zhEntry || enEntry) {
        const hash = calculateHash((zhEntry?.content || '') + (enEntry?.content || ''));
        // Determine category from root
        const entryCategory = categoryRoot || id; 
        
        entries.push({
          id,
          path: virtualPath,
          category: entryCategory, // This might need refinement if category is purely top-level
          locales: { zh: zhEntry, en: enEntry },
          images: [...new Set(images)],
          last_updated_hash: hash
        });

        nodes.push({
          id,
          titles: { 
            zh: zhEntry?.title || titleZh, 
            en: enEntry?.title || titleEn 
          },
          type: 'page',
          path: virtualPath
        });
      }
    }
  }

  return nodes;
}

// --- Blog Processing (Keeping Flat) ---
async function processBlog() {
  const { zhMeta, enMeta } = getMeta(BLOG_BASE_DIR);
  const files = fs.readdirSync(BLOG_BASE_DIR);
  // Simple scan for blog posts
  const itemMap = new Set<string>();
  files.forEach(f => {
    if (f.endsWith('.mdx')) itemMap.add(f.replace(/\.(zh|en)?\.mdx$/, ''));
  });

  for (const id of Array.from(itemMap)) {
    if (id.startsWith('_')) continue;
    const zhPath = path.join(BLOG_BASE_DIR, `${id}.zh.mdx`);
    const enPath = path.join(BLOG_BASE_DIR, `${id}.en.mdx`);
    const virtualPath = `blog/${id}`;

    let zhEntry: LocaleEntry | undefined;
    let enEntry: LocaleEntry | undefined;

    const zhData = parseMDX(zhPath);
    if (zhData && zhData.content.length > 10) {
      zhEntry = {
        title: zhData.frontmatter.title || zhMeta[id] || id,
        description: zhData.frontmatter.description,
        content: zhData.content,
        headers: extractHeaders(zhData.content),
        frontmatter: zhData.frontmatter
      };
    }

    const enData = parseMDX(enPath);
    if (enData && enData.content.length > 10) {
      enEntry = {
        title: enData.frontmatter.title || enMeta[id] || id,
        description: enData.frontmatter.description,
        content: enData.content,
        headers: extractHeaders(enData.content),
        frontmatter: enData.frontmatter
      };
    }

    if (zhEntry || enEntry) {
      entries.push({
        id,
        path: virtualPath,
        category: 'blog',
        locales: { zh: zhEntry, en: enEntry },
        images: [],
        last_updated_hash: calculateHash((zhEntry?.content || '') + (enEntry?.content || '')),
      });
    }
  }
}

async function main() {
  console.log('🚀 Starting Knowledge Base Indexing...');
  
  // 1. Build Prompt Engineering Tree recursively
  console.log('📚 Building Prompt Guide Tree...');
  // We scan the top-level directory. 
  // The first level of recursion identifies the "categories".
  const promptTree = await buildTree(CONTENT_BASE_DIR, '', '');

  // 2. Scan Blog Posts (Flat)
  if (fs.existsSync(BLOG_BASE_DIR)) {
    console.log('📝 Indexing Blog Posts...');
    await processBlog();
  }

  // Write Output
  const outputData = {
    generated_at: new Date().toISOString(),
    total_entries: entries.length,
    navigationTree: promptTree, // Hierarchical
    entries: entries // Flat index for lookup
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
