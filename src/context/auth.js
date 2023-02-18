import { onAuthStateChanged } from "firebase/auth";
import { createContext ,useState,useEffect } from "react";
import Loading from "../components/Loading";
import { auth } from "../firebase/firebase";

export const AuthContext=createContext()

const AuthProvider =({children})=>{
    const[user,setUser]=useState(null);
    const[loading,setloading]=useState(true)
useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
        setUser(user);
        setloading(false)
    })
},[]);
if(loading){
    return <Loading/>;
}


return <AuthContext.Provider value={{user}}>{children}</AuthContext.Provider>

}
export default AuthProvider;