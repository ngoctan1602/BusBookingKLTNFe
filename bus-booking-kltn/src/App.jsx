import React, { useEffect, useState } from 'react';
import './App.css'
import {
  DesktopOutlined,
  PoweroffOutlined,
  LineChartOutlined,
  ReadOutlined,
  TeamOutlined,
  CalendarOutlined,
  UserOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { Alert, Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children, danger) {
  return {
    key,
    icon,
    children,
    label,
    danger
  };
}
import { Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Route, useNavigate, Routes } from 'react-router';
import AdminRouter from './router';
import ManageYearTopicOfTest from './component/admin/test/topic_year/manageTest';
import { GlobalStateProvider, useGlobalState } from './component/common/globaleState';
import AddQuetion from './component/admin/test/question/addQuestion';
import { checkUrlOnline } from './api/BaseAPI';
import AddNewTest from './component/admin/test/test/addTest';
const items = [
  getItem('Thông tin người dùng', AdminRouter.account, <UserOutlined />),
  getItem('Thông kê điểm thi', '2', <LineChartOutlined />),
  getItem('Quản lý bài thi', 'sub1', <ReadOutlined />, [
    getItem('Bài thi', AdminRouter.test, <ReadOutlined />),
    getItem('Tạo mới bài thi', AdminRouter.testNew, <CalendarOutlined />),
    getItem('Chủ đề / Năm', AdminRouter.testYear, <CalendarOutlined />)
  ]),
  getItem('Câu hỏi', 'sub2', <QuestionCircleOutlined />, [
    getItem('Tạo mới', AdminRouter.question),
    getItem('Quản lý', '8')
  ]),
  getItem('Đăng xuất', '9', <PoweroffOutlined />, null, true),
];
const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  const notifySuccess = (message) => toast.success(message, {
    position: "bottom-right",
    autoClose: 2000,
    transition: Flip,
  });
  const notifyFailed = (message) => toast.error(message, {
    position: "bottom-right",
    autoClose: 2000,
    transition: Flip,
  });

  const notifyWarning = (message) => toast.warning(message, {
    position: "bottom-right",
    autoClose: 2000,
    transition: Flip,
  });


  const { globalState, setGlobalState } = useGlobalState();
  useEffect(
    () => {
      if (globalState.handle) {
        globalState.success ? notifySuccess(globalState.message) : notifyFailed(globalState.message)
      }

    }, [globalState]
  )
  useEffect(
    () => {
      checkUrlOnline(import.meta.env.VITE_BASE_API + "part/getAll")
        .then(result => {
          if (!result) {

            notifyWarning("Kiểm tra kết nối với server")
          }
          else {
            setGlobalState({ ...globalState, connect: true })
          }
        }
        );
    }, []
  )


  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider theme='light' collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        {/* <div className="demo-logo-vertical" /> */}
        <Menu onClick={({ key }) => navigate(`${key}`)} theme="light" defaultSelectedKeys={[AdminRouter.account]} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}

        >
          <p style={{ textAlign: 'center', fontSize: '16px' }}>Hệ thống quản lý thông tin dành cho người quản trị</p>
        </Header>
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 480,
              width: '100%',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <GetContent></GetContent>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
        </Footer>
        <ToastContainer />
      </Layout>
    </Layout >
  );
};

const GetContent = () => {

  return (
    <div style={{ minheight: '480px', width: '100%' }}>
      <Routes>
        <Route
          path={AdminRouter.account} element={<ManageYearTopicOfTest />}

        >
        </Route>
        <Route
          path={AdminRouter.question} element={<AddQuetion />}
        >
        </Route>
        <Route
          path={AdminRouter.testNew} element={<AddNewTest />}
        >
        </Route>
      </Routes>
    </div>
  )
}


export default App;