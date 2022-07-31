import { Button, Form, Input, notification } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import React, { FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { signUpAction } from '../../../redux/actions/AuthAction'
import { ApplicationDispatch } from '../../../store/store'
import { validateEmail } from '../../../utils/util'

interface SignUpFormProps {
    setIsLogin: Function;
}

export const SignUpForm = ({setIsLogin}: SignUpFormProps) => {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [form] = useForm();
    const dispatch: ApplicationDispatch = useDispatch()
    const handleSubmit = async (e: FormEvent) => {
        form.validateFields().then(async values => {
            if (!validateEmail(values.signUpEmail)) {
                notification.error({
                    placement: 'topRight',
                    message: "Email không hợp lệ!"
                })
            }
            else {
                e.preventDefault();
                await dispatch(signUpAction({
                    email: email,
                    username: userName,
                    password: password,
                    role: 1,
                }))
                setIsLogin(true)
            }
        })
    }
    return (
        <Form form={form} className='log-form' labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} initialValues={{ remember: true }} onSubmitCapture={handleSubmit} >
            <Form.Item className='login-form-item' label="Email" name='signUpEmail' rules={[{ required: true, message: 'Hãy điền email!' }]}>
                <Input size="large" onChange={e => setEmail(e.target.value)} />
            </Form.Item>
            <Form.Item className='login-form-item' label="Tên hiển thị" name='signUpUsername' rules={[{ required: true, message: 'Hãy điền tên hiển thị!' }, { max: 16, message: 'Hãy nhập tên từ 2 đến 16 ký tự' }, { min: 2, message: 'Hãy nhập tên từ 2 đến 16 ký tự' }]}>
                <Input size="large" onChange={e => setUserName(e.target.value)} />
            </Form.Item>
            <Form.Item className='login-form-item' label="Mật khẩu" name='signUpPassword' rules={[{ required: true, message: 'Hãy nhập mật khẩu!' }, { min: 6, message: 'Hãy nhập ít nhất 6 ký tự' }]}>
                <Input.Password size="large" onChange={e => setPassword(e.target.value)} />
            </Form.Item>
            <Form.Item className='login-form-item' id='loginButtons' valuePropName="checked" wrapperCol={{ offset: 6, span: 16 }}>
                <Button shape='round' size='large' type="primary" htmlType="submit">Đăng kí</Button>
            </Form.Item>
        </Form>
    )
}
