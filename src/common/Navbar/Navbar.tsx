import {
    HomeOutlined,
    CodeOutlined,
    LogoutOutlined,
    TagsOutlined,
    UserOutlined,
    TeamOutlined,
    AppstoreOutlined,
    TagOutlined,
    FileTextOutlined,
    SmileOutlined
} from "@ant-design/icons";
import { Avatar, Menu, Popover } from 'antd'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { removeAccessToken, removeUserInfo } from '../../utils/localStorage'
import { useDispatch, useSelector } from 'react-redux'
import { accessTokenSelector, logout, userInfoSelector } from '../../redux/reducers/AuthReducer'
import './NavbarStyle.css'
import { useEffect, useState } from "react";
import blankAva from '../../assets/images/BlankAvatar.jpg'
import { logoutAction } from "../../redux/actions/AuthAction";
import { ApplicationDispatch } from "../../store/store";
import { userDetailSelector } from "../../redux/reducers/UserReducer";
import { getUserDetailsAction } from "../../redux/actions/UserAction";

interface NavbarProps {
    isNavbarOpen: boolean;
}

export const Navbar = ({ isNavbarOpen }: NavbarProps) => {
    const dispatch: ApplicationDispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const user = useSelector(userInfoSelector)
    const accessToken = useSelector(accessTokenSelector)
    const userDetails = useSelector(userDetailSelector)
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

    useEffect(() => {
        if (user.id !== 0)
            dispatch(getUserDetailsAction(user.id))
    }, [dispatch, user.id])


    return (
        <div>
            {
                accessToken !== null ?
                    <Popover
                        content={
                            <div>
                                <div className="user-popover-item" onClick={handleClickMyPage}>
                                    <UserOutlined style={{ marginRight: 7 }} />
                                    <span className="navbar-span">Trang cá nhân</span>
                                </div>
                                <div
                                    className="user-popover-item"
                                    onClick={handleClickLogOut}
                                >
                                    <LogoutOutlined style={{ marginRight: 7 }} />
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
                            <Avatar className="avatar" src={userDetails.avatarImage !== "" ? userDetails.avatarImage : blankAva} />
                            {!isNavbarOpen ? <span className="user-name">{user.username}</span> : null}
                        </div>
                    </Popover> :
                    <div className="avatar-container">
                        <Avatar className="avatar" src={blankAva} />
                        {!isNavbarOpen ? <span className="user-name">{user.username}</span> : null}
                    </div>

            }
            <Menu
                theme="dark"
                mode="inline"
                selectedKeys={[selectedKey!]}
            >
                {
                    user.role === 0 && accessToken ?
                        <Menu.SubMenu
                            key={'6'}
                            icon={<AppstoreOutlined />}
                            title={
                                <span className="navbar-span">Admin</span>
                            }
                            onTitleClick={() => navigate('/')}
                        >
                            <Menu.Item key="7" icon={<SmileOutlined />}>
                                <Link to={'/'}>
                                    <span className="navbar-span">Quản lý người dùng</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="8" icon={<FileTextOutlined />}>
                                <Link to={'/'}>
                                    <span className="navbar-span">Quản lý bài viết</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="9" icon={<TagOutlined />}>
                                <Link to={'/tagMng'}>
                                    <span className="navbar-span">Quản lý thẻ</span>
                                </Link>
                            </Menu.Item>
                        </Menu.SubMenu> : null
                }
                <Menu.Item key="1" icon={<HomeOutlined />}>
                    <Link to={'/'}>
                        <span className="navbar-span">Trang Chủ</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<CodeOutlined />}>
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
