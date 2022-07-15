import MDEditor from '@uiw/react-md-editor'
import moment from 'moment'
import defaultAvatar from '../../../../assets/images/BlankAvatar.jpg'
import { Avatar, Tooltip, Comment, Modal } from 'antd'
import { IComment } from '../../../../redux/interface/PostType'
import { HeartOutlined, HeartFilled, EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import './CommentItemStyle.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { axiosInstance } from '../../../../configs/axios'
import { userInfoSelector } from '../../../../redux/reducers/AuthReducer'
import { EditCommentModal } from '../EditCommentModal/EditCommentModal'
import { ApplicationDispatch } from '../../../../store/store'
import { deleteCommentAction, getOnePostAction } from '../../../../redux/actions/PostAction'

interface CommentItemProps {
  comment: IComment;
  postID: number;
}

export const CommentItem = ({ comment, postID }: CommentItemProps) => {
  const dispatch: ApplicationDispatch = useDispatch()
  const [voted, setVoted] = useState(false)
  const [editModalVisible, setEditModalVisible] = useState(false)
  const user = useSelector(userInfoSelector)
  const [commentVoteNumber, setCommentVoteNumber] = useState(0)
  
  console.log(voted)
  useEffect(() => {
    if (comment.user_vote_comment.some((userID) => userID === user.id)) {
      setVoted(true)
    }
    setCommentVoteNumber(comment.commentvotenumber)
  }, [comment.commentvotenumber, comment.user_vote_comment, user.id])

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

  const showDeleteConfirm = (id: number) => {
    Modal.confirm({
      centered: true,
      closable: true,
      title: 'Bạn chắc chắn muốn xóa bình luận này?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      async onOk() {
        await dispatch(deleteCommentAction(id))
        await dispatch(getOnePostAction(postID.toString()))
      },
    });
  };

  return (
    <div>
      <Comment
        author={<span className='comment-user'>{comment.commentusername}</span>}
        avatar={<Avatar src={comment.avatarImage ? comment.avatarImage : defaultAvatar} alt="Ảnh đại diện" />}
        content={
          <div className="comment-main" data-color-mode="light">
            <MDEditor.Markdown
              className='comment-markdown-section'
              source={comment.commentcontent}
            />
          </div>
        }
        datetime={
          <div style={{ display: 'flex' }}>
            <Tooltip title={moment(comment.created_at).format('DD/MM/YYYY HH:mm:ss')}>
              <span className='comment-time'>{moment(comment.created_at).fromNow()}</span>
            </Tooltip>
            {
              comment.commentuserid === user.id ?
                <div style={{ marginLeft: 10 }}>
                  <Tooltip title='Sửa bình luận' placement='top'>
                    <EditOutlined className='icon-edit-comment' onClick={() => setEditModalVisible(true)} />
                  </Tooltip>
                  <Tooltip title='Xóa bình luận' placement='top'>
                    <DeleteOutlined className='icon-remove-comment' onClick={() => showDeleteConfirm(comment.commentid)} />
                  </Tooltip>
                </div> : null
            }
          </div>
        }
        actions={[
          <div className='comment-action'>
            {
              voted ? <HeartFilled className='comment-filled-heart' onClick={() => unvoteComment()} /> :
                <HeartOutlined onClick={() => voteComment()} className='comment-heart' key="list-vertical-star" />
            }
            <span className='comment-vote-number'>{commentVoteNumber}</span>
          </div>
        ]}
      />
      <EditCommentModal postID={postID} editModalVisible={editModalVisible} setEditModalVisible={setEditModalVisible} comment={comment} />
    </div>
  )
}
