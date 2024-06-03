import {  GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/firebase.config";


export const AuthContext =  createContext(null);
const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const createUser = (email,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);
    }
    //login with email and password
    const logIn = (email,password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password)
    }

    //logIn with google
      const google = () => {
        setLoading(true);
        return signInWithPopup(auth,googleProvider);
     }
    // logOut 
    const logOut = () =>{
        setLoading(true);
        return signOut(auth);
    }
    // update user
    const updateUser = (name,photoURL) =>{
            return updateProfile(auth.currentUser, {
                displayName: name, photoURL: photoURL,
            });
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth , currentUser =>{
            setUser(currentUser)
            console.log('current user from' , currentUser)
            setLoading(false);
        });
        return () => unsubscribe();
    },[])
    const authInfo = {user,loading,createUser,logIn,google,logOut,updateUser}
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;