import { ConfigProvider } from "antd";
import AuthRouter from "@/routers/utils/authRouter";
import Router from "@/routers/index";
import zhCN from "antd/lib/locale/zh_CN";
import "dayjs/locale/zh-cn";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter basename="/app-admin/">
      <ConfigProvider locale={zhCN}>
        <AuthRouter>
          <Router />
        </AuthRouter>
      </ConfigProvider>
    </BrowserRouter>
  );
};

export default App;
