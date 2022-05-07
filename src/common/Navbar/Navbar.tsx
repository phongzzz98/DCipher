import {
    HomeOutlined,
    FormOutlined,
    LogoutOutlined,
} from "@ant-design/icons";
import { Avatar, Menu } from 'antd'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { removeAccessToken, removeUserInfo } from '../../utils/localStorage'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/reducers/AuthReducer'
import './NavbarStyle.css'
import { useEffect, useState } from "react";
import bigOunce from '../../assets/images/BigOunce.png'

interface NavbarProps {
    isNavbarOpen: boolean;
}

export const Navbar = ({ isNavbarOpen }: NavbarProps) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const handleClickLogOut = () => {
        removeAccessToken();
        removeUserInfo();
        dispatch(logout());
        navigate('/login');
    };

    const items = [
        { key: '1', label: 'Home', path: '/' },
        { key: '2', label: 'User', path: '/user' },
    ]
    const [selectedKey, setSelectedKey] = useState(items.find(item => location.pathname === item.path)?.key)

    useEffect(() => {
        setSelectedKey(items.find(_item => location.pathname === _item.path)?.key)
    }, [location])

    return (
        <div>
            <div className="avatar-container">
                <Avatar className="avatar" src={bigOunce} />
                {!isNavbarOpen ? <span className="user-name">Big Ounce</span> : null}
            </div>
            <Menu
                theme="dark"
                mode="inline"
                selectedKeys={[selectedKey!]}
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
        </div>
    )
}
