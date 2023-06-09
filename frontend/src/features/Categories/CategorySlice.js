import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const CATEGORY_URL = 'http://localhost:4000/categories/'

const initialState = {
    categories:[],
    error: null
}

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async ()=>{
    try{
        const response = await axios.get(CATEGORY_URL)
        return response.data
    } catch(err){
        return err.message
    }
})

export const updateCategories = createAsyncThunk('categories/updateCategories', async (initialItem)=>{
    //id is hardcodeed in backend
    const obj = {
        categories:initialItem
    }
    try{
        const response = await axios.patch(CATEGORY_URL,obj)
        return response.data
    } catch(err){
        return err.message
    }
})

const categorySlice = createSlice({
    name:"category",
    initialState,
    reducers:{
        getCategories:(state)=>{
            return state.categories;
        }
    },
    extraReducers(builder) {
        builder
        .addCase(fetchCategories.fulfilled,(state,action)=>{
            state.categories = action.payload
        })
        .addCase(fetchCategories.rejected,(state,action)=>{
            state.error = action.error
        })
        .addCase(updateCategories.fulfilled,(state,action)=>{
            state.categories = action.payload.categories
        })
        .addCase(updateCategories.rejected,(state,action)=>{//not sure if I need this
            state.error = action.error
        })
    }
})


export const { getCategories } = categorySlice.actions;
export default categorySlice.reducer;