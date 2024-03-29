import {createContext, useContext, useEffect, useState} from 'react'
import { createUserWithEmailAndPassword, 
        signInWithEmailAndPassword,
        signOut,
        onAuthStateChanged,
        deleteUser,
        updateProfile,
} from "firebase/auth";
import { auth } from '../firebase';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

{/* The following code is an adaptation of the code created by
Briley,C (2022) firebase-auth-context[Source Code]. https://github.com/fireclint/firebase-auth-context */}

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({})

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    
    const deleteAUser = (uid) => {
        return deleteUser(uid)
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

    const updateProfilePic = async (file, uuid) => {
        const storage = getStorage();
        const storageRef = ref(storage, `profile/${uuid}`);
        uploadBytes(storageRef, file).then( () => {
            console.log('Uploaded a blob or file!');
            const url = getDownloadURL(storageRef);
            updateProfile(user, {
                photoURL: url,
            }).then(() => {
                console.log("Profile Updated")
            }
            ).catch((error) => {
                console.log(error)
            }
            )
        })
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
        <UserContext.Provider value={{ createUser, user, login, logout, deleteAUser, updateProfilePic }}>
            {children}
        </UserContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(UserContext);
}