import { Form, Input, Button, DatePicker, Image } from 'antd'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { FacebookFilled, LinkedinFilled, TwitterSquareFilled } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { userDetailSelector } from '../../redux/reducers/UserReducer'
import './EditProfileStyle.css'
import { useForm } from 'antd/lib/form/Form'
import { ApplicationDispatch } from '../../store/store'
import { IUserDetailsToSave } from '../../redux/interface/UserType'
import { userInfoSelector } from '../../redux/reducers/AuthReducer'
import { editUserDetailAction, getUserDetailsAction } from '../../redux/actions/UserAction'

const initialField = [
  { name: 'editDisplayname', value: '' },
  { name: 'editFullname', value: '' },
  { name: 'editAvatar', value: '' },
  { name: 'editLinkFB', value: '' },
  { name: 'editLinkLK', value: '' },
  { name: 'editLinkTW', value: '' },
]

export const EditProfile = () => {
  const dispatch: ApplicationDispatch = useDispatch()
  const user = useSelector(userInfoSelector)
  const userDetails = useSelector(userDetailSelector)
  console.log(userDetails);
  const [form] = useForm();
  const [currentImage, setCurrentImage] = useState('')
  const [currentField, setCurrentField] = useState<{ name: string, value: any }[]>(initialField)

  useEffect(() => {
    dispatch(getUserDetailsAction(user.id))
  }, [dispatch, user.id])
  

  useEffect(() => {
    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
    setCurrentField([
      { name: 'editAbout', value: userDetails.about },
      { name: 'editDisplayname', value: userDetails.displayname },
      { name: 'editFullname', value: userDetails.fullName },
      { name: 'editAvatar', value: userDetails.avatarImage },
      { name: 'editBirthday', value: userDetails.birth !== null ? moment(userDetails.birth, dateFormatList[0]) : moment('1/1/2000', dateFormatList[0])},
      { name: 'editLinkFB', value: userDetails.linkSNS[0].facebook_account },
      { name: 'editLinkLK', value: userDetails.linkSNS[0].linkedin_account },
      { name: 'editLinkTW', value: userDetails.linkSNS[0].twitter_account },
    ])
    setCurrentImage(userDetails.avatarImage)
  }, [user.id, userDetails])
  console.log(currentField);

  const renderImage = () => {
    return (
      <div style={{ justifyContent: 'center' }} className="ant-row ant-form-item edit-profile-form-item">
        <Image width={300} src={currentImage} />
      </div>
    )
  }

  const onSave = () => {
    form.validateFields().then(values => {
      const newDetail: IUserDetailsToSave = {
        avatarImage: values.editAvatar,
        userid: user.id,
        displayname: values.editDisplayname,
        about: values.editAbout,
        fullname: values.editFullname,
        birth: values.editBirthday.format('DD-MM-YYYY'),
        linkSNS: [values.editLinkFB, values.editLinkTW, values.editLinkLK]
      }
      console.log(newDetail);
      dispatch(editUserDetailAction(newDetail))
    })
  }

  return (
    <div className='edit-profile-page'>
      <h1>Sửa thông tin cá nhân</h1>
      <Form form={form} fields={currentField} labelCol={{ span: 3 }} wrapperCol={{ span: 20 }} initialValues={{ remember: true }} >
        <Form.Item className='edit-profile-form-item' label="Giới thiệu" name='editAbout'>
          <Input.TextArea size="middle" />
        </Form.Item>
        <Form.Item
          className='edit-profile-form-item'
          label="Tên hiển thị"
          name='editDisplayname'
          rules={[
            { required: true, message: 'Hãy nhập tên hiển thị!', },
            { max: 16, message: 'Hãy nhập từ 2 đến 16 ký tự' },
            { min: 2, message: 'Hãy nhập từ 2 đến 16 ký tự' },
          ]}
        >
          <Input size="middle" />
        </Form.Item>
        <Form.Item className='edit-profile-form-item' label="Tên thật" name='editFullname'>
          <Input size="middle" />
        </Form.Item>
        <Form.Item className='edit-profile-form-item' label="Ảnh đại diện" name='editAvatar'>
          <Input size="middle" onChange={(e)=> setCurrentImage(e.target.value)}/>
        </Form.Item>
        {renderImage()}
        <Form.Item className='edit-profile-form-item' label="Ngày sinh" name='editBirthday'>
          <DatePicker format={['DD/MM/YYYY', 'DD/MM/YY']} />
        </Form.Item>
        <div className="ant-col ant-col-3 ant-form-item-label">
          <label>Liên kết</label>
        </div>
        <Form.Item colon={false} className='edit-profile-form-item' label={<FacebookFilled style={{ color: '#4267B2', fontSize: 'x-large' }} />} name='editLinkFB'>
          <Input size="middle" />
        </Form.Item>
        <Form.Item colon={false} className='edit-profile-form-item' label={<LinkedinFilled style={{ color: '#0077B5', fontSize: 'x-large' }} />} name='editLinkLK'>
          <Input size="middle" />
        </Form.Item>
        <Form.Item colon={false} className='edit-profile-form-item' label={< TwitterSquareFilled style={{ color: '#1DA1F2', fontSize: 'x-large' }} />} name='editLinkTW'>
          <Input size="middle" />
        </Form.Item>
        <Form.Item className='edit-profile-form-item' id='editProfileButton' valuePropName="checked" wrapperCol={{ offset: 9, span: 20 }}>
          <Button style={{ width: '50%' }} shape='round' size='large' type="primary" htmlType="submit" onClick={onSave}>Sửa thông tin</Button>
        </Form.Item>
      </Form>
    </div>
  )
}
