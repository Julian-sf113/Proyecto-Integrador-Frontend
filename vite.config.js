import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true
            }
        }
    },
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                user: resolve(__dirname, 'views/user/index.html'),
                admin: resolve(__dirname, 'views/admin/index.html')
            }
        }
    }
});
