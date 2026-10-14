import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss({
          content: [
            "./index.html",
            "./src/**/*.{js,ts,jsx,tsx}",
          ],
          darkMode: 'class',
          theme: {
            extend: {
              keyframes: {
                fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
                slideDown: { '0%': { transform: 'translateY(-10px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
                slideUp: { '0%': { transform: 'translateY(10px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
                scaleUp: { '0%': { transform: 'scale(0.95)', opacity: '0' }, '100%': { transform: 'scale(1)', opacity: '1' } },
                slideDrawer: { '0%': { transform: 'translateY(-12px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
                heartPop: {
                  '0%': { transform: 'scale(1)' },
                  '40%': { transform: 'scale(1.35)' },
                  '70%': { transform: 'scale(0.9)' },
                  '100%': { transform: 'scale(1)' }
                }
              },
              animation: {
                fadeIn: 'fadeIn 0.25s ease-out forwards',
                slideDown: 'slideDown 0.25s ease-out forwards',
                slideUp: 'slideUp 0.25s ease-out forwards',
                scaleUp: 'scaleUp 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                slideDrawer: 'slideDrawer 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                heartPop: 'heartPop 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
              }
            }
          }
        }),
        autoprefixer(),
      ],
    },
  },
});
