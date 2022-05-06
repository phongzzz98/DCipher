import { Menu, Layout } from 'antd'
import React, { useState } from 'react'
import { Header } from '../Header/Header'
import {
  HomeOutlined,
  FormOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import './MainLayoutStyle.css'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { removeAccessToken, removeUserInfo } from '../../utils/localStorage'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/reducers/AuthReducer'
import { loadingSelector } from '../../redux/reducers/LoadingReducer'

export const MainLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(loadingSelector)

  const handleClickLogOut = () => {
    removeAccessToken();
    removeUserInfo();
    dispatch(logout());
    navigate('/login');
  };

  const [isNavbarOpen, setIsNavbarOpen] = useState(false)
  if (!isLoading) {
    return (
      <Layout className="main-layout">
        <Layout.Sider className='sider' width={250} trigger={null} collapsible={true} collapsed={isNavbarOpen}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
          >
            <Menu.Item key="1" icon={<HomeOutlined />}>
              <Link to={'/'}>
                <span className="navbar-span">Trang Chủ</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<FormOutlined />}>
              <Link to={'user'}>
                <span className="navbar-span">Test</span>
              </Link>
            </Menu.Item>
            <Menu.Item
              key="3"
              onClick={handleClickLogOut}
              icon={<LogoutOutlined />}
            >
              <span className="navbar-span">Đăng Xuất</span>
            </Menu.Item>
          </Menu>
        </Layout.Sider>
        <Layout className="site-layout">
          <Header setIsNavbarOpen={setIsNavbarOpen} isNavbarOpen={isNavbarOpen} />
          <Layout.Content className="site-layout-background">
            <Outlet />
          </Layout.Content>
        </Layout>
      </Layout>
    )
  } else {
    return (
      <div>Loading</div>
    )
  }
}
