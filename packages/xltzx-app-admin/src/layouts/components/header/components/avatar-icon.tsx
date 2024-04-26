import { useRef } from "react";
import { Avatar, Modal, Dropdown, message, MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import { HOME_URL } from "@/config/config";
import PasswordModal from "./password-modal";
import InfoModal from "./info-modal";
import avatar from "@/assets/images/avatar.png";
import { deleteMe, deleteToken, getMe } from "@/utils/auth";

const AvatarIcon = () => {
  const me = getMe();
  const navigate = useNavigate();

  interface ModalProps {
    showModal: () => void;
  }
  const passRef = useRef<ModalProps>(null);
  const infoRef = useRef<ModalProps>(null);

  // 退出登录
  const logout = () => {
    Modal.confirm({
      title: "温馨提示",
      content: "是否确认退出登录？",
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        deleteToken();
        deleteMe();
        message.success("退出登录成功！");
        navigate("/login");
      }
    });
  };

  // Dropdown Menu
  const menu: { items: MenuProps["items"] } = {
    items: [
      {
        key: "home",
        label: <span className="dropdown-item">首页</span>,
        onClick: () => navigate(HOME_URL)
      },
      {
        type: "divider"
      },
      {
        key: "qrcode",
        label: <span className="dropdown-item">分销码</span>,
        onClick: () => infoRef.current!.showModal()
      },
      {
        key: "order",
        label: <span className="dropdown-item">分销订单</span>,
        onClick: () => navigate(`/distribution/order/list?staffId=${me?.id}`)
      },
      {
        key: "user",
        label: <span className="dropdown-item">分销用户</span>,
        onClick: () => navigate(`/distribution/user/list?staffId=${me?.id}`)
      },
      {
        type: "divider"
      },
      {
        key: "changePassword",
        label: <span className="dropdown-item">修改密码</span>,
        onClick: () => passRef.current!.showModal()
      },
      {
        type: "divider"
      },
      {
        key: "logout",
        label: <span className="dropdown-item">退出登录</span>,
        onClick: logout
      }
    ]
  };
  return (
    <>
      <Dropdown menu={menu} placement="bottom" arrow trigger={["click"]}>
        <Avatar size="large" src={avatar} />
      </Dropdown>
      <InfoModal innerRef={infoRef}></InfoModal>
      <PasswordModal innerRef={passRef}></PasswordModal>
    </>
  );
};

export default AvatarIcon;
