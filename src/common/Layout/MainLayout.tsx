import { Layout } from 'antd'
import { useState } from 'react'
import { Header } from '../Header/Header'
import './MainLayoutStyle.css'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { loadingSelector } from '../../redux/reducers/LoadingReducer'
import { Navbar } from '../Navbar/Navbar'

export const MainLayout = () => {
  const isLoading = useSelector(loadingSelector)
  const [isNavbarOpen, setIsNavbarOpen] = useState(false)
  if (!isLoading) {
    return (
      <Layout className="main-layout">
        <Layout.Sider className='sider' width={250} trigger={null} collapsible={true} collapsed={isNavbarOpen}>
          <Navbar />
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
