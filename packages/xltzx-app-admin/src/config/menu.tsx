import type { MenuProps } from "antd";
import * as Icons from "@ant-design/icons";
import { can } from "@/utils/auth";
export type MenuItem = Required<MenuProps>["items"][number];

export const getMenuItems = () => {
  return [
    { key: "/home/index", label: "首页", icon: <Icons.HomeOutlined /> },
    {
      key: "/content",
      label: "内容管理",
      icon: <Icons.FileDoneOutlined />,
      children: [
        { key: "/content/banner/list", label: "banner管理", disabled: !can("query.banners") },
        { key: "/content/file/list", label: "文件管理", disabled: !can("query.files") },
        { key: "/content/article/list", label: "文章管理", disabled: !can("query.articles") }
      ]
    },
    {
      key: "/product",
      label: "产品管理",
      icon: <Icons.AppstoreOutlined />,
      children: [{ key: "/product/spu/list", label: "产品管理", disabled: !can("query.spus") }]
    },
    {
      key: "/order",
      label: "订单管理",
      icon: <Icons.GiftOutlined />,
      children: [{ key: "/order/order/list", label: "订单管理", disabled: !can("query.orders") }]
    },
    {
      key: "/user",
      label: "用户管理",
      icon: <Icons.UserOutlined />,
      children: [{ key: "/user/user/list", label: "用户管理", disabled: !can("query.users") }]
    },
    {
      key: "/distribution",
      label: "分销管理",
      icon: <Icons.ApartmentOutlined />,
      children: [
        { key: "/distribution/spu/list", label: "产品列表", disabled: !can("query.distributionSpus") },
        { key: "/distribution/user/list", label: "用户列表", disabled: !can("query.distributionUsers") },
        { key: "/distribution/order/list", label: "订单列表", disabled: !can("query.distributionOrders") }
      ]
    },
    {
      key: "/system",
      label: "系统管理",
      icon: <Icons.SettingOutlined />,
      disabled: !can("query.staffs") && !can("query.roles"),
      children: [
        { key: "/system/staff/list", label: "员工管理", disabled: !can("query.staffs") },
        { key: "/system/role/list", label: "角色管理", disabled: !can("query.roles") },
        { key: "/system/setting/edit", label: "系统设置", disabled: !can("query.setting") }
      ]
    }
  ];
};

// 删除disable的menu
// const handleDisabledMenu = (menuItems: any[]) => {
//   if (!menuItems) return [];
//   menuItems.map((v, k) => {
//     if (v?.children) {
//       menuItems[k].children = handleDisabledMenu(menuItems[k].children);
//     }
//     if (menuItems[k].disabled) {
//       menuItems.splice(k, 1);
//     }
//   });
//   return menuItems;
// };
// menu.items = handleDisabledMenu(menu.items);
