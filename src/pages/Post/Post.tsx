import MDEditor from '@uiw/react-md-editor'
import { Avatar, Tag, Button, notification } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { CodeEditor } from '../../common/CodeEditor/CodeEditor'
import { getOnePostAction } from '../../redux/actions/PostAction'
import { onePostSelector } from '../../redux/reducers/PostReducer'
import { ApplicationDispatch } from '../../store/store'
import './PostStyle.css'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import { axiosInstance } from '../../configs/axios'
import { accessTokenSelector, userInfoSelector } from '../../redux/reducers/AuthReducer'
import { IComment } from '../../redux/interface/PostType'
import { CommentItem } from './components/CommentItem/CommentItem'

export const Post = () => {
  const { id } = useParams<{ id: string }>()
  const user = useSelector(userInfoSelector)
  const dispatch: ApplicationDispatch = useDispatch()
  const selectedPost = useSelector(onePostSelector)
  const [value, setValue] = useState<any>("");
  const [voted, setVoted] = useState(false)
  const [postVoteNumber, setPostVoteNumber] = useState(selectedPost.postuser[0].votenumber)
  const accessToken = useSelector(accessTokenSelector)
  
  useEffect(() => {
    dispatch(getOnePostAction(id!))
    if(selectedPost.postvote.some((userID) => userID === user.id)){
      setVoted(true)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id])

  const votePost = () => {
    axiosInstance.post(`https://code-ide-forum.herokuapp.com/api/vote`, {
      userid: user.id,
      postid: id,
    }).then(() => {
      setPostVoteNumber(selectedPost.postuser[0].votenumber + 1)
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
      setPostVoteNumber(selectedPost.postuser[0].votenumber - 1)
    }).then(() => {
      setVoted(false);
    })
  }

  const handleSubmitComment = () => {
    axiosInstance.post(`https://code-ide-forum.herokuapp.com/api/comment`, {
      userid: user.id,
      postid: parseInt(id!),
      content: value
    }).then(() => {
      notification.success({
        message: 'Commented!'
      })
    })
  }

  return (
    <div>
      <div className='post-container'>
        <div className='post-heading'>
          <h1>{selectedPost.postuser[0].post_title}</h1>
          <div className='post-tag-container'>
            {selectedPost.posttag.map((tag) => <Tag className='tag' color={tag.tagcolor}>{tag.tagcontent}</Tag>)}
          </div>
          <h5 className='post-user-and-time'>bởi <Avatar className='post-avatar' src={'https://joeschmoe.io/api/v1/random'} />{selectedPost.postuser[0].postusername} vào {selectedPost.postuser[0].created_at}</h5>
        </div>
        <div className="post-main" data-color-mode="light">
          <div className='vote-container'>
            {
              voted ?
                <HeartFilled disabled={!accessToken} className='heart' onClick={() => unvotePost()} /> :
                <HeartOutlined disabled={!accessToken} onClick={() => votePost()} />
            }
            {postVoteNumber <= 0 ? 0 : postVoteNumber}
          </div>
          <MDEditor.Markdown
            className='markdown-section'
            source={selectedPost.postuser[0].postcontent}
          />
        </div>
        {
          !selectedPost.postuser[0].post_code ? null : <div className='code-section'>
            <CodeEditor userCode={selectedPost.postuser[0].post_code} setUserCode={() => { }} />
          </div>
        }
        <div className='comment-section'>
          <h4>Bình luận</h4>
          <div className="comment-input" data-color-mode="light">
            <MDEditor
              className='comment-md-editor'
              value={value}
              onChange={setValue}
            />
            <div className='comment-btn'>
              <Button shape='round' size='middle' type="primary" htmlType="submit" onClick={handleSubmitComment} >Đăng bình luận</Button>
            </div>
          </div>
          {
            selectedPost.postcomment.map((comment: IComment) => <CommentItem comment={comment} /> )
          }
        </div>
      </div>
    </div>
  )
}
