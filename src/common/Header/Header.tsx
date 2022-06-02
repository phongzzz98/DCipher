import { Avatar, Button, Input, Popover, Tooltip } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined, MoreOutlined, PlusCircleOutlined, BellFilled } from '@ant-design/icons';
import './HeaderStyle.css'
import codeGear from '../../assets/svg/code-gear.svg'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { accessTokenSelector, userInfoSelector } from '../../redux/reducers/AuthReducer';
import { axiosInstance } from '../../configs/axios';
import { useEffect, useState } from 'react';
import { ApplicationDispatch } from '../../store/store';
import { searchPostAction } from '../../redux/actions/PostAction';
import { INotification } from '../../redux/interface/NotificationType';

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
    const [notifications, setNotifications] = useState<INotification[]>([])
    const [notiNumber, setnotiNumber] = useState(0)

    useEffect(() => {
        const getNotiNumber = () => {
            axiosInstance.get(`https://code-ide-forum.herokuapp.com/api/userdetails/${user.id}`)
                .then((res) => {
                    setnotiNumber(res.data.notification);
                })
        }
        getNotiNumber()
    }, [user.id])
    

    const content = (
        notifications.map((item) =>
            <div>
                <p>{item.content}</p>
            </div>)
    );

    const searchPost = (value: string) => {
        dispatch(searchPostAction(value))
            .then((res) => {
                navigate('/search')
                console.log(res) //dlete later
            })
    }

    const getNotification = () => {
        axiosInstance.get(`https://code-ide-forum.herokuapp.com/api/notification/${user.id}`)
            .then((res) => {
                setNotifications(res.data);
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
                    <>
                        <Popover placement="bottomRight" title='Notification' content={content} trigger="click">
                            <BellFilled onClick={() => getNotification()} className='more-btn' />
                            <span>{notiNumber}</span>
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
