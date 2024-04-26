import { Spin } from "antd";
import "./index.less";

export const Loading = ({ tip = "Loading" }: { tip?: string }) => {
  return <Spin tip={tip} size="large" className="request-loading" />;
};
