
import { useState } from "react";
import { useAuth } from "./useAuth";

export const useLogin = ()=>{
    const [error,setError] = useState(null);
    const [isLoading,setIsLoading] = useState(null);

    const { dispatch } = useAuth();

    const login = async (userName,password)=>{
        setIsLoading(true);
        setError(null);

        const response = await fetch('/admin/login',{
            method:"POST",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({userName,password})
        })
        const json = await response.json()
        
        if(!response.ok){
            setIsLoading(false);
            setError(json.error)
        }
        if(response.ok){
            //save admin to the localStorage
            localStorage.setItem('admin',JSON.stringify(json));

            //update AdminContext
            dispatch({type:"LOGIN",payload:json})

            setIsLoading(false);
        }
    }
    return {login, error, isLoading}   
}