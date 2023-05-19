import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    userName:"",
    status: 'idle',//'loading' 
    error: null,
}
const ADMIN_URL = '/admin'

export const fetchAdmin = createAsyncThunk('admin/fetchAdmin', async ()=>{
    try{
        const response = await axios.get(`${ADMIN_URL}/verify`)
        return response.data.userName
    } catch(err){
        return err.message
    }
})

export const loginAdmin = createAsyncThunk('admin/loginAdmin', async (adminData)=>{
    try {
        const response = await axios.post(`${ADMIN_URL}/login`,adminData)
        
        return response.data
    } catch (err) {
        return err.response.data.error
    }
})
export const signupAdmin = createAsyncThunk('admin/signupAdmin', async (adminData)=>{
    try {
        const response = await axios.post(`${ADMIN_URL}/signup`,adminData)
        
        return response.data
    } catch (err) {
        return err.response.data.error
    }
})
export const logoutAdmin = createAsyncThunk('admin/logoutAdmin', async ()=>{
    try {
        const response = await axios.get(`${ADMIN_URL}/logout`)
        return response.data
    } catch (err) {
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
        .addCase(fetchAdmin.pending,(state,action)=>{
            state.status = "loading"
        })
        .addCase(fetchAdmin.fulfilled,(state,action)=>{
            state.status = 'idle'
            state.userName = action.payload
        })
        .addCase(fetchAdmin.rejected,(state,action)=>{
            state.error = action.payload
        })
        .addCase(loginAdmin.fulfilled,(state,action)=>{
            //checking if response isOk or not 
            if(action.payload?.userName){
                state.userName = action.payload.userName
            }else{
                state.error=action.payload
            }
        })
        .addCase(signupAdmin.fulfilled,(state,action)=>{
            //checking if response isOk or not 
            if(action.payload?.userName){
                state.status = action.payload.userName
            }else{
                state.status = "failed"
                state.error = action.payload
            }
        })
        .addCase(logoutAdmin.fulfilled,(state)=>{
            state.userName = ""
        })
        
    }
}) 

export const selectAdmin = (state=>state.admin);

export default adminSlice.reducer