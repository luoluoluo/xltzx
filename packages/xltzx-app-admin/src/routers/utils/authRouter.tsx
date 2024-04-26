import { useLocation, Navigate, useSearchParams } from "react-router-dom";
import { searchRoute } from "@/utils/util";
import { rootRouter } from "@/routers/index";
import { getToken, loadMe, setToken } from "@/utils/auth";
import { useEffect, useState } from "react";

/**
 * @description 路由守卫组件
 * */
const AuthRouter = (props: { children: JSX.Element }) => {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const searchParamsToken = searchParams.get("token");
  if (searchParamsToken) setToken(searchParamsToken);

  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    loadMe().then(res => {
      console.log(res);
      setLoaded(true);
    });
  }, []);

  const route = searchRoute(pathname, rootRouter);

  if (route.meta?.title) {
    document.title = route.meta?.title;
  }

  // * 判断当前路由是否需要访问权限(不需要权限直接放行)
  if (!route.meta?.requiresAuth) return props.children;

  // * 判断是否有Token
  const token = getToken();
  if (!token) {
    // if (isMiniProgram()) {
    //   wx.miniProgram.reLaunch({ url: "/pages/login/index" });
    //   return null;
    // }
    return <Navigate to="/login" />;
  }

  // * 当前账号有权限返回 Router，正常访问页面
  return loaded ? props.children : null;
};

export default AuthRouter;
