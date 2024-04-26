import React from "react";
import lazyLoad from "@/routers/utils/lazyLoad";
import { LayoutIndex } from "@/routers/constant";
import { RouteObject } from "@/routers/interface";

const formRouter: Array<RouteObject> = [
  {
    element: <LayoutIndex />,
    meta: {
      title: "用户管理"
    },
    children: [
      {
        path: "/user/user/list",
        element: lazyLoad(React.lazy(() => import("@/views/user/user/list"))),
        meta: {
          requiresAuth: true,
          title: "用户管理",
          key: "userList"
        }
      }
    ]
  }
];

export default formRouter;
