import {createContext, useContext, useEffect, useState} from 'react'
import { createUserWithEmailAndPassword, 
        signInWithEmailAndPassword,
        signOut,
        onAuthStateChanged,
} from "firebase/auth";
import { auth } from '../firebase';

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({})

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const login = (email, password) => {
        if (localStorage.getItem("email") !== null){
            localStorage.clear();
        }
        localStorage.setItem("email", email)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
        localStorage.clear();
        return signOut(auth)
    }

    useEffect( () => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            if (currentUser){
                localStorage.setItem("email", currentUser.email)
            }
        })
        return () => {
            unsubscribe();
        }
    }, [])



    return (
        <UserContext.Provider value={{ createUser, user, login, logout }}>
            {children}
        </UserContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(UserContext);
}