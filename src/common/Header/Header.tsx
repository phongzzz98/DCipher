import { Avatar, Button, Input, Tooltip } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined, MoreOutlined, PlusCircleOutlined } from '@ant-design/icons';
import './HeaderStyle.css'
import codeGear from '../../assets/svg/code-gear.svg'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { accessTokenSelector } from '../../redux/reducers/AuthReducer';
import { axiosInstance } from '../../configs/axios';
import { useState } from 'react';

interface HeaderProps {
    setIsNavbarOpen: Function
    isNavbarOpen: boolean
}

export const Header = (props: HeaderProps) => {
    const { setIsNavbarOpen, isNavbarOpen } = props
    const navigate = useNavigate()
    const accessToken = useSelector(accessTokenSelector)

    const searchPost = (value: string) => {
        axiosInstance.post(`https://code-ide-forum.herokuapp.com/api/searchpost`, {
            search: value
        }).then((res) => {
            console.log(res.data)
        })
    }

    return (
        <div className="header-app">
            <div className='header-main'>
                {isNavbarOpen ?
                    <MenuUnfoldOutlined className="trigger" onClick={() => setIsNavbarOpen(!isNavbarOpen)} /> : <MenuFoldOutlined className="trigger" onClick={() => setIsNavbarOpen(!isNavbarOpen)} />}
                <div>
                    <Link to={'/'}>
                        <Avatar
                            shape="square"
                            className="header-avatar"
                            src={codeGear}
                        />
                    </Link>
                </div>
                <span className={!isNavbarOpen ? "header-logo-start-to-off logo-inactive" : "header-logo logo-active"}>DCipher</span>
            </div>
            <div className='search-bar'>
                <Input.Search
                    placeholder="input search text"
                    allowClear
                    enterButton="Tìm kiếm"
                    size="middle"
                    onSearch={value => searchPost(value)}
                />
            </div>
            <div className='header-actions'>
                {!accessToken ?
                    <Button onClick={() => navigate('/login')} size='middle' type='ghost' className='login-btn'>Đăng nhập/Đăng ký</Button> :
                    <Tooltip placement="bottom" title={<span>Tạo bài</span>}>
                        <span className='more-btn' onClick={() => navigate('/create')}><PlusCircleOutlined /></span>
                    </Tooltip>
                }
                <span className='more-btn'><MoreOutlined /></span>
            </div>
        </div>
    )
}
