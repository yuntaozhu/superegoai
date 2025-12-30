
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
  const env = loadEnv(mode, __dirname, '');

  // FORCE USE of the new valid key provided by the user
  const validApiKey = 'AIzaSyA_35waukTHMicsuwDLkMICXBdF6L4K668';

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
      'process.env.API_KEY': JSON.stringify(validApiKey)
    }
  };
});
