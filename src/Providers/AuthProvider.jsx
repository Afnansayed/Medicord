import {  GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile,updateEmail } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/firebase.config";
import PropTypes from 'prop-types'
import useAxiosPublic from "../Hooks/useAxiosPublic/useAxiosPublic";


export const AuthContext =  createContext(null);
const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const axiosPublic = useAxiosPublic();
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
    //updated Email
    const setEmail = (email) => {
         return updateEmail(auth.currentUser,email);
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth , currentUser =>{
            setUser(currentUser)
            console.log('current user from' , currentUser)
            if(currentUser){
                const userInfo = {email: currentUser?.email};
                axiosPublic.post('/jwt',userInfo)
                .then(res => {
                    if(res.data.token){
                        localStorage.setItem('access-token',res.data.token);
                    }
                })
            }else{
                localStorage.removeItem('access-token');
            }
            setLoading(false);
        });
        return () => unsubscribe();
    },[axiosPublic])
    const authInfo = {user,loading,createUser,logIn,google,logOut,updateUser,setEmail}
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};
AuthProvider.propTypes={
    children:PropTypes.node,
}
export default AuthProvider;