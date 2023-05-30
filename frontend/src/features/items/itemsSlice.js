import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const ITEMS_URL = '/items'

const initialState = {
    items:[],
    status:'idle',
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
        const response = await axios.post(ITEMS_URL,initialItem)
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
export const deleteItems = createAsyncThunk('items/deleteItems', async (initialItem)=>{
    
    const  id  = initialItem
    try{
        const response = await axios.delete(`${ITEMS_URL}/${id}`)
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
            return state.items?.items
        },
        getOneItem:(state,action)=>{
            const item = state.items?.items?.find(i=>i._id===action.payload);
            return item;
        }
    },
    extraReducers(builder) {
        builder
        .addCase(fetchItems.pending,(state)=>{
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
        .addCase(addItems.fulfilled,(state,action)=>{//this is working
            state.status = 'succeeded'
            state.items.unshift(action.payload)
        })
        .addCase(addItems.rejected,(state,action)=>{//not sure if I need this
            state.status = 'failed'
            state.error = action.error
        })
        .addCase(updateItems.fulfilled,(state,action)=>{//this is working
            state.status = 'succeeded'
            const items = state.items.map(item=>item._id===action.payload.id?{...item,...action.payload}:item);
            state.items = items
        })
        .addCase(updateItems.rejected,(state,action)=>{//not sure if I need this
            state.status = 'failed'
            state.error = action.error
        })
        .addCase(deleteItems.fulfilled,(state,action)=>{ // //this is working
            state.status = 'succeeded'
            const items = state.items.filter(item=>item._id!==action.payload._id);
            state.items = items
        })
        .addCase(deleteItems.rejected,(state,action)=>{//not sure if I need this
            state.status = 'failed'
            state.error = action.error
        })
    }
})

export const selectAllItems = (state)=> state.items.items
export const getItemsStatus = (state)=> state.items.status
export const getItemsError = (state)=> state.items.error

export const { getAllItems, getOneItem } = itemsSlice.actions;
export default itemsSlice.reducer;