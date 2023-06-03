import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user:{
        userName: "",
        isAdmin: false,
        basket: []
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

export const updateUser = createAsyncThunk('user/updateUser', async ({userName,basket})=>{
    try {
        const response = await axios.post(`${USER_URL}/update`,{userName,basket})
        return response.data
    } catch (err) {
        return err.message
    }
})

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        getUser:(state)=>{
            return state
        },
        loginUser:(state,action)=>{
            if(action.payload?.userName){
                state.user = action.payload;
                state.error = null;
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
                state.user = action.payload;
            }
        })
        .addCase(fetchUser.rejected,(state,action)=>{
            state.error = action.payload
        })
        .addCase(signupUser.fulfilled,(state,action)=>{
            //checking if response isOk or not 
            if(action.payload?.userName){
                console.log(action.payload)
                state.user.status = action.payload.userName
            }else{
                state.status = "failed"
                state.error = action.payload
            }
        })
        .addCase(logoutUser.fulfilled,(state)=>{
            state.user.userName = ""
            state.user.isAdmin = false
        })
        .addCase(updateUser.fulfilled,(state,action)=>{
            state.user.basket = [...action.payload.basket];
        })
        
    }
}) 

export const selectUser = (state=>state.user);
export const { loginUser } = userSlice.actions
export default userSlice.reducer