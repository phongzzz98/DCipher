import { Modal, Form, Input, Radio, DatePicker, InputNumber, notification, Button, Empty, Image } from 'antd'
import { FacebookFilled, LinkedinFilled, TwitterSquareFilled } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { useForm } from 'antd/lib/form/Form'
import { ApplicationDispatch } from '../../../../store/store'
import { useDispatch, useSelector } from 'react-redux'
import { editUserAdminAction, getAllUsersAdminAction, getOneUserAdminAction } from '../../../../redux/actions/UserAction'
import moment from 'moment'
import { oneUserAdminSelector } from '../../../../redux/reducers/UserReducer'
import { IEditUser } from '../../../../redux/interface/UserType'
import { EditPasswordModal } from '../EditPasswordModal/EditPasswordModal'

interface EditUserModalProps {
    editModalVisible: boolean;
    setEditModalVisible: Function;
    userID: number;
}

const initialField = [
    { name: 'editUserEmail', value: '' },
    { name: 'editUserRole', value: 1 },
    { name: 'editUserDisplayname', value: '' },
    { name: 'editUserAbout', value: '' },
    { name: 'editUserAvatar', value: '' },
    { name: 'editUserFullname', value: '' },
    { name: 'editUserBirthday', value: moment('1/1/2000', 'DD/MM/YYYY') },
    { name: 'editUserScore', value: 0 },
    { name: 'editUserLinkFB', value: '' },
    { name: 'editUserLinkLK', value: '' },
    { name: 'editUserLinkTW', value: '' },
]

export const EditUserModal = ({ editModalVisible, setEditModalVisible, userID }: EditUserModalProps) => {
    const dispatch: ApplicationDispatch = useDispatch()
    const [currentImage, setCurrentImage] = useState('')
    const [roleSelect, setRoleSelect] = useState(1)
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [editPasswordModalVisible, setEditPasswordModalVisible] = useState(false)
    const [form] = useForm();
    const selectedUser = useSelector(oneUserAdminSelector)
    const [currentField, setCurrentField] = useState<{ name: string, value: any }[]>(initialField)

    const handleCancel = () => {
        setEditModalVisible(false);
    };

    useEffect(() => {
        dispatch(getOneUserAdminAction(userID))
    }, [dispatch, userID])

    useEffect(() => {
        if (selectedUser) {
            setCurrentField([
                { name: 'editUserEmail', value: selectedUser.email },
                { name: 'editUserRole', value: selectedUser.role },
                { name: 'editUserDisplayname', value: selectedUser.username },
                { name: 'editUserAbout', value: selectedUser.about },
                { name: 'editUserAvatar', value: selectedUser.avatarImage },
                { name: 'editUserFullname', value: selectedUser.fullName },
                { name: 'editUserBirthday', value: selectedUser.birth ? moment(selectedUser.birth, 'DD/MM/YYYY') : moment('1/1/1900', 'DD/MM/YYYY') },
                { name: 'editUserScore', value: selectedUser.score },
                { name: 'editUserLinkFB', value: selectedUser.facebook_account },
                { name: 'editUserLinkLK', value: selectedUser.linkedin_account },
                { name: 'editUserLinkTW', value: selectedUser.twitter_account },
            ])
            setCurrentImage(selectedUser.avatarImage)
            setRoleSelect(selectedUser.role)
        }
        else
            setCurrentField(initialField)
    }, [selectedUser])

    const handleOk = () => {
        form.validateFields().then(values => {
            if (values.editUserEmail === "" || values.editUserDisplayname === "") {
                notification.error({
                    placement: 'bottomRight',
                    message: "Vui l??ng nh???p c??c tr?????ng c??n thi???u!"
                })
            }
            else {
                setConfirmLoading(true);
                setTimeout(async () => {
                    const newUser: IEditUser = {
                        userid: userID,
                        about: values.editUserAbout || '',
                        avatarImage: values.editUserAvatar || '',
                        birth: values.editUserBirthday ? values.editUserBirthday.format('DD-MM-YYYY') : moment('1/1/1900').format('DD-MM-YYYY'),
                        fullName: values.editUserFullname || '',
                        role: roleSelect,
                        score: values.editUserScore || 0,
                        username: values.editUserDisplayname,
                        notification: 0,
                        verify_email: 0,
                        facebook_account: values.editUserLinkFB || '',
                        linkedin_account: values.editUserLinkLK || '',
                        twitter_account: values.editUserLinkTW || '',
                    }
                    await dispatch(editUserAdminAction(newUser))
                    await dispatch(getOneUserAdminAction(userID))
                    await dispatch(getAllUsersAdminAction())
                    setConfirmLoading(false);
                    setEditModalVisible(false)
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
            title="S???a ng?????i d??ng"
            visible={editModalVisible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            okText='S???a'
            cancelText='H???y'
            width={'80%'}
            style={{ fontFamily: 'SofiaProSemiBold' }}
        >
            <Form form={form} fields={currentField} labelCol={{ span: 3 }} wrapperCol={{ span: 20 }} >
                <Form.Item className='create-user-form-item' label="Email" name='editUserEmail'>
                    <Input size="middle" disabled={true} />
                </Form.Item>
                <Form.Item className='create-user-form-item' label='M???t kh???u' name='editUserPassword'>
                    <Button size='middle' type='link' onClick={() => setEditPasswordModalVisible(true)} ><span style={{ textDecorationLine: 'underline' }}>?????i m???t kh???u</span></Button>
                </Form.Item>
                <Form.Item className='create-user-form-item' label="Ph??n quy???n" name='editUserRole'>
                    <Radio.Group name="radiogroup" value={roleSelect} onChange={(e) => setRoleSelect(e.target.value)}>
                        <Radio value={0}>Admin</Radio>
                        <Radio value={1}>Th??nh vi??n</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item className='create-user-form-item' label="T??n hi???n th???" name='editUserDisplayname' rules={[
                    { required: true, message: 'H??y nh???p t??n hi???n th???!', },
                    { max: 16, message: 'H??y nh???p t??? 2 ?????n 16 k?? t???' },
                    { min: 2, message: 'H??y nh???p t??? 2 ?????n 16 k?? t???' },
                ]}>
                    <Input size="middle" />
                </Form.Item>
                <Form.Item className='create-user-form-item' label="M?? t???" name='editUserAbout' >
                    <Input.TextArea size="middle" />
                </Form.Item>
                <Form.Item className='create-user-form-item' label="???nh ?????i di???n" name='editUserAvatar' >
                    <Input size="middle" onChange={(e) => setCurrentImage(e.target.value)} />
                </Form.Item>
                {currentImage ? renderImage() :
                    <div style={{ padding: 15, border: '1px solid #ececec', width: '40%', margin: '0 auto', borderRadius: '15px', marginBottom: 25 }}>
                        <Empty description='Ch??a c?? ???nh' />
                    </div>
                }
                <Form.Item className='create-user-form-item' label="T??n th???t" name='editUserFullname' >
                    <Input size="middle" />
                </Form.Item>
                <Form.Item className='create-user-form-item' label="Ng??y sinh" name='editUserBirthday' >
                    <DatePicker placeholder='Ch???n ng??y sinh' format={['DD/MM/YYYY', 'DD/MM/YY']} />
                </Form.Item>
                <Form.Item className='create-user-form-item' label="??i???m" name='editUserScore' >
                    <InputNumber defaultValue={0} min={0} size="middle" />
                </Form.Item>
                <div className="ant-col ant-col-3 ant-form-item-label">
                    <label>Li??n k???t</label>
                </div>
                <Form.Item colon={false} className='edit-profile-form-item' label={<FacebookFilled style={{ color: '#4267B2', fontSize: 'x-large' }} />} name='editUserLinkFB'>
                    <Input size="middle" />
                </Form.Item>
                <Form.Item colon={false} className='edit-profile-form-item' label={<LinkedinFilled style={{ color: '#0077B5', fontSize: 'x-large' }} />} name='editUserLinkLK'>
                    <Input size="middle" />
                </Form.Item>
                <Form.Item colon={false} className='edit-profile-form-item' label={< TwitterSquareFilled style={{ color: '#1DA1F2', fontSize: 'x-large' }} />} name='editUserLinkTW'>
                    <Input size="middle" />
                </Form.Item>
            </Form>
            <EditPasswordModal userID={userID} editPasswordModalVisible={editPasswordModalVisible} setEditPasswordModalVisible={setEditPasswordModalVisible} />
        </Modal>
    )
}
