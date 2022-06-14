import { Form, Input, Button } from 'antd'
import { useSelector } from 'react-redux'
import { userDetailSelector } from '../../redux/reducers/UserReducer'
import './EditProfileStyle.css'

export const EditProfile = () => {
  const userDetails = useSelector(userDetailSelector)
  console.log(userDetails);
  return (
    <div className='edit-profile-page'>
      <h1>Sửa thông tin cá nhân</h1>
      <Form fields={[{name: 'editDisplayname', value:userDetails.displayname}]} labelCol={{ span: 3 }} wrapperCol={{ span: 25 }} initialValues={{ remember: true }} >
          <Form.Item className='edit-profile-form-item' label="Tên hiển thị" name='editDisplayname' rules={[{ required: true, message: 'Hãy nhập tên hiển thị!', }]}>
            <Input size="large" />
          </Form.Item>
          
          <Form.Item className='create-post-form-item' id='createPostButton' valuePropName="checked" wrapperCol={{ offset: 9, span: 20 }}>
            <Button style={{ width: '50%' }} shape='round' size='large' type="primary" htmlType="submit" onClick={()=>{}}>Tạo bài viết</Button>
          </Form.Item>
        </Form>
    </div>
  )
}
