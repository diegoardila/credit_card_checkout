import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Button,
    Alert,
    Image,
    Pressable
} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import {clearCart, removeFromCart} from "../reducers/cart";
import colors from "../config/theme";
import typography from "../config/typography";
import CCButton from "../components/button";
import {AntDesign} from "@expo/vector-icons";

const CartScreen: React.FC = ({navigation}: any) => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.items);
    let cartTotal = 0;
    cartItems.forEach((item) => cartTotal += item.price);
    const handleClearCart = async () => {
        dispatch(clearCart());
    };
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

const styles = StyleSheet.create({
    productImage: {
        width: 80,
        height: 80,
        resizeMode: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingBottom: 8
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    item: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        gap: 10,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    title: {
        color: colors.textPrimary,
    },
    qty: {
        color: colors.textPrimary,
        fontSize: 14
    },
    price: {
        color: colors.primary,
    },
});

export default CartScreen;
