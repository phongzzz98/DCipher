import MDEditor from '@uiw/react-md-editor'
import { Avatar, Tag, Button, notification, Tooltip } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { CodeEditor } from '../../common/CodeEditor/CodeEditor'
import { getOnePostAction } from '../../redux/actions/PostAction'
import { onePostSelector } from '../../redux/reducers/PostReducer'
import { ApplicationDispatch } from '../../store/store'
import './PostStyle.css'
import { HeartOutlined, HeartFilled, FlagOutlined, FlagFilled } from '@ant-design/icons'
import { axiosInstance } from '../../configs/axios'
import { accessTokenSelector, userInfoSelector } from '../../redux/reducers/AuthReducer'
import { IComment } from '../../redux/interface/PostType'
import { CommentItem } from './components/CommentItem/CommentItem'
import moment from 'moment'

export const Post = () => {
  const { id } = useParams<{ id: string }>()
  const user = useSelector(userInfoSelector)
  const navigate = useNavigate()
  const dispatch: ApplicationDispatch = useDispatch()
  const selectedPost = useSelector(onePostSelector)
  const [value, setValue] = useState<any>("");
  const [voted, setVoted] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [postVoteNumber, setPostVoteNumber] = useState(0)
  const [loadingComment, setLoadingComment] = useState(false)
  const accessToken = useSelector(accessTokenSelector)
  useEffect(() => {
    dispatch(getOnePostAction(id!))
  }, [dispatch, id])

  useEffect(() => {
    if (selectedPost[0].user_vote_post.some((userID) => userID === user.id))
      setVoted(true)
    else
      setVoted(false)

    if (selectedPost[0].user_set_bookmark.some((userID) => userID === user.id))
      setBookmarked(true)
    else
      setBookmarked(false)

    setPostVoteNumber(selectedPost[0].votenumber)
  }, [selectedPost, user.id])


  const votePost = () => {
    axiosInstance.post(`https://code-ide-forum.herokuapp.com/api/vote`, {
      userid: user.id,
      postid: id,
    }).then(() => {
      setPostVoteNumber(postVoteNumber + 1)
    }).then(() => {
      setVoted(true);
    })
  }

  const unvotePost = () => {
    axiosInstance.delete(`https://code-ide-forum.herokuapp.com/api/deletevote`, {
      data: {
        userid: user.id,
        postid: parseInt(id!),
      }
    }).then(() => {
      setPostVoteNumber(postVoteNumber - 1)
    }).then(() => {
      setVoted(false);
    })
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
      }).then(() => {
        setLoadingComment(false)
        notification.success({
          message: 'Commented!'
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
        message: 'Bookmarked!'
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
        message: 'Removed Bookmark!'
      })
    })
  }

  return (
    <div>
      <div className='post-container'>
        <div className='post-heading'>
          <h1>{selectedPost[0].post_title}</h1>
          <Tooltip placement='right' title={moment(selectedPost[0].post_created_at).format('DD/MM/YYYY --- HH:mm:ss')}>
            <span className='post-time'>{moment(selectedPost[0].post_created_at).fromNow()}</span>
          </Tooltip>
          <div className='post-tag-container'>
            {selectedPost[0].posttag.map((tag) => <Tag className='tag' color={tag.tagcolor}>{tag.tagcontent}</Tag>)}
          </div>
          <div className='post-user-container'>
            <span className='post-user'>bởi <Avatar className='post-avatar' src={'https://joeschmoe.io/api/v1/random'} />{selectedPost[0].postusername}</span>
            <Button size='small' type='default' >Theo dõi</Button>
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
              <CodeEditor userCode={selectedPost[0].post_code} setUserCode={() => { }} />
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
            selectedPost[0].postcomment.map((comment: IComment) => <CommentItem comment={comment} />)
          }
        </div>
      </div>
    </div>
  )
}
