import { Outlet } from "react-router-dom";
import { Layout } from "antd";
// import { getAuthorButtons } from "@/api/modules/login";
import LayoutMenu from "./components/menu";
import LayoutHeader from "./components/header";
// import LayoutFooter from "./components/Footer";
import "./index.less";
import { isMiniProgram } from "@/utils/common";

{
  /* <Layout>
  <Header style={headerStyle}>Header</Header>
  <Layout hasSider>
    <Sider style={siderStyle}>Sider</Sider>
    <Content style={contentStyle}>Content</Content>
  </Layout>
  <Footer style={footerStyle}>Footer</Footer>
</Layout>; */
}

const LayoutIndex = () => {
  const { Sider, Content } = Layout;

  if (isMiniProgram()) return <Outlet></Outlet>;
  return (
    <Layout className=" min-h-full">
      <LayoutHeader></LayoutHeader>
      <Layout hasSider>
        <Sider trigger={null} width={220} theme="light" className="hidden lg:block">
          <LayoutMenu></LayoutMenu>
        </Sider>
        <Content className=" min-h-full">
          <Outlet></Outlet>
          {/* <LayoutFooter></LayoutFooter> */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutIndex;
