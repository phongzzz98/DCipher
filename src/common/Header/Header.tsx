import { Avatar } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import './HeaderStyle.css'
import codeGear from '../../assets/svg/code-gear.svg'
import { Link } from 'react-router-dom';

interface HeaderProps {
    setIsNavbarOpen: Function
    isNavbarOpen: boolean
}

export const Header = (props: HeaderProps) => {
    const { setIsNavbarOpen, isNavbarOpen } = props
    return (
        <div className="header-app">
            {isNavbarOpen ?
                <MenuUnfoldOutlined className="trigger" onClick={() => setIsNavbarOpen(!isNavbarOpen)} /> : <MenuFoldOutlined className="trigger" onClick={() => setIsNavbarOpen(!isNavbarOpen)} />}
            <Link to={'/'}>
                <Avatar
                    shape="square"
                    className="header-avatar"
                    src={codeGear}
                />
            </Link>
            <span className={!isNavbarOpen ? "header-logo-start-to-off logo-inactive" : "header-logo logo-active"}>DCipher</span>
        </div>
    )
}
