import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user:{
        userName: "",
        isAdmin: false,
    },
    status:"idle",
    error:null,
}
const USER_URL = '/user'

export const fetchUser = createAsyncThunk('user/fetchUser', async ()=>{
    try{
        const response = await axios.get(`${USER_URL}/verify`)
        return response.data
    } catch(err){
        return err.response.data.errorMessage
    }
})
export const signupUser = createAsyncThunk('user/signupUser', async (userData)=>{
    try {
        const response = await axios.post(`${USER_URL}/signup`,userData)
        return response.data
    } catch (err) {
        return err.response.data.error
    }
})
export const logoutUser = createAsyncThunk('user/logoutUser', async ()=>{
    try {
        const response = await axios.get(`${USER_URL}/logout`)
        return response.data
    } catch (err) {
        return err.message
    }
})

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers:{
        getUser:(state)=>{
            return state
        },
        loginUser:(state,action)=>{
            if(action.payload?.userName){
                state.user.userName = action.payload.userName
                state.user.isAdmin = action.payload.isAdmin
            }else{
                state.error = action.payload
            }
        }
    },
    extraReducers(builder) {
        builder
        .addCase(fetchUser.pending,(state)=>{
            state.status = "loading"
        })
        .addCase(fetchUser.fulfilled,(state,action)=>{
            state.status = 'idle'
            if(action.payload){
                state.user.userName = action.payload?.userName
                state.user.isAdmin = action.payload?.isAdmin
            }
        })
        .addCase(fetchUser.rejected,(state,action)=>{
            state.error = action.payload
        })
        .addCase(signupUser.fulfilled,(state,action)=>{
            //checking if response isOk or not 
            if(action.payload?.userName){
                console.log(action.payload)
                state.status = action.payload.userName
            }else{
                state.status = "failed"
                state.error = action.payload
            }
        })
        .addCase(logoutUser.fulfilled,(state)=>{
            state.user.userName = ""
            state.user.isAdmin = false
        })
        
    }
}) 

export const selectUser = (state=>state.users);
export const { loginUser } = usersSlice.actions
export default usersSlice.reducer