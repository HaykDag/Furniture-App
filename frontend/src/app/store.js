import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "../features/items/itemsSlice";
import userReducer from "../features/users/usersSlice";
import categoryReducer from "../features/Categories/CategorySlice";
import orderReducer from "../features/orders/ordersSlice";

const store = configureStore({
    reducer: {
        items: itemsReducer,
        users: userReducer,
        category: categoryReducer,
        orders: orderReducer,
    },
});

export default store;
