
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
  // Hook into HMR update
  handleHotUpdate({ file, server }: { file: string; server: any }) {
    // Check if the modified file is inside the prompt-engineering/pages directory
    if (file.includes('prompt-engineering/pages') && (file.endsWith('.mdx') || file.endsWith('.json'))) {
      console.log(`\n📝 Content change detected: ${path.basename(file)}`);
      console.log('🔄 Re-indexing knowledge base...');
      
      exec('npm run index-content', (err, stdout, stderr) => {
        if (err) {
          console.error('❌ Indexing failed:', stderr);
        } else {
          console.log('✅ Indexing complete.');
          // Optional: You could trigger a custom full-reload here if HMR doesn't pick up the JSON change
          // server.ws.send({ type: 'full-reload' }); 
        }
      });
    }
  }
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, __dirname, '');

  // Aggressively sanitize the API key
  // 1. Trim whitespace
  // 2. Remove any non-printable ASCII characters (fixes issues with ^M, hidden chars, copy-paste artifacts)
  const rawApiKey = env.API_KEY || '';
  const sanitizedApiKey = rawApiKey.replace(/[^\x20-\x7E]/g, '').trim();

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
      // Inject API_KEY specifically to avoid overwriting the entire process.env object
      'process.env.API_KEY': JSON.stringify(sanitizedApiKey)
    }
  };
});
