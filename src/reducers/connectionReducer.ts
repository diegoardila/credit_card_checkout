import { createSlice } from '@reduxjs/toolkit';

interface ConnectionState {
    isConnected: boolean;
}

const initialState: ConnectionState = {
    isConnected: true, // Valor inicial
};

const connectionSlice = createSlice({
    name: 'connection',
    initialState,
    reducers: {
        setConnectionStatus: (state, action) => {
            state.isConnected = action.payload;
        },
    },
});

export const { setConnectionStatus } = connectionSlice.actions;

export default connectionSlice.reducer;