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
                        <View style={{flexDirection: 'column', width: '70%'}}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text
                                style={styles.price}>${item.price.toFixed(2)}</Text>
                            <Text
                                style={styles.title}>Cantidad: {item.qty}</Text>
                        </View>
                        <Pressable
                            onPress={() => handleRemoveItemFromCart(item.id)}><Text
                            style={styles.title}>X</Text></Pressable>
                    </View>
                )}
            />

            {cartItems.length > 0 ? (<View>
                <Text
                    style={styles.title}>Total a pagar:
                    ${cartTotal.toFixed(2)}</Text>
                <Button title="Go to payment"
                        onPress={() => navigation.push('Card', {totalAmount: cartTotal})}
                        disabled={cartItems.length === 0}/>
                <Button
                    title="Clear Cart" onPress={handleClearCart}/>
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
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    item: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    title: {
        fontSize: 18,
    },
    price: {
        fontSize: 16,
        color: '#4CAF50',
    },
});

export default CartScreen;
