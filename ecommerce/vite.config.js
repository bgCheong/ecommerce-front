import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // '/api'로 시작하는 요청은 아래 target으로 전달
      '/api': {
        target: 'http://localhost:8000', // API 게이트웨이 주소
        changeOrigin: true, // CORS 에러를 피하기 위해 추가
      }
    }
  }
})