import { configureStore } from '@reduxjs/toolkit'
import itemsReducer from '../features/items/itemsSlice';
import  adminReducer  from '../features/admin/adminSlice';

const store = configureStore({
    reducer:{
        items:itemsReducer,
        admin:adminReducer
    }
})

export default store;