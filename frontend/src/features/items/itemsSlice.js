import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";

const ITEMS_URL = '/items'

const initialState = {
    items:[],
    status:'idle',//idle | loading | succeeded | failed
    error: null
}

export const fetchItems = createAsyncThunk('items/fetchItems', async ()=>{
    try{
        const response = await axios.get(ITEMS_URL)
        return response.data
    } catch(err){
        return err.message
    }
})
export const addItems = createAsyncThunk('items/addItems', async (initialItem)=>{
    try{
        const response = await axios.get(ITEMS_URL,initialItem)
        return response.data
    } catch(err){
        return err.message
    }
})
export const updateItems = createAsyncThunk('items/updateItems', async (initialItem)=>{
    
    const { id } = initialItem
    try{
        const response = await axios.patch(`${ITEMS_URL}/${id}`,initialItem)
        return response.data
    } catch(err){
        return err.message
    }
})

const itemsSlice = createSlice({
    name:"items",
    initialState,
    reducers:{
        getAllItems:(state)=>{
            return state
        },
        getOneItem:(state,action)=>{
            const item = state.items.find(action.payload);
            return item;
        },
        // addItem:(state,action)=>{
        //     state.items.unshift(action.payload)
        // },
        // updateItem:(state,action)=>{
        //     const items = state.items.map(item=>item._id===action.payload.id?{...item,...action.payload}:item);
        //     state.items = items
        // },
        deleteItem:(state,action)=>{
           const items = state.items.filter(item=>item._id!==action.payload);
           state.items = items
        }
    },
    extraReducers(builder) {
        builder
        .addCase(fetchItems.pending,(state,action)=>{
            state.status = 'loading'
        })
        .addCase(fetchItems.fulfilled,(state,action)=>{
            state.status = 'succeeded'
            state.items = action.payload
        })
        .addCase(fetchItems.rejected,(state,action)=>{
            state.status = 'failed'
            state.error = action.error
        })
        .addCase(addItems.fulfilled,(state,action)=>{//test this 
            state.items.unshift(action.payload)
        })
        .addCase(updateItems.fulfilled,(state,action)=>{//this is working
            const items = state.items.map(item=>item._id===action.payload.id?{...item,...action.payload}:item);
            state.items = items
        })
    }
})

export const selectAllItems = (state)=> state.items.items
//export const selecItemById = (state,id)=> state.items.find(id)
export const getItemsStatus = (state)=> state.items.status
export const getItemsError = (state)=> state.items.error

export const { getAllItems, getOneItem, addItem, updateItem, deleteItem } = itemsSlice.actions;
export default itemsSlice.reducer;