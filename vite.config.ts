import { defineConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert'

export default defineConfig({
    build: {
        lib: {
            entry: './src/plugin.ts',
            formats: ["es", "cjs"],
            name: "plugin",
            fileName: (format) => (format === "es" ? "index.js" : "index.cjs"),
        },
        rollupOptions: {
            external: [],
        },
    },
});
