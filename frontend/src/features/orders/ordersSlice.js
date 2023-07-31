import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AppUrl } from "../../components/AppData";
import axios from "axios";

const initialState = {
    orders: [],
    error: null,
};

export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
    try {
        const response = await axios.get(AppUrl.Orders);
        return response.data.result;
    } catch (err) {
        return err.message;
    }
});

// export const updateCategories = createAsyncThunk(
//     "categories/updateCategories",
//     async (initialItem) => {
//         //id is hardcodeed in backend
//         const obj = {
//             categories: initialItem,
//         };
//         try {
//             const response = await axios.patch(AppUrl.Categories, obj);
//             return response.data;
//         } catch (err) {
//             return err.message;
//         }
//     }
// );

const ordersSlice = createSlice({
    name: orders,
    initialState,
    reducers: {
        getOrders: (state) => {
            return state.orders;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.orders = action.payload;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { getOrders } = ordersSlice.actions;
export default ordersSlice.reducer;