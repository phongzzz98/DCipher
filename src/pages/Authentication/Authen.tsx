import React, { useState } from 'react'
import './AuthenStyle.css'
import { LoginForm } from './components/LoginForm'
import { SignUpForm } from './components/SignUpForm'
import codeGear from '../../assets/svg/code-gear.svg'

export const Authen = () => {
    const [isLogin, setIsLogin] = useState(true)
    
    return (
        <div className="login-page">
            <div className='login-thumbnail'>
                <img className='thumbnail-image' src={codeGear} alt="Gear" />
            </div>
            <div className="login-container">
                <h1>
                    <span className={isLogin? 'login-text' : 'login-text deactive-text'} onClick={() => setIsLogin(true)}>Đăng nhập</span> / <span className={!isLogin? 'signup-text' : 'signup-text deactive-text'} onClick={() => setIsLogin(false)}>Đăng kí</span>
                </h1>
                {isLogin ? <LoginForm /> : <SignUpForm />}
            </div>
        </div>
    )
}
