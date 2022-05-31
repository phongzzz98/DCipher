import MDEditor from '@uiw/react-md-editor'
import { Avatar, Tag, Tooltip, Comment, Button, notification, Space } from 'antd'
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
import { userInfoSelector } from '../../redux/reducers/AuthReducer'
import moment from 'moment'
import React from 'react'

export const Post = () => {
  const { id } = useParams<{ id: string }>()
  const user = useSelector(userInfoSelector)
  const dispatch: ApplicationDispatch = useDispatch()
  const selectedPost = useSelector(onePostSelector)
  const [value, setValue] = useState<any>("**Hello world!!!**");
  const [voted, setVoted] = useState(false)

  useEffect(() => {
    dispatch(getOnePostAction(id!))
  }, [dispatch, id])

  const votePost = () => {
    axiosInstance.post(`https://code-ide-forum.herokuapp.com/api/vote`, {
      userid: user.id,
      postid: id,
    }).then(() => {
      dispatch(getOnePostAction(id!))
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
      dispatch(getOnePostAction(id!))
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

  const IconText = ({ icon, text }: any) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

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
                <HeartFilled className='heart' onClick={() => unvotePost()} /> :
                <HeartOutlined onClick={() => votePost()} />
            }
            {selectedPost.postuser[0].votenumber}
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
            <Button shape='round' size='large' type="primary" htmlType="submit" onClick={handleSubmitComment} >Comment</Button>
          </div>
          {
            selectedPost.postcomment.map((comment) =>
              <Comment
                author={<span className='comment-user'>{comment.commentusername}</span>}
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
                content={
                  <div className="comment-main" data-color-mode="light">
                    <MDEditor.Markdown
                      className='comment-markdown-section'
                      source={comment.commentcontent}
                    />
                  </div>
                }
                datetime={
                  <Tooltip title={moment(comment.created_at).format('DD/MM/YYYY HH:mm:ss')}>
                    <span>{moment(comment.created_at).fromNow()}</span>
                  </Tooltip>
                }
                actions={[
                  <div className='comment-action'>
                    <IconText icon={HeartOutlined} text={comment.commentvotenumber} key="list-vertical-star" />
                  </div>
                ]}
              />)
          }
        </div>
      </div>
    </div>
  )
}
