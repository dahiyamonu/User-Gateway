import React, { useState } from 'react'
import './Login.css'
import { FaUser , FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Login = () => {
    const [action, setAction] = useState(' ');
    const [username, setUsername]=useState('')
    const [password, setPassword] = useState('');
    const [name , setName] = useState('');
    const [email, setEmail] = useState('');
    const [registerPassword,setRegisterPassword]=useState('')
    const [confrimPassword, setConfirmPassword] = useState('');
    const [forgotPassword, setForgotPassword]=useState(false);
    const [forgotEmail, setForgotEmail] = useState('');
    const [remeberMe, setRemeberMe]= useState(false)
    const [agreeTerms, setAgreeTerms] = useState(false)

    const registerLink = () => {
        setAction(' active');
    };
    const loginLink = () => {
        setAction('');
    };

    const handleSubmit =(event)=>{
        event.preventDefault();
        const loginData={
            username,
            password,
        };
    console.log('Login Data :',loginData);
    fetch('api/login',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify(loginData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success',data);
        })
        .catch((error) => {
            console.error('Error :', error);
        })
    }

    const handleRegister = (event) => {
        event.preventDefault();
        
        if(registerPassword !== confrimPassword){
            alert('Password do not match')
            return;
        }
        const registerData = {
            name,
            email,
            registerPassword,
        }
        console.log('Registration data :', registerData);
        fetch('api/register',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify(registerData),
        })
        .then(response =>response.json())
        .then(data=>{
            console.log('Success :',data);
            
        })
        .catch((error)=>{
            console.error('Error :',error);
        })
    }

    const handleForgotPassword = (event) => {
        event.preventDefault();
        setForgotPassword(true);
    }
    const handleForgotPasswordSubmit = (event) => {
        event.preventDefault();
        const forgotData = {
            email: forgotEmail,
        }
        console.log('Forgot Password Data : ', forgotData);
        fetch('api/forgot-passwprd',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify(forgotData),   
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            setForgotPassword(false);
        })
        .catch((error)=>{
            console.error('Error :', error);
        })
    }

    const handleRememberMe =(event)=>{
        setRemeberMe(event.target.checked);
    }
    const handleAgreeTerms =(event)=>{
        setAgreeTerms(event.target.checked);
    }
  return (
    <div className={`wrapper${action}`}>
    
        {/* Login */}

        <div className={`form-box${action === '' ? '' : ' hide'}`}>
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div className='input-box'>
                    <input type='text' value={username} onChange={(e) =>setUsername(e.target.value)} placeholder='Username' required/>
                    <FaUser className='icon' />
                </div>
                <div className='input-box'>
                    <input type='password' value={password} onChange={(e)=> setPassword(e.target.value)} placeholder='Password' required/>
                    <FaLock className='icon' />
                </div>
                <div className='remember-forget'>
                    <label><input type="checkbox" checked={remeberMe} onChange={handleRememberMe}/>Remember me</label>
                    <a href='#' onClick={handleForgotPassword}>Forget password?</a>
                </div>
                <button type='submit'>Login</button>
                <div className='register-link'>
                    <p>Don't have account ? <a href='#' onClick={registerLink}>Register</a></p>
                </div>
            </form>
        </div>
        
        {/* Forgot Password */}

        {forgotEmail && (
            <div className='forgot-password-form'>
                <form onSubmit={handleForgotPasswordSubmit}>
                    <h1>Forgot Password</h1>
                    <div className='input-box'>
                        <input type='email' value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} placeholder='Email' required />
                        <MdEmail className='icon' />
                    </div>
                    <button type='submit'>Send Reset Link</button>
                </form>
            </div>
        )}

        {/* Register */}

        <div className={`form-box_register${action === ' active' ? '' : ' hide'}`}>
            <form onSubmit={handleRegister}>
                <h1>Registration</h1>
                <div className='input-box'>
                    <input type='text' value={name} onChange={(e)=>setName(e.target.value)} placeholder='Username' required/>
                    <FaUser className='icon' />
                </div>
                <div className='input-box'>
                    <input type='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Email' required/>
                    <MdEmail className='icon' />
                </div>
                <div className='input-box'>
                    <input type='password' value={registerPassword} onChange={(e)=>setRegisterPassword(e.target.value)} placeholder='Password' required/>
                    <FaLock className='icon' />
                </div>
                <div className='input-box'>
                    <input type='password' value={confrimPassword} onChange={(e)=>setConfirmPassword(e.target.value)} placeholder='Confirm Password' required/>
                    <FaLock className='icon' />
                </div>
                <div className='remember-forget'>
                    <label><input type="checkbox" checked={agreeTerms} onChange={handleAgreeTerms}/>I agree to the terms & conditions</label>
                </div>
                <button type='Register'>Register</button>
                <div className='register-link'>
                    <p>Already have an account ?  <a href='#'  onClick={loginLink}>Login</a></p>
                </div>
            </form>
        </div>

    </div>
  )
}

export default Login