import { createContext, useReducer, useEffect } from "react";

export const AdminContext = createContext();

export const adminReducer = (state,action)=>{
    switch(action.type){
        case "LOGIN":
            //should have userName and token coming from backend
            return action.payload 
        case "LOGOUT":
            return {admin: null}
        default:
            return state
    }
}

export const AdminContextProvider = ({ children })=>{
    const [state,dispatch] = useReducer(adminReducer,{admin:null});

    useEffect(()=>{
        const admin = JSON.parse(localStorage.getItem('admin'));

        if(admin){
            dispatch({type:"LOGIN", payload:admin})
        }    
    },[])
   
    return (
        <AdminContext.Provider value={{...state,dispatch}}>
            { children }
        </AdminContext.Provider>
    )
}

