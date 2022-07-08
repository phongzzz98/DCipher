import { Modal, Form, Input, notification } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editPasswordUserAction } from '../../redux/actions/UserAction';
import { IEditPasswordUser } from '../../redux/interface/UserType';
import { userInfoSelector } from '../../redux/reducers/AuthReducer';
import { ApplicationDispatch } from '../../store/store'

interface PasswordModalProps {
    visible: boolean;
    setVisible: Function;
}

export const PasswordModal = ({visible, setVisible}: PasswordModalProps) => {
    const dispatch: ApplicationDispatch = useDispatch()
    const user = useSelector(userInfoSelector)
    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')
    const [confirmLoading, setConfirmLoading] = useState(false);

    const handleOk = async () => {
        if (password === '' || oldPassword === '') {
            notification.error({
                placement: 'bottomRight',
                message: "Vui lòng nhập mật khẩu!"
            })
        }
        else {
            const newPwd: IEditPasswordUser = {
                user_id: user.id,
                password: password,
                old_password: oldPassword
            }
            setConfirmLoading(true)
            await dispatch(editPasswordUserAction(newPwd))
            setConfirmLoading(false)
            setVisible(false)
        }
    }
    
  return (
    <Modal
            destroyOnClose={true}
            title="Đổi mật khẩu"
            visible={visible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={() => setVisible(false)}
            okText='Đổi'
            cancelText='Hủy'
            width={'50%'}
            style={{ fontFamily: 'SofiaProSemiBold' }}
        >
            <Form labelCol={{ span: 5 }} wrapperCol={{ span: 18 }} >
            <Form.Item className='edit-pwd-form-item' label="Mật khẩu cũ" name='editUserOldPassword' rules={[{ required: true, message: 'Hãy nhập mật khẩu cũ!' }, { min: 1, message: 'Mật khẩu phải có ít nhất 1 ký tự!' }]}>
                    <Input.Password size="middle" placeholder='Mật khẩu cũ' onChange={(e) => setOldPassword(e.target.value)} />
                </Form.Item>
                <Form.Item className='edit-pwd-form-item' label="Mật khẩu mới" name='editUserPassword' rules={[{ required: true, message: 'Hãy nhập mật khẩu!' }, { min: 1, message: 'Mật khẩu phải có ít nhất 1 ký tự!' }]}>
                    <Input.Password size="middle" placeholder='Mật khẩu mới' onChange={(e) => setPassword(e.target.value)} />
                </Form.Item>
            </Form>
        </Modal>
  )
}
