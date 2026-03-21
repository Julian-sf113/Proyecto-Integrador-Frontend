import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
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
