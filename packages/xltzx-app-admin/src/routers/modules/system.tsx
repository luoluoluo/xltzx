import React from "react";
import lazyLoad from "@/routers/utils/lazyLoad";
import { LayoutIndex } from "@/routers/constant";
import { RouteObject } from "@/routers/interface";

// 表单 Form 模块
const formRouter: Array<RouteObject> = [
  {
    element: <LayoutIndex />,
    meta: {
      title: "系统管理"
    },
    children: [
      {
        path: "/system/staff/list",
        element: lazyLoad(React.lazy(() => import("@/views/system/staff/list"))),
        meta: {
          requiresAuth: true,
          title: "员工管理",
          key: "staffList"
        }
      },
      {
        path: "/system/staff/add",
        element: lazyLoad(React.lazy(() => import("@/views/system/staff/add"))),
        meta: {
          requiresAuth: true,
          title: "员工新建",
          key: "staffAdd"
        }
      },
      {
        path: "/system/staff/edit",
        element: lazyLoad(React.lazy(() => import("@/views/system/staff/edit"))),
        meta: {
          requiresAuth: true,
          title: "员工编辑",
          key: "staffEdit"
        }
      },
      {
        path: "/system/role/list",
        element: lazyLoad(React.lazy(() => import("@/views/system/role/list"))),
        meta: {
          requiresAuth: true,
          title: "角色管理",
          key: "roleList"
        }
      },
      {
        path: "/system/role/add",
        element: lazyLoad(React.lazy(() => import("@/views/system/role/add"))),
        meta: {
          requiresAuth: true,
          title: "角色新建",
          key: "roleAdd"
        }
      },
      {
        path: "/system/role/edit",
        element: lazyLoad(React.lazy(() => import("@/views/system/role/edit"))),
        meta: {
          requiresAuth: true,
          title: "角色编辑",
          key: "roleEdit"
        }
      },
      {
        path: "/system/setting/edit",
        element: lazyLoad(React.lazy(() => import("@/views/system/setting/edit"))),
        meta: {
          requiresAuth: true,
          title: "系统设置",
          key: "settingEdit"
        }
      }
    ]
  }
];

export default formRouter;
