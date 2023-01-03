import React from 'react'
import { Link } from "react-router-dom";

import "../../index.css";

const CreateAccount = () => {
  return (
    <div>
        <div>
            <h1>Create Account</h1>
            <p>
                Already have an account yet?{' '}
                <Link to='/'>Login</Link>
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
            <button>Create Account</button>
        </form>
    </div>
  )
}

export default CreateAccount