import React , { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from '../../context/AuthContext'
import { auth } from '../../firebase'

import "../../index.css";

{/* The following code is an adaptation of the code created by
Briley,C (2022) firebase-auth-context[Source Code]. https://github.com/fireclint/firebase-auth-context */}

const CreateAccount = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const { createUser, deleteAUser } = UserAuth()


    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        try {
            await createUser(email, password)
            await deleteAUser(auth.currentUser)
            navigate('/basicinfo',{state:{ email: email, password: password}}) 
        } catch (e) {
            setError(e.message)
        }
    }   
        
    return (
        <div className='login-page'>
            <div className='login-content'>
                <h1>Create Account</h1>
                <p>
                    Already have an account?{' '}
                    <Link to='/'>Login</Link>
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
                    <button type="submit" >Submit</button>
                </form>
                <div className='errmsg'>{error}</div>
            </div>
        </div>
    )
    }

export default CreateAccount