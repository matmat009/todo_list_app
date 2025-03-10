import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/todo_list_app/", // Add this line for GitHub Pages deployment
  plugins: [react()],
});
