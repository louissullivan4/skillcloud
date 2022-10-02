import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";

function LoginForm() {
        const navigate = useNavigate();
        const [username, setusername] = useState("");
        const [password, setpassword] = useState("");
        const [authenticated, setauthenticated] = useState(localStorage.getItem("authenticated")|| false);
        const users = [{ username: "admin@admin.com", password: "admin" }];
        const submitHandler = (e) => {
          e.preventDefault()
          console.log(username)
            console.log(password)
          const account = users.find((user) => user.username === username);
          if (account && account.password === password) {
              setauthenticated(true)
              localStorage.setItem("authenticated", true);
              navigate("/");
          }
    };
    return (
        <form onSubmit={submitHandler}>
            <div className='form-inner'>
                <h2>Login</h2>
                <div className='form-group'>
                    <label htmlFor='email'>Email:</label>
                    <input type="email" name="email" id="email" onChange={(e) => setusername(e.target.value)}/>
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password:</label>
                    <input type="password" name="password" id="password" onChange={(e) => setpassword(e.target.value)}/>
                </div>
                <input type="submit" value="Login" />
            </div>
        </form>
    );
}

export default LoginForm;
