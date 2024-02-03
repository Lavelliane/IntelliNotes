"use client";
import React, { useState } from "react";
import { Rubik } from "next/font/google";
import {
  DesktopOutlined,
  EditOutlined,
  FileImageOutlined,
  FileOutlined,
  PaperClipOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, ConfigProvider, Layout, Menu, theme, Typography } from "antd";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const { Header, Content, Footer, Sider } = Layout;
const { Text } = Typography;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(<Link href="/home">My Notes</Link>, "1", <PaperClipOutlined />),
  getItem(
    <Link href="/summarize">Notes Summarizer</Link>,
    "2",
    <EditOutlined />
  ),
  getItem(<Link href="/home">Video Summarizer</Link>, "3", <VideoCameraOutlined />),
  getItem(<Link href="/home">Image to Notes</Link>, "4", <FileImageOutlined />),
];


const rubik = Rubik({
    subsets: ["latin"],
    weight: "400",
  });

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  function handleMenuClick(key: string) {
    router.push(`/${key}`);
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: rubik.style.fontFamily,
        },
      }}
    >
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div
            style={{
              color: "#fff",
              display: "flex",
              alignItems: "center",
              padding: "20px 0px 20px 10px",
              gap: "7px"
            }}
          >
            <Image
              src="/assets/intellinotes_logo.png"
              alt="intellinotes-logo"
              width={50}
              height={50}
            />
            {!collapsed && <p style={{ fontSize: "1rem" }}>Intellinotes</p>}
          </div>
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }} />
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              {pathname.split("/").map((pn) => (
                <Breadcrumb.Item>{pn}</Breadcrumb.Item>
              ))}
            </Breadcrumb>
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Intellinotes ©{new Date().getFullYear()} Created by Fretchel & Jhury
          </Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default MainLayout;
