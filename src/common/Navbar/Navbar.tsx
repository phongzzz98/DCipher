import {
    HomeOutlined,
    FormOutlined,
    LogoutOutlined,
    TagsOutlined,
    UserOutlined,
    TeamOutlined
} from "@ant-design/icons";
import { Avatar, Menu, Popover } from 'antd'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { removeAccessToken, removeUserInfo } from '../../utils/localStorage'
import { useDispatch, useSelector } from 'react-redux'
import { accessTokenSelector, logout, userInfoSelector } from '../../redux/reducers/AuthReducer'
import './NavbarStyle.css'
import { useEffect, useState } from "react";
import bigOunce from '../../assets/images/BigOunce.png'
import { logoutAction } from "../../redux/actions/AuthAction";
import { ApplicationDispatch } from "../../store/store";

interface NavbarProps {
    isNavbarOpen: boolean;
}

export const Navbar = ({ isNavbarOpen }: NavbarProps) => {
    const dispatch: ApplicationDispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const user = useSelector(userInfoSelector)
    const accessToken = useSelector(accessTokenSelector)
    const [visible, setVisible] = useState(false);

    const handleVisibleChange = (newVisible: boolean) => {
        setVisible(newVisible);
    };

    const handleClickMyPage = () => {
        navigate('/mypage');
        setVisible(false)
    }

    const handleClickLogOut = async () => {
        await dispatch(logoutAction(accessToken!))
        removeAccessToken();
        removeUserInfo();
        dispatch(logout());
        navigate('/');
        setVisible(false);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const items = [
        { key: '1', label: 'Home', path: '/' },
        { key: '2', label: 'Playground', path: '/playground' },
        { key: '3', label: 'Tags', path: '/tags' },
        { key: '4', label: 'My Page', path: '/mypage' },
        { key: '5', label: 'Users', path: '/users' },
    ]
    const [selectedKey, setSelectedKey] = useState(items.find(item => location.pathname === item.path)?.key)

    useEffect(() => {
        setSelectedKey(items.find(_item => location.pathname === _item.path)?.key)
    }, [items, location])

    return (
        <div>
            <Popover
                content={
                    <div>
                        <div className="user-popover-item" onClick={handleClickMyPage}>
                            <UserOutlined style={{marginRight: 7}}/>
                            <span className="navbar-span">Trang cá nhân</span>
                        </div>
                        <div
                            className="user-popover-item"
                            onClick={handleClickLogOut}
                        >
                            <LogoutOutlined style={{marginRight: 7}}/>
                            <span className="navbar-span">Đăng Xuất</span>
                        </div>
                    </div>}
                trigger="click"
                visible={visible}
                onVisibleChange={handleVisibleChange}
                placement='bottomLeft'
                className="user-popover"
            >
                <div className="avatar-container">
                    <Avatar className="avatar" src={bigOunce} />
                    {!isNavbarOpen ? <span className="user-name">{user.username}</span> : null}
                </div>
            </Popover>
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
                    <Link to={'playground'}>
                        <span className="navbar-span">IDE</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<TagsOutlined />}>
                    <Link to={'tags'}>
                        <span className="navbar-span">Thẻ</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="5" icon={<TeamOutlined />}>
                    <Link to={'users'}>
                        <span className="navbar-span">Người dùng</span>
                    </Link>
                </Menu.Item>
            </Menu>
        </div>
    )
}
