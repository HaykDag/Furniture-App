import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    allUsers:[],
    user:{
        username: "",
        isAdmin: false,
        basket: []
    },
    status:"idle",
    error:null,
}
const USER_URL = '/user'

export const fetchUsers = createAsyncThunk('user/fetchUsers', async ()=>{
    try{
        const response = await axios.get(USER_URL)
        return response.data.users
    } catch(err){
        return err.response.data.errorMessage
    }
})

export const fetchUser = createAsyncThunk('user/fetchUser', async ()=>{
    try{
        const response = await axios.get(`${USER_URL}/verify`);
        return response.data
    } catch(err){
        return err.response.data.errorMessage
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

export const updateUser = createAsyncThunk('user/updateUser', async ({username,basket})=>{
    try {
        const response = await axios.post(`${USER_URL}/update`,{username,basket})
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
            if(action.payload?.username){
                state.user.username = action.payload.username
                state.user.isAdmin = action.payload.isAdmin
                state.user.basket = action.payload.basket
                state.error = null;
            }else{
                state.error = action.payload
            }
        },
        signupUser:(state,action)=>{
            if(action.payload?.username){
                state.user.username = action.payload.username
                state.user.isAdmin = action.payload.isAdmin
                state.user.basket = action.payload.basket
                state.error = null;
            }else{
                state.error = action.payload
            }
        }
    },
    extraReducers(builder) {
        builder
        .addCase(fetchUsers.pending,(state)=>{
            state.status = "loading"
        })
        .addCase(fetchUsers.fulfilled,(state,action)=>{
            state.status = 'idle'
            if(action.payload){
                state.allUsers = action.payload
            }
        })
        .addCase(fetchUsers.rejected,(state,action)=>{
            state.error = action.payload
        })
        .addCase(fetchUser.pending,(state)=>{
            state.status = "loading"
        })
        .addCase(fetchUser.fulfilled,(state,action)=>{
            state.status = 'idle'
            if(action.payload){
                state.user.username = action.payload?.username
                state.user.isAdmin = action.payload?.isAdmin
                state.user.basket = action.payload?.basket
            }
        })
        .addCase(fetchUser.rejected,(state,action)=>{
            state.error = action.payload
        })
        .addCase(logoutUser.fulfilled,(state)=>{
            state.user.username = ""
            state.user.isAdmin = false
        })
        .addCase(updateUser.fulfilled,(state,action)=>{
            state.user.basket = [...action.payload.basket];
        })
        
    }
}) 

export const selectAllUsers = (state=>state.users.allUsers);
export const selectUser = (state=>state.users);
export const { loginUser, signupUser } = usersSlice.actions
export default usersSlice.reducer