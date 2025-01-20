import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ProductDetailScreen from "../screens/ProductDetailScreen/ProductDetailScreen";
import CartScreen from "../screens/CartScreen/CartScreen";
import {Pressable, Text, View} from "react-native";
import {useSelector} from "react-redux";
import {RootState} from "../store";
import AddCardScreen from "../screens/CardScreen/CardScreen";
import colors from "../config/theme";
import typography from "../config/typography";
import {Entypo, FontAwesome5} from "@expo/vector-icons";
import styles from "./AppNavigator.styles";

const Stack = createStackNavigator();

const AppNavigator: React.FC = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    let cartItemsCount = 0;
    cartItems.forEach((item) => cartItemsCount += item.qty);
    return (
        <View style={styles.container}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={({navigation}) => ({
                    headerRight: () => (
                        <View>
                            <Pressable
                                style={{
                                    paddingRight: 8,
                                }}
                                disabled={cartItemsCount == 0}
                                onPress={() => {
                                    navigation.navigate('Cart');
                                }}>
                                <FontAwesome5 name="shopping-cart" size={24}
                                              color={cartItemsCount == 0 ? "gray" : "white"}/>
                            </Pressable>
                            {cartItemsCount > 0 && <View style={styles.cartButton}>
                                <Text
                                    style={[typography.textMedium0, {
                                        color: colors.textPrimary,
                                        fontSize: 10
                                    }]}>{cartItemsCount}</Text>
                            </View>}
                        </View>
                    ),
                    headerLeft: () =>
                        navigation.canGoBack() ? (
                            <Pressable
                                onPress={() => navigation.goBack()}>
                                <Entypo name="chevron-left" size={24}
                                        color="white"/>
                            </Pressable>
                        ) : null,
                    headerStyle: {
                        backgroundColor: colors.background,
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: typography.textBlack2,
                    headerTitleAlign: 'center',
                })} id={undefined}>
                    <Stack.Screen name="Splash"
                                  component={SplashScreen}
                                  options={{headerShown: false}}/>
                    <Stack.Screen name="Home" component={HomeScreen}
                                  options={{title: 'Product list'}}/>
                    <Stack.Screen name="ProductDetail"
                                  component={ProductDetailScreen}
                                  options={{title: 'Product Detail'}}/>
                    <Stack.Screen name="Cart" component={CartScreen}/>
                    <Stack.Screen name="Card" component={AddCardScreen}
                                  initialParams={{totalAmount: 0}}/>
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    );
}

export default AppNavigator;
