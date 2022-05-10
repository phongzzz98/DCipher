import { Button, Checkbox, Form, Input } from 'antd'
import { FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginAction } from '../../../redux/actions/AuthAction'
import { ApplicationDispatch } from '../../../store/store'
import { toggleLoading } from '../../../redux/reducers/LoadingReducer'

export const LoginForm = () => {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [remember, setRemember] = useState(true)
    const dispatch: ApplicationDispatch = useDispatch()
    
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setTimeout(async ()=>{await dispatch(toggleLoading())}, 3000)
        await dispatch(
            loginAction({
                email: userName,
                password: password,
            })
        )
        dispatch(toggleLoading())
    }
    
    return (
        <Form className='log-form' labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} initialValues={{ remember: true }} onSubmitCapture={handleSubmit} >
            <Form.Item className='login-form-item' label="Username" name='loginUsername' rules={[{ required: true, message: 'Please input your username!', }]}>
                <Input size="large" onChange={e => setUserName(e.target.value)} />
            </Form.Item>
            <Form.Item className='login-form-item' label="Password" name='loginPassword' rules={[{ required: true, message: 'Please input your password!' }]}>
                <Input.Password size="large" onChange={e => setPassword(e.target.value)} />
            </Form.Item>
            <Form.Item className='login-form-item' id='loginButtons' valuePropName="checked" wrapperCol={{ offset: 6, span: 16 }}>
                <Checkbox onChange={e => setRemember(e.target.checked)} checked={remember}>Nhớ mật khẩu</Checkbox>
                <Button shape='round' size='large' type="primary" htmlType="submit">Đăng nhập</Button>
            </Form.Item>
        </Form>
    )
}
