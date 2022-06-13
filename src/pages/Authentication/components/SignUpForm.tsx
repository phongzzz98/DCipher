import { Button, Form, Input } from 'antd'
import React, { FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { signUpAction } from '../../../redux/actions/AuthAction'
import { ApplicationDispatch } from '../../../store/store'

export const SignUpForm = () => {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    // const [remember, setRemember] = useState(true)
    const dispatch: ApplicationDispatch = useDispatch()
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(signUpAction({
            email: email,
            username: userName,
            password: password,
            role: 1,
        }))
    }
    return (
        <Form className='log-form' labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} initialValues={{ remember: true }} onSubmitCapture={handleSubmit} >
            <Form.Item className='login-form-item' label="Email" name='signUpEmail' rules={[{ required: true, message: 'Please input your email!' }]}>
                <Input size="large" onChange={e => setEmail(e.target.value)}/>
            </Form.Item>
            <Form.Item className='login-form-item' label="Tên hiển thị" name='signUpUsername' rules={[{ required: true, message: 'Please input your username!', }]}>
                <Input size="large" onChange={e => setUserName(e.target.value)} />
            </Form.Item>
            <Form.Item className='login-form-item' label="Mật khẩu" name='signUpPassword' rules={[{ required: true, message: 'Please input your password!' }]}>
                <Input.Password size="large" onChange={e => setPassword(e.target.value)} />
            </Form.Item>
            {/* <Form.Item className='login-form-item' label="Birthday" rules={[{ required: true, message: 'Please input your email!' }]}>
                <DatePicker size="large" placeholder='Chọn ngày' className='date-picker'/>
            </Form.Item> */}
            <Form.Item className='login-form-item' id='loginButtons' valuePropName="checked" wrapperCol={{ offset: 6, span: 16 }}>
                <Button shape='round' size='large' type="primary" htmlType="submit">Đăng kí</Button>
            </Form.Item>
        </Form>
    )
}
