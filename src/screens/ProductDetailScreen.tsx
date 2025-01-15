import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

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

const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({ route }) => {
    const { id, title, price, description, image } = route.params;

    return (
        <View style={styles.container}>
            <Image source={{ uri: image }} style={styles.image} />
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.price}>${price.toFixed(2)}</Text>
            <Text style={styles.description}>{description}</Text>
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
        height: 250,
        resizeMode: 'contain',
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    price: {
        fontSize: 18,
        color: '#888',
        marginBottom: 16,
    },
    description: {
        fontSize: 16,
        color: '#333',
    },
});

export default ProductDetailScreen;
