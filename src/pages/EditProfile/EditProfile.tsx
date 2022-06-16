import { Form, Input, Button, DatePicker, Image } from 'antd'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { FacebookFilled, LinkedinFilled, TwitterSquareFilled } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { userDetailSelector } from '../../redux/reducers/UserReducer'
import './EditProfileStyle.css'

export const EditProfile = () => {
  const userDetails = useSelector(userDetailSelector)
  console.log(userDetails);
  const [currentField, setCurrentField] = useState<{ name: string, value: any }[]>([])
  const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
  useEffect(() => {
    setCurrentField([
      { name: 'editDisplayname', value: userDetails.displayname },
      { name: 'editAvatar', value: userDetails.avatarImage},
      { name: 'editLinkFB', value: userDetails.linkSNS[0].facebook_account },
      { name: 'editLinkLK', value: userDetails.linkSNS[0].linkedin_account },
      { name: 'editLinkTW', value: userDetails.linkSNS[0].twitter_account},
    ])
  }, [userDetails])


  return (
    <div className='edit-profile-page'>
      <h1>Sửa thông tin cá nhân</h1>
      <Form fields={currentField} labelCol={{ span: 3 }} wrapperCol={{ span: 20 }} initialValues={{ remember: true }} >
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
          <Input size="middle" />
          <Image width={300} src={userDetails.avatarImage} />
        </Form.Item>
        <Form.Item className='edit-profile-form-item' label="Ngày sinh" name='editBirthday'>
          <DatePicker defaultValue={moment(userDetails.birth, dateFormatList[0])} format={dateFormatList} />
        </Form.Item>
        
          <Form.Item className='edit-profile-form-item' label={<FacebookFilled style={{ color: '#4267B2', fontSize: 'x-large' }}/>} name='editLinkFB'>
            <Input size="middle" />
          </Form.Item>
          <Form.Item className='edit-profile-form-item' label={<LinkedinFilled style={{ color: '#0077B5', fontSize: 'x-large' }}/>} name='editLinkLK'>
            <Input size="middle" />
          </Form.Item>
          <Form.Item className='edit-profile-form-item' label={< TwitterSquareFilled style={{ color: '#1DA1F2', fontSize: 'x-large' }}/>} name='editLinkTW'>
            <Input size="middle" />
          </Form.Item>
        
        <Form.Item className='edit-profile-form-item' id='editProfileButton' valuePropName="checked" wrapperCol={{ offset: 9, span: 20 }}>
          <Button style={{ width: '50%' }} shape='round' size='large' type="primary" htmlType="submit" onClick={() => { }}>Sửa thông tin</Button>
        </Form.Item>
      </Form>
    </div>
  )
}
