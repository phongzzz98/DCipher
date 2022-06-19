import { Avatar, Button } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import bigOunce from '../../assets/images/BigOunce.png'
import thumbnail from '../../assets/images/abstract-darkblue.jpg'
import { getOneUsersAction } from '../../redux/actions/UserAction'
import { oneUserSelector } from '../../redux/reducers/UserReducer'
import { ApplicationDispatch } from '../../store/store'
import { PostsBlock } from '../MyPage/components/PostsBlock/PostsBlock'
import { StatusBlock } from '../MyPage/components/StatusBlock/StatusBlock'
import { PublicProfileBlock } from './components/PublicProfileBlock/PublicProfileBlock'
import { PublicFollowingBlock } from './components/PublicFollowingBlock/PublicFollowingBlock'

export const UserPage = () => {
    const user = useSelector(oneUserSelector)
    const dispatch: ApplicationDispatch = useDispatch()
    const { id } = useParams<{ id: string }>()

    useEffect(() => {
      dispatch(getOneUsersAction(parseInt(id!)))
    }, [dispatch, id])

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
                        {/* <h6>tham gia từ {moment(user.created_at).format('DD/MM/YYYY')}</h6> */}
                    </div>
                </div>
                <Button size='middle'>Theo dõi</Button>
            </div>
            <div className='main-info'>
                <PublicProfileBlock userAbout={user.about} userDisplayname={user.displayname} userLink={user.linkSNS} />
                <StatusBlock userPosts={user.post_created} commentNumber={user.number_of_comment} score={user.score} />
                <PublicFollowingBlock userFollow={user.user_follow} id={id!} selectedUser={user} />
            </div>
            <div className='user-posts-block'>
                <PostsBlock userPosts={user.post_created} />
            </div>
        </div>
    )
}
