import React , { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from '../../context/AuthContext'

import "../../index.css";

const CreateAccount = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const { createUser } = UserAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        try {
            await createUser(email, password)
            navigate('/basicinfo',{state:{ email: email }}) 
        } catch (e) {
            setError(e.message)
        }
    }
        
    return (
        <div>
            <div>
                <h1>Create Account</h1>
                <p>
                    Already have an account yet?{' '}
                    <Link to='/'>Login</Link>
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
                <button>Create Account</button>
            </form>
        </div>
    )
    }

export default CreateAccount