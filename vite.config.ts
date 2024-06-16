import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
//esto se importa con el comando -> npm i -D @types/node
import { fileURLToPath, URL } from "node:url";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  //esto sirve para indicar hacia que ruta ir cuando pones la @ (puede ser cualquier cosa, no solo una @)
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
