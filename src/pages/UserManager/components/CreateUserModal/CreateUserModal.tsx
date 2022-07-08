import { Modal, Form, Input, Radio, DatePicker, InputNumber, notification, Image, Empty } from 'antd'
import React, { useState } from 'react'
import { FacebookFilled, LinkedinFilled, TwitterSquareFilled } from '@ant-design/icons'
import './CreateUserModalStyle.css'
import { useForm } from 'antd/lib/form/Form';
import { ICreateUser } from '../../../../redux/interface/UserType';
import { ApplicationDispatch } from '../../../../store/store';
import { useDispatch } from 'react-redux';
import { createUsersAction, getAllUsersAdminAction } from '../../../../redux/actions/UserAction';
import moment from 'moment';

interface CreateUserModalProps {
    createModalVisible: boolean;
    setCreateModalVisible: Function;
}

export const CreateUserModal = ({ createModalVisible, setCreateModalVisible }: CreateUserModalProps) => {
    const dispatch: ApplicationDispatch = useDispatch()
    const [currentImage, setCurrentImage] = useState('')
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = useForm();
    const [roleSelect, setRoleSelect] = useState(1)

    const handleCancel = () => {
        setCreateModalVisible(false);
    };

    const handleOk = () => {
        form.validateFields().then(values => {
            if (values.createUserEmail === "" || values.createUserPassword === "" || values.createUserDisplayname === "") {
                notification.error({
                    placement: 'bottomRight',
                    message: "Vui lòng nhập các trường còn thiếu!"
                })
            }
            else {
                setConfirmLoading(true);
                setTimeout(async () => {
                    const newUser: ICreateUser = {
                        about: values.createUserAbout || '',
                        avatarImage: values.createUserAvatar || '',
                        birth: values.createUserBirthday ? values.createUserBirthday.format('DD-MM-YYYY') : moment('1/1/1900').format('DD-MM-YYYY'),
                        email: values.createUserEmail,
                        password: values.createUserPassword,
                        fullName: values.createUserFullname || '',
                        role: roleSelect,
                        score: values.createUserScore || 0,
                        username: values.createUserDisplayname,
                        notification: 0,
                        verify_email: 0,
                        facebook_account: values.createUserLinkFB || '',
                        linkedin_account: values.createUserLinkLK || '',
                        twitter_account: values.createUserLinkTW || '',
                    }
                    await dispatch(createUsersAction(newUser))
                    setConfirmLoading(false);
                    dispatch(getAllUsersAdminAction())
                    setCreateModalVisible(false)
                }, 500);
            }
        })
    };

    const renderImage = () => {
        return (
          <div style={{ justifyContent: 'center' }} className="ant-row ant-form-item edit-profile-form-item">
            <Image width={300} src={currentImage} />
          </div>
        )
      }

    return (
        <Modal
            destroyOnClose={true}
            title="Tạo người dùng mới"
            visible={createModalVisible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            okText='Tạo'
            cancelText='Hủy'
            width={'80%'}
            style={{ fontFamily: 'SofiaProSemiBold' }}
        >
            <Form form={form} labelCol={{ span: 3 }} wrapperCol={{ span: 20 }} >
                <Form.Item className='create-user-form-item' label="Email" name='createUserEmail' rules={[{ required: true, message: 'Hãy nhập địa chỉ email!' }]}>
                    <Input size="middle" />
                </Form.Item>
                <Form.Item className='create-user-form-item' label="Mật khẩu" name='createUserPassword' rules={[{ required: true, message: 'Hãy nhập mật khẩu!' }]}>
                    <Input size="middle" />
                </Form.Item>
                <Form.Item className='create-user-form-item' label="Phân quyền" name='createUserRole'>
                    <Radio.Group name="radiogroup" defaultValue={1} onChange={(e) => setRoleSelect(e.target.value)}>
                        <Radio value={0}>Admin</Radio>
                        <Radio value={1}>Thành viên</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item className='create-user-form-item' label="Tên hiển thị" name='createUserDisplayname' rules={[{ required: true, message: 'Hãy nhập tên hiển thị!', }]}>
                    <Input size="middle" /*onChange={(e) => setTagName(e.target.value)}*/ />
                </Form.Item>
                <Form.Item className='create-user-form-item' label="Mô tả" name='createUserAbout' >
                    <Input.TextArea size="middle" /*onChange={(e) => setTagName(e.target.value)}*/ />
                </Form.Item>
                <Form.Item className='create-user-form-item' label="Ảnh đại diện" name='createUserAvatar' >
                    <Input size="middle" onChange={(e) => setCurrentImage(e.target.value)} />
                </Form.Item>
                {currentImage ? renderImage(): 
                    <div style={{padding: 15 ,border: '1px solid #ececec', width: '40%', margin: '0 auto', borderRadius: '15px', marginBottom: 25}}>
                        <Empty description='Chưa có ảnh'/>
                    </div>
                }
                <Form.Item className='create-user-form-item' label="Tên thật" name='createUserFullname' >
                    <Input size="middle" /*onChange={(e) => setTagName(e.target.value)}*/ />
                </Form.Item>
                <Form.Item className='create-user-form-item' label="Ngày sinh" name='createUserBirthday' >
                    <DatePicker placeholder='Chọn ngày sinh' format={['DD/MM/YYYY', 'DD/MM/YY']} />
                </Form.Item>
                <Form.Item className='create-user-form-item' label="Điểm" name='createUserScore' >
                    <InputNumber defaultValue={0} min={0} max={100} size="middle" /*onChange={(e) => setTagName(e.target.value)}*/ />
                </Form.Item>
                <div className="ant-col ant-col-3 ant-form-item-label">
                    <label>Liên kết</label>
                </div>
                <Form.Item colon={false} className='edit-profile-form-item' label={<FacebookFilled style={{ color: '#4267B2', fontSize: 'x-large' }} />} name='createUserLinkFB'>
                    <Input size="middle" />
                </Form.Item>
                <Form.Item colon={false} className='edit-profile-form-item' label={<LinkedinFilled style={{ color: '#0077B5', fontSize: 'x-large' }} />} name='createUserLinkLK'>
                    <Input size="middle" />
                </Form.Item>
                <Form.Item colon={false} className='edit-profile-form-item' label={< TwitterSquareFilled style={{ color: '#1DA1F2', fontSize: 'x-large' }} />} name='createUserLinkTW'>
                    <Input size="middle" />
                </Form.Item>
            </Form>
        </Modal>
    )
}
