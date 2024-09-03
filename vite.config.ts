import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    //全局样式配置
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
                @import "@/assets/css/color.scss";
               `,
            },
        },
    },
})
