import { configureStore } from '@reduxjs/toolkit';
import connectionReducer from '../reducers/connectionReducer';
import cartReducer from '../reducers/cart';

// Configure the Redux store and combine reducers
const store = configureStore({
    reducer: {
        connection: connectionReducer,
        cart: cartReducer,
    },
});

// Define a type for the root state of the application
// This represents the state object managed by the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;