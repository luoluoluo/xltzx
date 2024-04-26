import { Drawer, Layout } from "antd";
import AvatarIcon from "./components/avatar-icon";
import "./index.less";
import { getMe } from "@/utils/auth";
import { useState } from "react";
import LayoutMenu from "../menu";
import * as Icons from "@ant-design/icons";
const LayoutHeader = () => {
  const me = getMe();
  const { Header } = Layout;
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Header style={{ backgroundColor: "white" }} className="px-4 m-0">
        <Icons.MenuUnfoldOutlined
          className=" text-xl mr-4 lg:hidden"
          onClick={() => {
            setOpen(true);
          }}
        />
        <div className="w-full flex items-center h-[55px] border-b-slate-50 border-b border-solid">
          {/* <img src={logo} alt="logo" className="w-[30px]" /> */}
          <div className="ml-2 text-base">管理后台</div>
        </div>
        <div className="flex items-center">
          <span className="mr-2 whitespace-nowrap">{me?.name}</span>
          <AvatarIcon />
        </div>
      </Header>
      <Drawer open={open} closable onClose={() => setOpen(false)} placement="left" styles={{ body: { padding: 0 } }}>
        <LayoutMenu
          onClick={() => {
            setOpen(false);
          }}
        />
      </Drawer>
    </div>
  );
};

export default LayoutHeader;
