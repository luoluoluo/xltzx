import ReactDOM from "react-dom/client";
import "@/styles/reset.less";
import "@/assets/iconfont/iconfont.less";
import "@/styles/common.less";
import "@/language/index";
import App from "@/app";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // * react严格模式
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
