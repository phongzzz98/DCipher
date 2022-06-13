import { Avatar, Button } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { axiosInstance } from '../../configs/axios'
import { userInfoSelector } from '../../redux/reducers/AuthReducer'
import { ApplicationDispatch } from '../../store/store'
import bigOunce from '../../assets/images/BigOunce.png'
import thumbnail from '../../assets/images/abstract-darkblue.jpg'
import './MyPageStyle.css'
import moment from 'moment'
import { EditOutlined } from "@ant-design/icons";
import { ProfileBlock } from './components/ProfileBlock/ProfileBlock'
import { StatusBlock } from './components/StatusBlock/StatusBlock'
import { FollowingBlock } from './components/FollowingBlock/FollowingBlock'
import { getUserDetailsAction, seeUserCommentAction, seeUserPostAction } from '../../redux/actions/UserAction'
import { userCommentsSelector, userDetailSelector, userPostsSelector } from '../../redux/reducers/UserReducer'
import { PostsBlock } from './components/PostsBlock/PostsBlock'

export const MyPage = () => {
  const dispatch: ApplicationDispatch = useDispatch()
  const user = useSelector(userInfoSelector)
  const userDetails = useSelector(userDetailSelector)
  const userPosts = useSelector(userPostsSelector)
  const userComments = useSelector(userCommentsSelector)
  useEffect(() => {
    // axiosInstance.get(`https://code-ide-forum.herokuapp.com/api/userdetails/seecomment/${user.id}`)
    //       .then((res) => {
    //         console.log(res.data)
    //       })
    if (user.id !== 0) {
      dispatch(getUserDetailsAction(user.id))
      dispatch(seeUserPostAction(user.id))
      dispatch(seeUserCommentAction(user.id))
    }
    else return;
  }, [dispatch, user.id])
  console.log('Details',userDetails)
  return (
    <div className='my-page'>
      <div className='my-page-backdrop'>
        <img className='thumbnail-img' src={thumbnail} alt="Thumbnail" />
      </div>
      <div className="basic-user-info">
        <div className='avatar-name-container'>
          <Avatar size={80} shape={'square'} className="my-avatar" src={!userDetails.avatarImage ? bigOunce : 'https://i.ytimg.com/vi/LFhB0-xRiyM/maxresdefault.jpg'} />
          <div className='name-and-joindate'>
            <h3>{user.username}</h3>
            <h6>tham gia từ {moment(user.created_at).format('DD/MM/YYYY')}</h6>
          </div>
        </div>
        <Button icon={<EditOutlined />} size='middle'>Sửa thông tin cá nhân</Button>
      </div>
      <div className='main-info'>
        <ProfileBlock userDetail={userDetails} />
        <StatusBlock userPosts={userPosts} commentNumber={userComments.length} score={userDetails.score}/>
        <FollowingBlock userFollowing={userDetails.user_following}/>
      </div>
      <div className='user-posts-block'>
        <PostsBlock userPosts={userPosts} />
      </div>
    </div>
  )
}
