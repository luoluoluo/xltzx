import { useState, useImperativeHandle, Ref, useEffect } from "react";
import { message, Modal } from "antd";
import { getMe, loadMe } from "@/utils/auth";
import QRCode from "qrcode.react";
import { apolloClient } from "@/utils/request";
import { Setting, Staff } from "@/generated/graphql";
import { gql } from "@apollo/client";
import { getFileUrl } from "@/utils";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

const loadSettingData = async () => {
  return apolloClient
    .query<{ setting: Setting }>({
      query: gql(/* GraphQL */ `
        query Setting {
          setting {
            id
            logoFileId
          }
        }
      `),
      fetchPolicy: "no-cache",
      errorPolicy: "all"
    })
    .then(res => {
      if (res.errors) {
        message.error(res.errors[0].message);
        return;
      }
      return res.data.setting;
    });
};
interface Props {
  innerRef: Ref<{ showModal: (params: any) => void } | undefined>;
}

const InfoModal = (props: Props) => {
  const [me, setMe] = useState<Staff | undefined>(getMe());

  const url = `${import.meta.env.VITE_STORE_URL}/?staffId=${me?.id}`;
  const [modalVisible, setModalVisible] = useState(false);
  const [logoUrl, setLogoUrl] = useState("");
  useEffect(() => {
    loadSettingData().then(res => {
      if (res && res.logoFileId) {
        setLogoUrl(getFileUrl(res.logoFileId));
      }
    });
    const t = setInterval(async () => {
      if (me?.userId) {
        clearInterval(t);
        return;
      }
      const newMe = await loadMe();
      setMe(newMe);
    }, 3000);
    return () => {
      clearInterval(t);
    };
  }, [me]);
  useImperativeHandle(props.innerRef, () => ({
    showModal
  }));

  const showModal = (params: { name: number }) => {
    console.log(params);
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };
  return (
    <Modal title="分销码" open={modalVisible} footer={null} onCancel={handleCancel} destroyOnClose={true}>
      <div className="flex flex-col items-center">
        <QRCode
          value={url}
          size={512}
          className="max-w-48 max-h-48"
          level={"L"}
          imageSettings={{
            src: logoUrl,
            x: undefined,
            y: undefined,
            height: 64,
            width: 64,
            excavate: true
          }}
        />
        <div className="mt-4">分销链接：{url}</div>
        {me?.userId ? (
          <div className="mt-4 text-green-500">
            <span>{`已于${dayjs(Number(me.userBindedAt)).format("YYYY-MM-DD HH:MM:ss")}绑定收款微信账户：`}</span>
            <Link
              to={`/distribution/user/list?id=${me.userId}`}
              onClick={() => {
                handleCancel();
              }}
            >
              {me.userId}
            </Link>
            <span>{`，如果绑定的微信收款账户有误请与管理员联系。`}</span>
          </div>
        ) : (
          <div className="mt-4 text-red-500">
            注意：首个扫码（或打开分销链接）的微信将设置为收款微信账户（订单完成后系统会直接将佣金发到该微信账户）。
          </div>
        )}
      </div>
    </Modal>
  );
};
export default InfoModal;
