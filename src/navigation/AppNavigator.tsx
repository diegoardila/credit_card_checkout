import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import ProductDetailScreen from "../screens/ProductDetailScreen";

const Stack = createStackNavigator();

const AppNavigator: React.FC = () => (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}} id={undefined}>
            <Stack.Screen name="Splash" component={SplashScreen}/>
            <Stack.Screen name="Home" component={HomeScreen}/>
            <Stack.Screen name="ProductDetail" component={ProductDetailScreen}
                          options={{title: 'Product Detail'}}/>
        </Stack.Navigator>
    </NavigationContainer>
);

export default AppNavigator;
