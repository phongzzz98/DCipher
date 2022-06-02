import MDEditor from '@uiw/react-md-editor'
import moment from 'moment'
import { Avatar, Tooltip, Comment } from 'antd'
import { IComment } from '../../../../redux/interface/PostType'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import './CommentItemStyle.css'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { axiosInstance } from '../../../../configs/axios'
import { userInfoSelector } from '../../../../redux/reducers/AuthReducer'

interface CommentItemProps {
    comment: IComment
}

export const CommentItem = ({ comment }: CommentItemProps) => {
    const [voted, setVoted] = useState(false)
    const user = useSelector(userInfoSelector)
    const [commentVoteNumber, setCommentVoteNumber] = useState(comment.commentvotenumber)

    const voteComment = () => {
        axiosInstance.post(`https://code-ide-forum.herokuapp.com/api/vote`, {
          userid: user.id,
          commentid: comment.commentid,
        }).then(() => {
          setCommentVoteNumber(commentVoteNumber + 1)
        }).then(() => {
          setVoted(true);
        })
      }
    
      const unvoteComment = () => {
        axiosInstance.delete(`https://code-ide-forum.herokuapp.com/api/deletevote`, {
          data: {
            userid: user.id,
            commentid: comment.commentid,
          }
        }).then(() => {
          setCommentVoteNumber(commentVoteNumber - 1)
        }).then(() => {
          setVoted(false);
        })
      }

    return (
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
                    <span className='comment-time'>{moment(comment.created_at).fromNow()}</span>
                </Tooltip>
            }
            actions={[
                <div className='comment-action'>
                    {
                        voted ? <HeartFilled className='comment-filled-heart' onClick={() => unvoteComment()} /> :
                            <HeartOutlined onClick={() => voteComment()} className='comment-heart' key="list-vertical-star" />
                    }
                    <span className='comment-vote-number'>{comment.commentvotenumber}</span>
                </div>
            ]}
        />
    )
}
