import { Avatar } from 'antd'
import { MenuOutlined } from '@ant-design/icons';
import './HeaderStyle.css'

interface HeaderProps {
    setIsNavbarOpen: Function
    isNavbarOpen: boolean
}

export const Header = (props: HeaderProps) => {
    const { setIsNavbarOpen, isNavbarOpen } = props
    return (
        <div className="header-app">
            <MenuOutlined className="trigger" onClick={() => setIsNavbarOpen(!isNavbarOpen)} />
            <Avatar
                shape="square"
                className="header-avatar"
                src="https://cdn-icons-png.flaticon.com/512/3358/3358865.png"
            />
            <span className="header-logo">DCipher</span>
        </div>
    )
}
