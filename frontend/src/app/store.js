import { configureStore } from '@reduxjs/toolkit'
import itemsReducer from '../features/items/itemsSlice';
import  userReducer  from '../features/users/usersSlice';
import categoryReducer from '../features/Categories/CategorySlice';

const store = configureStore({
    reducer:{
        items:itemsReducer,
        users:userReducer,
        category: categoryReducer
    }
})

export default store;