import { configureStore } from '@reduxjs/toolkit'
import  userReducer  from '../features/users/userSlice';
import { setupListeners } from '@reduxjs/toolkit/query'
import { itemsApi } from '../services/items';
import { usersApi } from '../services/users';
import { currentUserApi } from '../services/currentUser';

const store = configureStore({
    reducer:{
        user:userReducer,
        [itemsApi.reducerPath]:itemsApi.reducer,
        [usersApi.reducerPath]:usersApi.reducer,
        [currentUserApi.reducerPath]:currentUserApi.reducerPath
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(itemsApi.middleware,usersApi.middleware,currentUserApi.middleware),
    
})
setupListeners(store.dispatch);

export default store;