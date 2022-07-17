import { Avatar, Button } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import bigOunce from '../../assets/images/BigOunce.png'
import thumbnail from '../../assets/images/abstract-darkblue.jpg'
import { followUserAction, getOneUsersAction, unfollowUserAction } from '../../redux/actions/UserAction'
import { PlusSquareOutlined, CheckOutlined } from '@ant-design/icons'
import { oneUserSelector } from '../../redux/reducers/UserReducer'
import { ApplicationDispatch } from '../../store/store'
import { PostsBlock } from '../MyPage/components/PostsBlock/PostsBlock'
import { StatusBlock } from '../MyPage/components/StatusBlock/StatusBlock'
import { PublicProfileBlock } from './components/PublicProfileBlock/PublicProfileBlock'
import { PublicFollowingBlock } from './components/PublicFollowingBlock/PublicFollowingBlock'
import { IFollowData } from '../../redux/interface/UserType'
import { userInfoSelector } from '../../redux/reducers/AuthReducer'
import moment from 'moment'

export const UserPage = () => {
    const user = useSelector(oneUserSelector)
    const userInfo = useSelector(userInfoSelector)
    const dispatch: ApplicationDispatch = useDispatch()
    const { id } = useParams<{ id: string }>()
    const [followData, setFollowData] = useState<IFollowData>()
    const [followed, setFollowed] = useState(false)

    useEffect(() => {
        dispatch(getOneUsersAction(parseInt(id!)))
    }, [dispatch, id])

    useEffect(() => {
        setFollowData({
            user_id: userInfo.id,
            user_follow_id: user.userid
        })
        if (user.user_follow.some((user) => user.userid === userInfo.id))
            setFollowed(true)
        else
            setFollowed(false)
    }, [user.user_follow, user.userid, userInfo.id])

    const onFollow = async () => {
        await dispatch(followUserAction(followData!))
        setFollowed(true)
    }

    const onUnfollow = async () => {
        await dispatch(unfollowUserAction(followData!))
        setFollowed(false)
    }

    return (
        <div className='my-page'>
            <div className='my-page-backdrop'>
                <img className='thumbnail-img' src={thumbnail} alt="Thumbnail" />
            </div>
            <div className="basic-user-info">
                <div className='avatar-name-container'>
                    <Avatar size={80} shape={'square'} className="my-avatar" src={!user.avatarImage ? bigOunce : user.avatarImage} />
                    <div className='name-and-joindate'>
                        <h3>{user.displayname}</h3>
                        <h6>tham gia từ {moment(user.created_at).format('DD/MM/YYYY')}</h6>
                    </div>
                </div>
                {user.userid !== userInfo.id ?
                    followed ?
                        <Button style={{borderRadius: '10px'}} icon={<CheckOutlined />} size='large' type='default' onClick={() => onUnfollow()} >Đã theo dõi</Button>
                        :
                        <Button style={{borderRadius: '10px'}} icon={<PlusSquareOutlined />} size='large' type='primary' onClick={() => onFollow()} >Theo dõi</Button>
                    : null}
            </div>
            <div className='main-info'>
                <PublicProfileBlock userAbout={user.about} userDisplayname={user.displayname} userLink={user.linkSNS} />
                <StatusBlock userID={user.userid} userPosts={user.post_created} commentNumber={user.number_of_comment} score={user.score} />
                <PublicFollowingBlock userFollow={user.user_follow} id={id!} selectedUser={user} />
            </div>
            <div className='user-posts-block'>
                <PostsBlock userPosts={user.post_created} />
            </div>
        </div>
    )
}
