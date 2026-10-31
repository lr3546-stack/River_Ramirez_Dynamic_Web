import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // json-server rewrites db.json on every save; without this Vite reloads
  // the whole page each time
  server: {watch: {ignored: ['**/db.json']}},
})
