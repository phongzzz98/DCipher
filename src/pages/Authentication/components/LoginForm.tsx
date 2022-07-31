import { Button, Form, Input, notification } from 'antd'
import { FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginAction } from '../../../redux/actions/AuthAction'
import { ApplicationDispatch } from '../../../store/store'
import { useNavigate } from 'react-router-dom'
import { accessTokenSelector } from '../../../redux/reducers/AuthReducer'
import { useForm } from 'antd/lib/form/Form'
import { validateEmail } from '../../../utils/util'

export const LoginForm = () => {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [form] = useForm();
    const dispatch: ApplicationDispatch = useDispatch()
    const accessToken = useSelector(accessTokenSelector)
    const navigate = useNavigate()
    
    const handleSubmit = async (e: FormEvent) => {
        form.validateFields().then(async values => {
            if (!validateEmail(values.loginEmail)) {
                notification.error({
                    placement: 'topRight',
                    message: "Email không hợp lệ!"
                })
            }
            else {
                e.preventDefault();
                await dispatch(loginAction({ email: userName, password: password, }))
            }
        })
    }

    useEffect(() => {
        if (accessToken) {
            navigate('/')
        }
        else
            return
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken, handleSubmit])


    return (
        <Form form={form} className='log-form' labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} initialValues={{ remember: true }} onSubmitCapture={handleSubmit} >
            <Form.Item className='login-form-item' label="Email" name='loginEmail' rules={[{ required: true, message: 'Hãy nhập email!', }]}>
                <Input size="large" onChange={e => setUserName(e.target.value)} />
            </Form.Item>
            <Form.Item className='login-form-item' label="Mật khẩu" name='loginPassword' rules={[{ required: true, message: 'Hãy nhập mật khẩu!' }]}>
                <Input.Password size="large" onChange={e => setPassword(e.target.value)} />
            </Form.Item>
            <Form.Item className='login-form-item' id='loginButtons' valuePropName="checked" wrapperCol={{ offset: 6, span: 16 }}>
                <Button shape='round' size='large' type="primary" htmlType="submit">Đăng nhập</Button>
            </Form.Item>
        </Form>
    )
}
