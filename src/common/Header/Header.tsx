import { Avatar, Button, Input, List, Popover, Select, Tooltip } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined, SwapOutlined, MoreOutlined, PlusCircleOutlined, BellFilled, SmileOutlined } from '@ant-design/icons';
import './HeaderStyle.css'
import logo from '../../assets/svg/dclogo.svg'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { accessTokenSelector, userInfoSelector } from '../../redux/reducers/AuthReducer';
import { axiosInstance } from '../../configs/axios';
import { useEffect, useState } from 'react';
import { ApplicationDispatch } from '../../store/store';
import { searchPostAction, searchPostByTagAction } from '../../redux/actions/PostAction';
import { getNotificationAction } from '../../redux/actions/UserAction';
import { notificationSelector } from '../../redux/reducers/UserReducer';
import { getAllTagAction } from '../../redux/actions/TagAction';
import { dynamicSort } from '../../utils/util';
import { allTagSelector } from '../../redux/reducers/TagReducer';

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
    const [loading, setLoading] = useState(false)
    const [notiNumber, setnotiNumber] = useState(0)
    const [searchModeSwitch, setSearchModeSwitch] = useState(false)
    const tagList = useSelector(allTagSelector);
    let cloneTagList = [...tagList]
    cloneTagList.sort(dynamicSort('content'))
    const [searchTags, setSearchTags] = useState<string[]>([])

    useEffect(() => {
        dispatch(getAllTagAction())
    }, [dispatch])

    useEffect(() => {
        if (user.id !== 0) {
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
        // notifications.map((item, index) =>
        //     <div key={index}>
        //         <p>{item.content}</p>
        //     </div>)
        <List
            size='default'
            loading={loading}
            bordered
            dataSource={notifications}
            renderItem={noti => (
                <List.Item>
                    <List.Item.Meta
                        avatar=
                        {
                            <SmileOutlined style={{ fontSize: '1.3em' }} />
                        }
                        // eslint-disable-next-line jsx-a11y/anchor-is-valid
                        title={<a style={{ wordBreak: 'break-all', fontSize: '1em' }} /*onClick={() => navigate(`/problem/${problem.problem_id}`)}*/>{noti.content}</a>}
                    />
                </List.Item>
            )}
        />
    );

    const searchPost = (value: string) => {
        dispatch(searchPostAction(value))
            .then(() => {
                navigate('/search')
            })
    }

    const handleChangeMultipleTag = (value: string[]) => {
        console.log(value);
        setSearchTags(value)
    }

    const handleClickSearchByTag = async () => {
        const tagsToSearch = searchTags.join(',')
        await dispatch(searchPostByTagAction(tagsToSearch))
        navigate('/search')
    }

    const getNotification = (id: number) => {
        dispatch(getNotificationAction(id))
        setnotiNumber(0)
    }
    console.log(searchTags)
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
                <Tooltip title={!searchModeSwitch ? 'Đổi sang tìm theo thẻ' : 'Đổi sang tìm theo tên'}>
                    <SwapOutlined className='swap-icon' rotate={searchModeSwitch ? 90 : 180} onClick={() => setSearchModeSwitch(!searchModeSwitch)} />
                </Tooltip>
                {
                    searchModeSwitch ?
                        <>
                            <Select
                                mode="multiple"
                                allowClear
                                style={{ width: '100%' }}
                                placeholder="Chọn các thẻ"
                                onChange={handleChangeMultipleTag}
                                getPopupContainer={trigger => trigger.parentNode}
                            >
                                {cloneTagList.map((tag) => <Select.Option key={tag.content}>{tag.content}</Select.Option>)}
                            </Select>
                            <Button type='primary' onClick={handleClickSearchByTag} >Tìm kiếm</Button>
                        </>
                        :
                        <Input.Search
                            placeholder="Tìm theo tên"
                            allowClear
                            enterButton="Tìm kiếm"
                            size="middle"
                            onSearch={value => searchPost(value)}
                        />

                }
            </div>
            <div className='header-actions'>
                {!accessToken ?
                    <Button onClick={() => navigate('/login')} size='middle' type='ghost' className='login-btn'>Đăng nhập/Đăng ký</Button> :
                    <>
                        <Popover id='noti-popover' placement="bottomRight" title='Thông báo' content={content} trigger="click">
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
