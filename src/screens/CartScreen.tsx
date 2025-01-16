import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, Button, Alert} from 'react-native';
import {Cart, Product} from '../store/cart';

const CartScreen: React.FC = ({navigation} :any) => {
    const [cartItems, setCartItems] = useState<Product[]>([]);

    useEffect(() => {
        const fetchCartItems = async () => {
            const items = await Cart.getCart();
            setCartItems(items);
        };

        fetchCartItems();
    }, []);
    const handleClearCart = async () => {
        await Cart.clearCart();
        Alert.alert('Success', 'All products removed from cart', [{
            text: 'OK',
            onPress: () => navigation.replace('Cart')
        }]);

    };
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Cart Items</Text>
            <FlatList
                data={cartItems}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    <View style={styles.item}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text
                            style={styles.price}>${item.price.toFixed(2)}</Text>
                        <Text style={styles.title}>Cantidad: {item.qty}</Text>
                    </View>
                )}
            />
            <Button title="Go to payment" onPress={ () => navigation.replace('Payment')} disabled={cartItems.length === 0}/>
            <Button title="Clear Cart" onPress={handleClearCart}/>
        </View>
    );
};

const styles = StyleSheet.create({
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
