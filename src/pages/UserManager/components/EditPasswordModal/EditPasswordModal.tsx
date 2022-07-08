import { Form, Input, Modal, notification } from 'antd'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { editPasswordAdminAction, getAllUsersAdminAction, getOneUserAdminAction } from '../../../../redux/actions/UserAction';
import { IEditPasswordAdmin } from '../../../../redux/interface/UserType';
import { ApplicationDispatch } from '../../../../store/store';

interface EditPasswordModalProps {
    editPasswordModalVisible: boolean;
    setEditPasswordModalVisible: Function;
    userID: number;
}

export const EditPasswordModal = ({ setEditPasswordModalVisible, editPasswordModalVisible, userID }: EditPasswordModalProps) => {
    const dispatch: ApplicationDispatch = useDispatch()
    const [password, setPassword] = useState('')
    const [confirmLoading, setConfirmLoading] = useState(false);

    const handleOk = async () => {
        if (password === '') {
            notification.error({
                placement: 'bottomRight',
                message: "Vui lòng nhập mật khẩu!"
            })
        }
        else {
            const newPwd: IEditPasswordAdmin = {
                user_id: userID,
                password: password
            }
            setConfirmLoading(true)
            await dispatch(editPasswordAdminAction(newPwd))
            await dispatch(getOneUserAdminAction(userID))
            await dispatch(getAllUsersAdminAction())
            setConfirmLoading(false)
            setEditPasswordModalVisible(false)
        }
    }

    return (
        <Modal
            destroyOnClose={true}
            title="Đổi mật khẩu"
            visible={editPasswordModalVisible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={() => setEditPasswordModalVisible(false)}
            okText='Đổi'
            cancelText='Hủy'
            width={'50%'}
            style={{ fontFamily: 'SofiaProSemiBold' }}
        >
            <Form labelCol={{ span: 5 }} wrapperCol={{ span: 18 }} >
                <Form.Item className='edit-user-form-item' label="Mật khẩu mới" name='editUserPassword' rules={[{ required: true, message: 'Hãy nhập mật khẩu!' }, { min: 1, message: 'Mật khẩu phải có ít nhất 1 ký tự!' }]}>
                    <Input.Password size="middle" onChange={(e) => setPassword(e.target.value)} />
                </Form.Item>
            </Form>
        </Modal>
    )
}
