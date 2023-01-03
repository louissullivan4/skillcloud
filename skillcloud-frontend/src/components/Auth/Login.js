import React, {useState} from 'react'
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from '../../context/AuthContext';

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
            console.log(error)
        }
    }

    return (
        <div>
            <div>
                <h1>Login</h1>
                <p>
                    Don't have an account yet?{' '}
                    <Link to='/createaccount'>Create Acount</Link>
                </p>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input onChange={(e) => setEmail(e.target.value)} type="email"/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} type="password"/>
                </div>
                <button>Login</button>
            </form>
        </div>
      )
    }

export default Login