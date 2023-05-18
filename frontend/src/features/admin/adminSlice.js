import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    status:"NOT_ADMIN",//'ADMIN' | 'LOADING'
}
const ADMIN_URL = '/admin'

export const fetchAdmin = createAsyncThunk('admin/fetchAdmin', async ()=>{
    try{
        const response = await axios.get(`${ADMIN_URL}/verify`)
        
        return response.data.userName.adminUserName
    } catch(err){
        
        return err.message
    }
})

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers:{
        getAdmin:(state)=>{
            return state
        },
    },
    extraReducers(builder) {
        builder
        .addCase(fetchAdmin.pending,(state)=>{
            state.status = 'LOADING'
        })
        .addCase(fetchAdmin.fulfilled,(state,action)=>{
            state.status = 'ADMIN'
            state.admin = action.payload
        })
        
    }
}) 

export const selectAdmin = (state=>state.admin);

export default adminSlice.reducer