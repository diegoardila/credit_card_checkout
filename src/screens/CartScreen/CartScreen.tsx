import {
    View,
    Text,
    FlatList,
    Image,
    Pressable
} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {clearCart, removeFromCart} from "../../reducers/cart";
import colors from "../../config/theme";
import typography from "../../config/typography";
import CCButton from "../../components/button/button";
import {AntDesign} from "@expo/vector-icons";
import styles from "./CartScreen.styles";

const CartScreen: React.FC = ({navigation}: any) => {
    const dispatch = useDispatch();
    //Selector to retrieve cart items from the Redux store.
    const cartItems = useSelector((state: RootState) => state.cart.items);
    let cartTotal = 0;
    /**
     * Calculates the total price of all items in the cart.
     * @type {number} The total cost of items in the cart.
     */
    cartItems.forEach((item) => cartTotal += item.price);

    /**
     * Clears all items from the cart.
     * Dispatches the `clearCart` action.
     */
    const handleClearCart = async () => {
        dispatch(clearCart());
    };

    /**
     * Removes a specific item from the cart.
     * Dispatches the `removeFromCart` action with the item ID.
     * @param id {number} The ID of the item to be removed.
     */
    const handleRemoveItemFromCart = async (id: number) => {
        dispatch(removeFromCart(id));
    };
    return (
        <View style={styles.container}>
            <FlatList
                data={cartItems}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    <View style={styles.item}>
                        <Image source={{uri: item.image}}
                               style={styles.productImage}/>
                        <View style={{flexDirection: 'column', flex: 1}}>
                            <Text
                                style={[typography.textMedium1, styles.title]}>{item.title}</Text>
                            <Text
                                style={[typography.text1, styles.price]}>${item.price.toFixed(2)}</Text>
                            <Text
                                style={[typography.text1, styles.qty]}>Quantity: {item.qty}</Text>
                        </View>
                        <Pressable
                            onPress={() => handleRemoveItemFromCart(item.id)}>
                            <AntDesign
                            name="closecircle" size={20}
                            color="white"/>
                        </Pressable>
                    </View>
                )}
            />

            {cartItems.length > 0 ? (<View>
                <Text
                    style={[typography.textSemiBold1, {
                        color: colors.primary,
                        textAlign: 'center'
                    }]}>
                    Total:
                    ${cartTotal.toFixed(2)}</Text>
                <CCButton title="Pay with credit card"
                          type="primary"
                          onPress={() => navigation.push('Card', {totalAmount: cartTotal})}
                          disabled={cartItems.length === 0}
                          style={{marginBottom: 10}}/>
                <CCButton
                    title="Clear Cart" type='secondary'
                    onPress={handleClearCart}/>
            </View>) : null}
        </View>
    );
};



export default CartScreen;
