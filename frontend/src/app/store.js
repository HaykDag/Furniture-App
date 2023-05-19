import { configureStore } from '@reduxjs/toolkit'
import itemsReducer from '../features/items/itemsSlice';
import  userReducer  from '../features/users/usersSlice';

const store = configureStore({
    reducer:{
        items:itemsReducer,
        users:userReducer
    }
})

export default store;