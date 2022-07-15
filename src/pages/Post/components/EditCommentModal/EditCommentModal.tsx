import MDEditor from '@uiw/react-md-editor'
import { Modal, notification } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { editCommentAction, getOnePostAction } from '../../../../redux/actions/PostAction';
import { IComment, IEditComment } from '../../../../redux/interface/PostType';
import { ApplicationDispatch } from '../../../../store/store';

interface EditCommentModalProps {
    editModalVisible: boolean;
    setEditModalVisible: Function;
    comment: IComment;
    postID: number;
}

export const EditCommentModal = ({editModalVisible, setEditModalVisible, comment, postID}: EditCommentModalProps) => {
    const dispatch: ApplicationDispatch = useDispatch()
    const [value, setValue] = useState<any>("");
    const [confirmLoading, setConfirmLoading] = useState(false);
    const handleCancel = () => {
        setEditModalVisible(false);
    };

    useEffect(() => {
      setValue(comment.commentcontent)
    }, [comment.commentcontent])
    
    const handleOk = () => {
        if (value === "") {
          notification.error({
            placement: 'bottomRight',
            message: "Vui lòng nhập các trường còn thiếu!"
          })
        }
        else{
          setConfirmLoading(true);
          setTimeout(async () => {
            const newComment: IEditComment = {
                id: comment.commentid,
                content: value,
                votenumber: comment.commentvotenumber
            }
            await dispatch(editCommentAction(newComment))
            await dispatch(getOnePostAction(postID.toString()))
            setConfirmLoading(false);
            setEditModalVisible(false)
          }, 500);
        }
      };

    return (
        <Modal
            destroyOnClose={true}
            title="Sửa bình luận"
            visible={editModalVisible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            okText='Sửa'
            cancelText='Hủy'
            width={'85%'}
            style={{ fontFamily: 'SofiaProSemiBold' }}
        >
            <div className="comment-input" data-color-mode="light">
                <MDEditor
                    className='comment-md-editor'
                    value={value}
                    onChange={setValue}
                />
            </div>
        </Modal>
    )
}
