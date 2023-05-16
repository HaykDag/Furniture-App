import { useContext } from "react";
import { ItemsContext } from "../context/ItemsContext";

export const useItems = ()=>{
    const context = useContext(ItemsContext);

    return context;
}