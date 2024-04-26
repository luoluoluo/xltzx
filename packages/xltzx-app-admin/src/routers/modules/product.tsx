import React from "react";
import lazyLoad from "@/routers/utils/lazyLoad";
import { LayoutIndex } from "@/routers/constant";
import { RouteObject } from "@/routers/interface";

const formRouter: Array<RouteObject> = [
  {
    element: <LayoutIndex />,
    meta: {
      title: "店铺管理"
    },
    children: [
      {
        path: "/product/spu/list",
        element: lazyLoad(React.lazy(() => import("@/views/product/spu/list"))),
        meta: {
          requiresAuth: true,
          title: "产品管理",
          key: "spuList"
        }
      },
      {
        path: "/product/spu/add",
        element: lazyLoad(React.lazy(() => import("@/views/product/spu/add"))),
        meta: {
          requiresAuth: true,
          title: "新建产品",
          key: "spuAdd"
        }
      },
      {
        path: "/product/spu/edit",
        element: lazyLoad(React.lazy(() => import("@/views/product/spu/edit"))),
        meta: {
          requiresAuth: true,
          title: "编辑产品",
          key: "spuEdit"
        }
      },
      {
        path: "/product/sku/list",
        element: lazyLoad(React.lazy(() => import("@/views/product/sku/list"))),
        meta: {
          requiresAuth: true,
          title: "sku管理",
          key: "skuList"
        }
      },
      {
        path: "/product/sku/add",
        element: lazyLoad(React.lazy(() => import("@/views/product/sku/add"))),
        meta: {
          requiresAuth: true,
          title: "新建sku",
          key: "skuAdd"
        }
      },
      {
        path: "/product/sku/edit",
        element: lazyLoad(React.lazy(() => import("@/views/product/sku/edit"))),
        meta: {
          requiresAuth: true,
          title: "编辑sku",
          key: "skuEdit"
        }
      }
    ]
  }
];

export default formRouter;
