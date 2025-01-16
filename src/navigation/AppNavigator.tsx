import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import ProductDetailScreen from "../screens/ProductDetailScreen";
import CartScreen from "../screens/CartScreen";
import {Button, ToastAndroid} from "react-native";
import {useSelector} from "react-redux";
import {RootState} from "../store";

const Stack = createStackNavigator();

const AppNavigator: React.FC = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    let cartItemsCount = 0;
    cartItems.forEach((item) => cartItemsCount += item.qty);
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={({navigation}) => ({
                headerRight: () => (
                    <Button
                        title={`Cart (${cartItemsCount})`}
                        onPress={() => {
                            navigation.navigate('Cart');
                        }}
                    />
                ),
                headerLeft: () =>
                    navigation.canGoBack() ? (
                        <Button title="Back"
                                onPress={() => navigation.goBack()}/>
                    ) : null,
            })} id={undefined}>
                <Stack.Screen name="Splash" component={SplashScreen}/>
                <Stack.Screen name="Home" component={HomeScreen}/>
                <Stack.Screen name="ProductDetail"
                              component={ProductDetailScreen}
                              options={{title: 'Product Detail'}}/>
                <Stack.Screen name="Cart" component={CartScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigator;
