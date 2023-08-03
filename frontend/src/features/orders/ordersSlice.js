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

// export const updateOrder = createAsyncThunk(
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
    name: "orders",
    initialState,
    reducers: {
        getOrders: (state) => {
            return state.orders;
        },
        updateOrder: (state, action) => {
            const { order_status, payment_status } = action.payload;
            state.orders = state.orders.map((order) => {
                return order.id === action.payload.id
                    ? { ...order, payment_status, order_status }
                    : order;
            });
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

export const { getOrders, updateOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
