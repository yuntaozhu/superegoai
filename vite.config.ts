import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Custom Plugin to Watch Content Directory
const contentWatcher = () => ({
  name: 'content-watcher',
  handleHotUpdate({ file, server }: { file: string; server: any }) {
    const isContentFile = (
      file.includes('prompt-engineering/pages') || 
      file.includes('blog/posts')
    ) && (file.endsWith('.mdx') || file.endsWith('.json'));

    if (isContentFile) {
      console.log(`\n📝 Content change detected: ${path.basename(file)}`);
      exec('npm run index-content', (err, stdout, stderr) => {
        if (err) console.error('❌ Indexing failed:', stderr);
        else console.log('✅ Indexing complete.');
      });
    }
  }
});

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  // Using path.resolve() without args returns current working directory, avoiding 'process.cwd' type issues.
  const env = loadEnv(mode, path.resolve(), '');

  return {
    plugins: [
      react(),
      contentWatcher()
    ],
    resolve: {
      alias: [
        { find: '@', replacement: path.resolve(__dirname) }
      ],
    },
    define: {
      // Securely map environment variables to process.env
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
      'process.env.FIRECRAWL_KEY': JSON.stringify(env.FIRECRAWL_KEY)
    }
  };
});