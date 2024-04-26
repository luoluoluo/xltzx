import { Navigate, useRoutes } from "react-router-dom";
import { RouteObject } from "@/routers/interface";
import Login from "@/views/login/index";
import lazyLoad from "./utils/lazyLoad";
import React from "react";

// * 导入所有router
const metaRouters = import.meta.glob("./modules/*.tsx", { eager: true });

// * 处理路由
export const routerArray: RouteObject[] = [];
Object.keys(metaRouters).forEach(item => {
  const items = metaRouters[item] as any;
  Object.keys(items).forEach((key: any) => {
    routerArray.push(...items[key]);
  });
});
export const rootRouter: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/login" />
  },
  {
    path: "/login",
    element: <Login />,
    meta: {
      requiresAuth: false,
      title: "登录页",
      key: "login"
    }
  },
  ...routerArray,
  {
    path: "*",
    element: lazyLoad(React.lazy(() => import("@/components/error-message/404"))),
    meta: {
      requiresAuth: false,
      title: "404页面",
      key: "404"
    }
  }
];

const Router = () => {
  const routes = useRoutes(rootRouter as any);
  return routes;
};

export default Router;
