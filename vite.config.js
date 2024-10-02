import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import path from 'path';
import { createBlockletPlugin } from 'vite-plugin-blocklet';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react(), createBlockletPlugin()],
    ...(mode === 'development' && {
      resolve: {
        alias: [
          { find: '@blocklet/payment-react', replacement: path.resolve(__dirname, '../../packages/react/src') },
          { find: '@blocklet/payment-js', replacement: path.resolve(__dirname, '../../packages/client/src') },
        ],
      },
    }),
  };
});
