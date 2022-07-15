import { Avatar, Button, Input, Popover, Tooltip } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined, MoreOutlined, PlusCircleOutlined, BellFilled } from '@ant-design/icons';
import './HeaderStyle.css'
import logo from '../../assets/svg/dclogo.svg'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { accessTokenSelector, userInfoSelector } from '../../redux/reducers/AuthReducer';
import { axiosInstance } from '../../configs/axios';
import { useEffect, useState } from 'react';
import { ApplicationDispatch } from '../../store/store';
import { searchPostAction, searchPostByTagAction } from '../../redux/actions/PostAction';
import { INotification } from '../../redux/interface/UserType';
import { getNotificationAction } from '../../redux/actions/UserAction';
import { notificationSelector } from '../../redux/reducers/UserReducer';

interface HeaderProps {
    setIsNavbarOpen: Function
    isNavbarOpen: boolean
}

export const Header = (props: HeaderProps) => {
    const { setIsNavbarOpen, isNavbarOpen } = props
    const navigate = useNavigate()
    const dispatch: ApplicationDispatch = useDispatch()
    const accessToken = useSelector(accessTokenSelector)
    const user = useSelector(userInfoSelector)
    const notifications = useSelector(notificationSelector)
    const [notiNumber, setnotiNumber] = useState(0)

    useEffect(() => {
        if(user.id !== 0){
            const getNotiNumber = () => {
                axiosInstance.get(`https://code-ide-forum.herokuapp.com/api/userdetails/${user.id}`)
                    .then((res) => {
                        setnotiNumber(res.data[0].notification);
                    })
            }
            getNotiNumber()
        }
        else return;
    }, [user.id])

    const content = (
        notifications.map((item, index) =>
            <div key={index}>
                <p>{item.content}</p>
            </div>)
    );

    const searchPost = (value: string) => {
        dispatch(searchPostAction(value))
            .then(() => {
                navigate('/search')
            })
    }

    const getNotification = (id: number) => {
        dispatch(getNotificationAction(id))
    }
    console.log(user)
    return (
        <div className="header-app">
            <div className='header-main'>
                {isNavbarOpen ?
                    <MenuUnfoldOutlined className="trigger" onClick={() => setIsNavbarOpen(!isNavbarOpen)} /> : <MenuFoldOutlined className="trigger" onClick={() => setIsNavbarOpen(!isNavbarOpen)} />}
                <div>
                    <Link to={'/'}>
                        <Avatar
                        size={40}
                            shape="square"
                            className="header-avatar"
                            src={logo}
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
                    <>
                        <Popover placement="bottomRight" title='Notification' content={content} trigger="click">
                            <div className='notification'>
                                <BellFilled onClick={() => getNotification(user.id)} className='more-btn' />
                                {
                                  notiNumber !== 0 ?
                                  <span className='noti-number'>{notiNumber}</span> :
                                  null
                                }
                            </div>
                        </Popover>
                        <Tooltip placement="bottom" title={<span>Tạo bài</span>}>
                            <span className='more-btn' onClick={() => navigate('/create')}><PlusCircleOutlined /></span>
                        </Tooltip>
                    </>
                }
                <span className='more-btn'><MoreOutlined /></span>
            </div>
        </div>
    )
}
