import { configureStore } from '@reduxjs/toolkit'
import  userReducer  from '../features/users/usersSlice';
import { setupListeners } from '@reduxjs/toolkit/query'
import { itemsApi } from '../services/items';

const store = configureStore({
    reducer:{
        users:userReducer,
        [itemsApi.reducerPath]:itemsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(itemsApi.middleware),
})
setupListeners(store.dispatch);

export default store;