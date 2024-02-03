"use client";
import React, { useEffect, useState } from "react";
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
import {
  Breadcrumb,
  ConfigProvider,
  Layout,
  Menu,
  theme,
  Typography,
} from "antd";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { UserButton, useUser } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs";

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
  getItem(<Link href="/home">My Notes</Link>, "/home", <PaperClipOutlined />),
  getItem(
    <Link href="/summarize">Notes Summarizer</Link>,
    "/summarize",
    <EditOutlined />
  ),
  getItem(
    <Link href="/video-notes">Video Summarizer</Link>,
    "/video-notes",
    <VideoCameraOutlined />
  ),
  getItem(<Link href="/image-notes">Image to Notes</Link>, "/image-notes", <FileImageOutlined />),
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
  const { user } = useUser();
  const pathname = usePathname();
  const router = useRouter();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [current, setCurrent] = useState(pathname);
  useEffect(() => {
    setCurrent(pathname);
  }, [pathname]);

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
              gap: "7px",
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
            selectedKeys={[current]}
            mode="inline"
            items={items}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              paddingRight: "20px",
              background: colorBgContainer,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: "10px",
            }}
          >
            <Text strong>Hi, {user?.firstName}</Text>
            <UserButton afterSignOutUrl="/" />
          </Header>
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              {pathname.split("/").map((pn, i) => (
                <Breadcrumb.Item key={i}>{pn}</Breadcrumb.Item>
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
