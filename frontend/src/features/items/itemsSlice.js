import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";

const ITEMS_URL = "http://localhost:4000/items";

const initialState = {
    items: [],
    totalItems: 0,
    error: null,
};

export const fetchItems = createAsyncThunk(
    "items/fetchItems",
    async ({ value, page, pageSize, searchTag }) => {
        try {
            const response = await axios.get(
                `${ITEMS_URL}?value=${value}&pageSize=${pageSize}&page=${page}&searchTag=${searchTag}`
            );
            return response.data;
        } catch (err) {
            return err.message;
        }
    }
);

const itemsSlice = createSlice({
    name: "items",
    initialState,
    reducers: {
        getAllItems: (state) => {
            return state.items?.items;
        },
        getOneItem: (state, action) => {
            const item = state.items?.items?.find(
                (i) => i._id === action.payload
            );
            return item;
        },
        addItem: (state, action) => {
            state.items.push(action.payload);
        },
        updateItem: (state, action) => {
            state.items = state.items.map((item) => {
                if (item.id === action.payload.id) {
                    return action.payload;
                } else {
                    return item;
                }
            });
        },
        deleteItem: (state, action) => {
            state.items = state.items.filter(
                (item) => item.id !== action.payload
            );
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchItems.fulfilled, (state, action) => {
                state.items = action.payload.result;
                state.totalItems = action.payload.total;
            })
            .addCase(fetchItems.rejected, (state, action) => {
                state.error = action.error;
            });
    },
});

export const selectAllItems = (state) => state.items.items;
export const selectTotalItems = (state) => state.items.totalItems;
export const getItemsError = (state) => state.items.error;

export const { getAllItems, getOneItem, updateItem, addItem, deleteItem } =
    itemsSlice.actions;
export default itemsSlice.reducer;
