import { configureStore } from '@reduxjs/toolkit';
import connectionReducer from '../reducers/connectionReducer';
import cartReducer from '../reducers/cart';

const store = configureStore({
    reducer: {
        connection: connectionReducer,
        cart: cartReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;