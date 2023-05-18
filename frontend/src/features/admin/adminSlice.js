import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userName:null,
    status:false,
}

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers:{

    },
    extraReducers:{

    }
}) 


export default adminSlice.reducer