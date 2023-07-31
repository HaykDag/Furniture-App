import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AppUrl } from "../../components/AppData";

const initialState = {
    allUsers: [],
    totalUsers: 0,
    user: {
        username: "",
        isAdmin: false,
        basket: [],
    },
    error: null,
};

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
    try {
        const response = await axios.get(AppUrl.Users.base);
        return response.data.users;
    } catch (err) {
        return err.response.data.errorMessage;
    }
});

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
    try {
        const response = await axios.get(AppUrl.Users.verifyUser);
        return response.data;
    } catch (err) {
        return err.response.data.errorMessage;
    }
});

export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
    try {
        const response = await axios.get(AppUrl.Users.logoutUser);
        return response.data;
    } catch (err) {
        return err.message;
    }
});

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        getUser: (state) => {
            return state;
        },
        loginUser: (state, action) => {
            if (action.payload?.username) {
                state.user = action.payload;
                state.error = null;
            } else {
                state.error = action.payload;
            }
        },
        signupUser: (state, action) => {
            if (action.payload?.username) {
                state.user = action.payload;
                state.error = null;
            } else {
                state.error = action.payload;
            }
        },
        removeItemFromBasket: (state, action) => {
            state.user.basket = state.user.basket.filter(
                (item) => item.id !== action.payload
            );
        },
        addItemIntoBasket: (state, action) => {
            state.user.basket.push(action.payload);
        },
        orderItem: (state, action) => {
            state.user.orders.push(action.payload);
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchUsers.fulfilled, (state, action) => {
                if (action.payload) {
                    state.totalUsers = action.payload.total;
                    state.allUsers = action.payload.result;
                }
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                if (action.payload) {
                    state.user = action.payload;
                }
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user.username = "";
                state.user.isAdmin = false;
            });
    },
});

export const selectAllUsers = (state) => state.users.allUsers;
export const selectUser = (state) => state.users;
export const {
    loginUser,
    signupUser,
    removeItemFromBasket,
    addItemIntoBasket,
    orderItem,
} = usersSlice.actions;
export default usersSlice.reducer;
