import MDEditor from '@uiw/react-md-editor'
import { Avatar, Tag, Button, notification, Tooltip, Popover, Modal } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { deletePostAction, getOnePostAction, searchPostByTagAction, unvotePostAction, votePostAction } from '../../redux/actions/PostAction'
import { onePostSelector } from '../../redux/reducers/PostReducer'
import { ApplicationDispatch } from '../../store/store'
import './PostStyle.css'
import { HeartOutlined, ExclamationCircleOutlined, QuestionCircleOutlined, HeartFilled, FlagOutlined, FlagFilled, PlusSquareOutlined, CheckOutlined, MoreOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { axiosInstance } from '../../configs/axios'
import { accessTokenSelector, userInfoSelector } from '../../redux/reducers/AuthReducer'
import { IComment, IVote } from '../../redux/interface/PostType'
import { CommentItem } from './components/CommentItem/CommentItem'
import moment from 'moment'
import { IFollowData } from '../../redux/interface/UserType'
import { followUserAction, unfollowUserAction } from '../../redux/actions/UserAction'
import { CodeReader } from '../../common/CodeReader/CodeReader'
import { MDHelpPopUp } from '../../common/MDHelpPopUp/MDHelpPopUp'

export const Post = () => {
  const { id } = useParams<{ id: string }>()
  const user = useSelector(userInfoSelector)
  const navigate = useNavigate()
  const dispatch: ApplicationDispatch = useDispatch()
  const selectedPost = useSelector(onePostSelector)
  const [commentList, setCommentList] = useState<IComment[]>([])
  const [value, setValue] = useState<any>("");
  const [voted, setVoted] = useState(false)
  const [followed, setFollowed] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [postVoteNumber, setPostVoteNumber] = useState(0)
  const [loadingComment, setLoadingComment] = useState(false)
  const [helpPopup, setHelpPopup] = useState(false)
  const [followData, setFollowData] = useState<IFollowData>()
  const [visible, setVisible] = useState(false);
  const accessToken = useSelector(accessTokenSelector)

  useEffect(() => {
    dispatch(getOnePostAction(id!))
  }, [dispatch, id])

  useEffect(() => {
    setFollowData({
      user_id: user.id,
      user_follow_id: selectedPost[0].userid
    })
    setCommentList(selectedPost[0].postcomment)
    if (selectedPost[0].user_vote_post.some((userID) => userID === user.id))
      setVoted(true)
    else
      setVoted(false)

    if (selectedPost[0].user_set_bookmark.some((userID) => userID === user.id))
      setBookmarked(true)
    else
      setBookmarked(false)

    if (selectedPost[0].user_follow_creator.some((userID) => userID === user.id))
      setFollowed(true)
    else
      setFollowed(false)

    setPostVoteNumber(selectedPost[0].votenumber)
  }, [selectedPost, user.id])

  const handleVisibleChange = (newVisible: boolean) => {
    setVisible(newVisible);
  };

  const votePost = async () => {
    const votePost: IVote = {
      userid: user.id,
      postid: parseInt(id!),
    }
    await dispatch(votePostAction(votePost))
    setPostVoteNumber(postVoteNumber + 1)
    setVoted(true);
  }

  const unvotePost = async () => {
    const unvotePost: IVote = {
      userid: user.id,
      postid: parseInt(id!),
    }
    await dispatch(unvotePostAction(unvotePost))
    setPostVoteNumber(postVoteNumber - 1)
    setVoted(false);
  }

  const handleSubmitComment = async () => {
    if (value === "") {
      notification.error({
        placement: 'bottomRight',
        message: "Vui lòng nhập bình luận!"
      })
    }
    else {
      setLoadingComment(true)
      await axiosInstance.post(`https://code-ide-forum.herokuapp.com/api/comment`, {
        userid: user.id,
        postid: parseInt(id!),
        content: value
      }).then(async () => {
        await dispatch(getOnePostAction(id!))
        setValue('')
        setLoadingComment(false)
        notification.success({
          message: 'Đã đăng bình luận!'
        })
      })
    }
  }

  const onSetBookmark = () => {
    axiosInstance.post(`https://code-ide-forum.herokuapp.com/api/setbookmark`, {
      userid: user.id,
      postid: parseInt(id!),
    }).then(() => {
      setBookmarked(true)
      notification.success({
        message: 'Đã lưu bài viết!'
      })
    })
  }

  const onRemoveBookmark = () => {
    axiosInstance.delete(`https://code-ide-forum.herokuapp.com/api/deletebookmark`, {
      data: {
        userid: user.id,
        postid: parseInt(id!),
      }
    }).then(() => {
      setBookmarked(false)
      notification.success({
        message: 'Đã bỏ lưu!'
      })
    })
  }

  const onFollow = async () => {
    await dispatch(followUserAction(followData!))
    setFollowed(true)
  }

  const onUnfollow = async () => {
    await dispatch(unfollowUserAction(followData!))
    setFollowed(false)
  }

  const showDeleteConfirm = () => {
    setVisible(false)
    Modal.confirm({
      centered: true,
      closable: true,
      title: 'Bạn chắc chắn muốn xóa bài viết?',
      icon: <ExclamationCircleOutlined />,
      content: 'Bài viết cũng sẽ bị xóa khỏi bài viết đã lưu của mọi người dùng!',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      async onOk() {
        await dispatch(deletePostAction(parseInt(id!)))
        navigate('/')
      },
    });
  };

  const onClickTag = async (value: string) => {
    await dispatch(searchPostByTagAction(value))
    navigate('/search')
  }

  return (
    <div>
      <div className='post-container'>
        <div className='post-heading'>
          <div className='post-title'>
            <h1>{selectedPost[0].post_title}</h1>
            {selectedPost[0].userid === user.id ?
              <Popover
                content={
                  <div>
                    <div className="user-popover-item" onClick={() => navigate(`/editPost/${id}`)}>
                      <EditOutlined style={{ marginRight: 7 }} />
                      <span className="navbar-span">Sửa bài viết</span>
                    </div>
                    <div
                      className="user-popover-item"
                      onClick={showDeleteConfirm}
                    >
                      <DeleteOutlined style={{ marginRight: 7, color: 'crimson' }} />
                      <span className="navbar-span" style={{ color: 'crimson' }}>Xóa bài viết</span>
                    </div>
                  </div>}
                trigger="click"
                visible={visible}
                onVisibleChange={handleVisibleChange}
                placement='bottomRight'
                className="user-popover"
              >
                <Button className='post-more-btn' shape='circle'><MoreOutlined /></Button>
              </Popover>
              : null}
          </div>
          <Tooltip placement='right' title={moment(selectedPost[0].post_created_at).format('DD/MM/YYYY --- HH:mm:ss')}>
            <span className='post-time'>{moment(selectedPost[0].post_created_at).fromNow()}</span>
          </Tooltip>
          <div className='post-tag-container'>
            {selectedPost[0].posttag.map((tag) => <Tag onClick={() => onClickTag(tag.tagcontent)} className='tag' color={tag.tagcolor}>{tag.tagcontent}</Tag>)}
          </div>
          <div className='post-user-container'>
            <span className='post-user'><Avatar className='post-avatar' src={selectedPost[0].avatarImage} />{selectedPost[0].postusername}</span>
            {accessToken ? selectedPost[0].userid !== user.id ?
              followed ?
                <Button icon={<CheckOutlined />} size='small' type='default' onClick={() => onUnfollow()} >Đã theo dõi</Button>
                :
                <Button icon={<PlusSquareOutlined />} size='small' type='primary' onClick={() => onFollow()} >Theo dõi</Button>
              : null : null}
          </div>
        </div>
        <div className="post-main" data-color-mode="light">
          {
            accessToken ?
              <div className='vote-container'>
                {
                  voted ?
                    <HeartFilled disabled={!accessToken} className='heart' onClick={() => unvotePost()} /> :
                    <HeartOutlined disabled={!accessToken} onClick={() => votePost()} />
                }
                {postVoteNumber}
                {
                  bookmarked ?
                    <FlagFilled onClick={() => onRemoveBookmark()} className='bookmark-action bookmarked' /> :
                    <Tooltip title='Lưu bài viết' placement='bottom'>
                      <FlagOutlined onClick={() => onSetBookmark()} className='bookmark-action' />
                    </Tooltip>
                }
              </div> : null
          }
          <MDEditor.Markdown
            className='markdown-section'
            source={selectedPost[0].postcontent}
          />
        </div>
        {
          !selectedPost[0].post_code ? null :
            <div className='code-section'>
              <CodeReader userCode={selectedPost[0].post_code} userCodeLang={selectedPost[0].post_language !== null ? selectedPost[0].post_language : 'python'} />
            </div>
        }
        <div className='comment-section'>
          <h4>Bình luận</h4>
          {
            accessToken ?
              <div className="comment-input" data-color-mode="light">
                <MDEditor
                  className='comment-md-editor'
                  value={value}
                  onChange={setValue}
                />
                <QuestionCircleOutlined style={{fontSize: '1.2rem'}} onClick={() => setHelpPopup(true)} />
                <div className='comment-btn'>
                  <Button loading={loadingComment} shape='round' size='middle' type="primary" htmlType="submit" onClick={handleSubmitComment} >Đăng bình luận</Button>
                </div>
              </div> :
              <div className="comment-input">
                <div className='comment-unreg-btn'>
                  <Button shape='round' size='middle' type="primary" htmlType="submit" onClick={() => navigate('/login')} >Đăng ký tài khoản để bình luận</Button>
                </div>
              </div>
          }
          {
            commentList.map((comment: IComment) => <CommentItem postID={selectedPost[0].postid} comment={comment} />).reverse()
          }
        </div>
      </div>
      <MDHelpPopUp helpModalVisible={helpPopup} setHelpModalVisible={setHelpPopup} />
    </div>
  )
}
