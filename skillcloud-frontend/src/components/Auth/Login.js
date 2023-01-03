import React from 'react'
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div>
            <div>
                <h1>Login</h1>
                <p>
                    Don't have an account yet?{' '}
                    <Link to='/createaccount'>Create Acount</Link>
                </p>
            </div>
            <form>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email"/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password"/>
                </div>
                <button>Login</button>
            </form>
        </div>
      )
    }

export default Login