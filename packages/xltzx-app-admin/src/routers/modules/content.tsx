import React from "react";
import lazyLoad from "@/routers/utils/lazyLoad";
import { LayoutIndex } from "@/routers/constant";
import { RouteObject } from "@/routers/interface";

const formRouter: Array<RouteObject> = [
  {
    element: <LayoutIndex />,
    meta: {
      title: "内容管理"
    },
    children: [
      {
        path: "/content/banner/list",
        element: lazyLoad(React.lazy(() => import("@/views/content/banner/list"))),
        meta: {
          requiresAuth: true,
          title: "banner管理",
          key: "bannerList"
        }
      },
      {
        path: "/content/banner/add",
        element: lazyLoad(React.lazy(() => import("@/views/content/banner/add"))),
        meta: {
          requiresAuth: true,
          title: "新建banner",
          key: "bannerAdd"
        }
      },
      {
        path: "/content/banner/edit",
        element: lazyLoad(React.lazy(() => import("@/views/content/banner/edit"))),
        meta: {
          requiresAuth: true,
          title: "编辑banner",
          key: "bannerEdit"
        }
      },
      {
        path: "/content/article/list",
        element: lazyLoad(React.lazy(() => import("@/views/content/article/list"))),
        meta: {
          requiresAuth: true,
          title: "文章管理",
          key: "articleList"
        }
      },
      {
        path: "/content/article/add",
        element: lazyLoad(React.lazy(() => import("@/views/content/article/add"))),
        meta: {
          requiresAuth: true,
          title: "新建文章",
          key: "articleAdd"
        }
      },
      {
        path: "/content/article/edit",
        element: lazyLoad(React.lazy(() => import("@/views/content/article/edit"))),
        meta: {
          requiresAuth: true,
          title: "编辑文章",
          key: "articleEdit"
        }
      },
      {
        path: "/content/file/list",
        element: lazyLoad(React.lazy(() => import("@/views/content/file/list"))),
        meta: {
          requiresAuth: true,
          title: "文件管理",
          key: "fileList"
        }
      }
    ]
  }
];

export default formRouter;
