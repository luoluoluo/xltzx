import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu } from "antd";
import { getOpenKeys } from "@/utils/util";
import type { MenuProps } from "antd";
import "./index.less";
import { getMenuItems } from "@/config/menu";

const LayoutMenu = (props: { onClick?: (key: string) => void }) => {
  const { pathname } = useLocation();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  // 刷新页面菜单保持高亮
  useEffect(() => {
    const key = decodeURIComponent(pathname);
    setSelectedKeys([key]);
    setOpenKeys(getOpenKeys(key));
    // handleDisabledMenu;
  }, [pathname]);

  // 设置当前展开的 subMenu
  const onOpenChange = (openKeys: string[]) => {
    if (openKeys.length === 0 || openKeys.length === 1) return setOpenKeys(openKeys);
    const latestOpenKey = openKeys[openKeys.length - 1];
    if (latestOpenKey.includes(openKeys[0])) return setOpenKeys(openKeys);
    setOpenKeys([latestOpenKey]);
  };

  // 点击当前菜单跳转页面
  const navigate = useNavigate();
  const clickMenu: MenuProps["onClick"] = ({ key }: { key: string }) => {
    navigate(key);
    props.onClick && props.onClick(key);
  };

  return (
    <Menu
      mode="inline"
      triggerSubMenuAction="click"
      openKeys={openKeys}
      selectedKeys={selectedKeys}
      items={getMenuItems()}
      onClick={clickMenu}
      onOpenChange={onOpenChange}
    ></Menu>
  );
};

export default LayoutMenu;
