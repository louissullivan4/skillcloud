import { Navigate, Outlet  } from 'react-router-dom'
import { useEffect, useState } from "react";

const ProtectedRoutes = () => {
    const authenticated = localStorage.getItem("authenticated") || false;
    const [auth, setauth] = useState(authenticated);
    useEffect(() => {
        setauth(authenticated);
    }, [authenticated]);
    console.log(auth);
    if (!auth) {
        console.log("not authenticated");
        return <Navigate replace to="/loginform" />;
    }  else {
        return <Outlet />;
    }
}
export default ProtectedRoutes