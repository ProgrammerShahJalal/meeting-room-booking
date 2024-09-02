import React from "react";
import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  ScheduleOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { Link, Outlet } from "react-router-dom";

const { Header, Content, Sider } = Layout;

const AdminDashboardMain: React.FC = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        theme="dark"
        width={250}
        className="admin-dashboard-sider"
      >
        <div className="logo" style={{ padding: "16px", color: "#fff" }}>
          <Link to="/" className="text-xl font-bold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-500">
              MRBS
            </span>
          </Link>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/admin/room-management">Room Management</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<ScheduleOutlined />}>
            <Link to="/admin/slot-management">Slot Management</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<BookOutlined />}>
            <Link to="/admin/booking-management">Booking Management</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <h1 style={{ textAlign: "center", margin: "16px 0" }}>
            Admin Dashboard
          </h1>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboardMain;
