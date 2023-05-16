import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";

export const useAuth = ()=>{
    const context = useContext(AdminContext);

    return context
}