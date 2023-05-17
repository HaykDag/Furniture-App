import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {id:1,title:"oho",description:"lavel divana",price:250}
]

const itemsSlice = createSlice({
    name:"items",
    initialState,
    reducers:{
        getAllItems:(state)=>{
            return nstate
        },
        getOneItem:(state,action)=>{
            const item = state.find(action.payload);
            return item;
        },
        addItem:(state,action)=>{
            state.unshift(action.payload)
        },
        updateItem:(state,action)=>{
            state.map(item=>{
                item.id===action.payload.id?{...item,...action.payload}:item
            })
        }
    }
})