import { defineConfig, loadEnv, ConfigEnv, UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { wrapperEnv } from "./src/utils/get-env";

// @see: https://vitejs.dev/config/
export default defineConfig((mode: ConfigEnv): UserConfig => {
  const env = loadEnv(mode.mode, process.cwd());
  const viteEnv = wrapperEnv(env);

  return {
    base: "/app-admin/",
    // alias config
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src")
      }
    },
    // global css
    css: {
      preprocessorOptions: {
        less: {
          // modifyVars: {
          // 	"primary-color": "#1DA57A",
          // },
          javascriptEnabled: true,
          additionalData: `@import "@/styles/var.less";`
        }
      }
    },
    // server config
    server: {
      host: "0.0.0.0", // 服务器主机名，如果允许外部访问，可设置为"0.0.0.0"
      port: viteEnv.VITE_PORT,
      open: viteEnv.VITE_OPEN,
      cors: true
    },
    // plugins
    plugins: [react()]
  };
});
