import React from 'react';
import { View, Text, Image, StyleSheet, Button, Alert } from 'react-native';
import {addToCart} from '../reducers/cart';
import {useDispatch} from "react-redux";

interface ProductDetailScreenProps {
    route: {
        params: {
            id: number;
            title: string;
            price: number;
            description: string;
            image: string;
        };
    };
}

const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({ route, navigation }: any) => {
    const { id, title, price, description, image } = route.params;
    const dispatch = useDispatch();

    const handleAddToCart = async () => {
        dispatch(addToCart({id, title, price, description, image, qty: 1}));
        //Alert.alert('Success', 'Product added to cart!', [{ text: 'OK', onPress: () => navigation.replace('Cart') }]);
    };

    return (
        <View style={styles.container}>
            <Image source={{ uri: image }} style={styles.image} />
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.price}>${price.toFixed(2)}</Text>
            <Text style={styles.description}>{description}</Text>
            <Button title="Add to Cart" onPress={handleAddToCart} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    price: {
        fontSize: 20,
        color: '#4CAF50',
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        color: '#555',
        marginBottom: 16,
    },
});

export default ProductDetailScreen;
