import { createContext, useReducer, useEffect } from "react";

export const ItemsContext = createContext();

export const itemsReducer = (state,action)=>{
    switch(action.type){
        case "GET":
           return {items:action.payload}
        case "ADD":
           return {items:action.payload,...state}
        case "EDIT":
            return {items:state.items.map(item=>item._id===action.payload.id?{...item,...action.payload.body}:item)};
        case "DELETE":
            return {items:state.items.filter(item=>item._id!==action.payload.id)};
            
        default:
            return state
    }
}

export const ItemsContextProvider = ({ children })=>{
    const [state,dispatch] = useReducer(itemsReducer,null);

    useEffect(()=>{
        const fetchItems = async ()=>{
            const response = await fetch('/items',{
                method:"GET"
            })
            const json = await response.json();

            if(response.ok){
                dispatch({
                    type:"GET",
                    payload:json
                })
            }
         }
        fetchItems()
    },[])
   
    return (
        <ItemsContext.Provider value={{...state,dispatch}}>
            { children }
        </ItemsContext.Provider>
    )
}

