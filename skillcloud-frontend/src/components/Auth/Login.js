import React, {useState} from 'react'
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from '../../context/AuthContext';

{/* The following code is an adaptation of the code created by
Briley,C (2022) firebase-auth-context[Source Code]. https://github.com/fireclint/firebase-auth-context */}

const Login = () => {
    const { login } = UserAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        try {
            await login(email, password)
            navigate('/home')
        } catch (e) {
            setError(e.message)
        }
    }

    return (
        <div className='login-page'>
            <div className='login-content'>
                <h1>Login</h1>
                <p>
                    Don't have an account yet?{' '}
                    <Link to='/createaccount'>Create Account</Link>
                </p>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input onChange={(e) => setEmail(e.target.value)} type="email"/>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input onChange={(e) => setPassword(e.target.value)} type="password"/>
                    </div>
                    <button>Submit</button>
                    <br></br>
                    <div className='errmsg'>{error}</div>
                </form>
            </div>
        </div>
      )
    }

export default Login