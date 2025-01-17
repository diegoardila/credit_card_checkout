export const setConnectionStatus = (isConnected: boolean) => ({
    type: 'SET_CONNECTION_STATUS',
    payload: isConnected,
});