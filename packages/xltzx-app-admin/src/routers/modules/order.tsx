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
        path: "/order/order/list",
        element: lazyLoad(React.lazy(() => import("@/views/order/order/list"))),
        meta: {
          requiresAuth: true,
          title: "订单管理",
          key: "orderList"
        }
      },
      {
        path: "/order/order/ship",
        element: lazyLoad(React.lazy(() => import("@/views/order/order/ship"))),
        meta: {
          requiresAuth: true,
          title: "订单发货",
          key: "orderShip"
        }
      },
      {
        path: "/order/order/refund",
        element: lazyLoad(React.lazy(() => import("@/views/order/order/refund"))),
        meta: {
          requiresAuth: true,
          title: "订单退款",
          key: "orderShip"
        }
      }
    ]
  }
];

export default formRouter;
