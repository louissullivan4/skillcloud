import { useNavigate } from "react-router-dom";

import LoginForm from "./components/LoginForm";
// import Sidebar from "./components/Sidebar";
import './index.css';

import { useState } from "react";

function App() {
  const adminUser = {
    email: "admin@admin.com",
    password: "admin"
  }

  const [setUser] = useState({email: "", password:""});
  const [error, setError] = useState("");
  let navigate = useNavigate();

  const Login = details => {
    if (details.email === adminUser.email && details.password === adminUser.password){
      setUser({
        email: details.email,
        password: details.password
      })
      navigate('/home')
    } else {
      setError("Error")
    }
  }
  
  return(
    <div className="App">
      <LoginForm Login={Login} error={error}/>
    </div>
  );
}

export default App;


// import {BrowserRouter, Routes, Route,} from "react-router-dom";

// import LoginForm from "./components/LoginForm";
// import Sidebar from "./components/Sidebar";
// import './index.css';

// import { useState } from "react";

// function App() {
//   const adminUser = {
//     email: "admin@admin.com",
//     password: "admin"
//   }

//   const [user, setUser] = useState({name: "", email:""});
//   const [error, setError] = useState("");

//   const Login = details => {
//     if (details.email === adminUser.email && details.password === adminUser.password){
//       setUser({
//         name: details.name,
//         email: details.email
//       })
//     } else {
//       setError("Error")
//     }
//   }

//   const Logout = () => {
//     setUser({name: "", email:""});
//   }

//   return(
//     <div className="App">
//       {(user.email !== "") ? (
//         <div className="welcome">
//             <Sidebar />
//             {/* <button onClick={Logout}>Logout</button> */}
//         </div>
//       ) : (
//         <LoginForm Login={Login} error={error}/>
//       )}
//     </div>
//   );
// }

// export default App;
