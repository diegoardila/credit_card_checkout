import React from 'react';
import {Provider} from 'react-redux';
import store from './src/store';
import AppNavigator from './src/navigation/AppNavigator';
import {AlertProvider} from "./src/components/alert/alert";

export default function App() {

    return (
        <AlertProvider>
            <Provider store={store}>
                <AppNavigator/>
            </Provider>
        </AlertProvider>
    );
}