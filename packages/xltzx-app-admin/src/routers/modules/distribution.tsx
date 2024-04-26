import React from "react";
import lazyLoad from "@/routers/utils/lazyLoad";
import { LayoutIndex } from "@/routers/constant";
import { RouteObject } from "@/routers/interface";

const formRouter: Array<RouteObject> = [
  {
    element: <LayoutIndex />,
    meta: {
      title: "订单管理"
    },
    children: [
      {
        path: "/distribution/spu/list",
        element: lazyLoad(React.lazy(() => import("@/views/distribution/spu/list"))),
        meta: {
          requiresAuth: true,
          title: "产品列表",
          key: "distributionSpuList"
        }
      },
      {
        path: "/distribution/order/list",
        element: lazyLoad(React.lazy(() => import("@/views/distribution/order/list"))),
        meta: {
          requiresAuth: true,
          title: "订单列表",
          key: "distributionOrderList"
        }
      },
      {
        path: "/distribution/user/list",
        element: lazyLoad(React.lazy(() => import("@/views/distribution/user/list"))),
        meta: {
          requiresAuth: true,
          title: "用户列表",
          key: "distributionUserList"
        }
      }
    ]
  }
];

export default formRouter;
