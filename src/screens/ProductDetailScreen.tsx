import React, {useState} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Button,
    Alert,
    Pressable, ScrollView
} from 'react-native';
import {addToCart} from '../reducers/cart';
import {useDispatch} from "react-redux";
import colors from "../config/theme";
import typography from "../config/typography";
import CCButton from "../components/button";
import {useAlert} from "../components/alert";
import {AntDesign} from "@expo/vector-icons";

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

const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({route}: any) => {
    const {id, title, price, description, image} = route.params;
    const dispatch = useDispatch();
    const {showAlert} = useAlert();
    const [qty, setQty] = useState(1);

    const handleAddToCart = async () => {
        dispatch(addToCart({id, title, price, description, image, qty: qty}));
        showAlert({
            message: 'Product ' + title + ' added ' + qty + ' times to cart',
            type: 'success'
        })
    };

    return (
        <ScrollView style={styles.container}>
            <Image source={{uri: image}} style={styles.image}/>
            <Text
                style={[typography.textSemiBold1, styles.title]}>{title}</Text>
            <Text
                style={[typography.textMedium1, styles.price]}>${price.toFixed(2)}</Text>
            <Text
                style={[typography.text0, styles.description]}>{description}</Text>
            <View style={styles.qtyContainer}>
                <Pressable style={[styles.qtyButton, styles.minus]}
                           onPress={() => setQty(qty - 1)}>
                    <AntDesign name="minuscircle" size={18} color="white"/>
                </Pressable>
                <View style={styles.qtyValueContainer}>
                    <Text
                        style={[typography.textSemiBold1, styles.qty]}>{qty}</Text>
                </View>
                <Pressable style={[styles.qtyButton, styles.plus]}
                           onPress={() => setQty(qty + 1)}>
                    <AntDesign name="pluscircle" size={18} color="white"/>
                </Pressable>
            </View>
            <CCButton title="Add to Cart" type="primary"
                      onPress={handleAddToCart}/>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: colors.background,
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
        marginBottom: 16,
    },
    title: {
        fontSize: 20,
        marginBottom: 8,
        color: colors.textPrimary,
    },
    price: {
        fontSize: 20,
        color: colors.secondary,
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        color: '#888',
        marginBottom: 16,
    },
    qtyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    qtyButton: {
        width: 40,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40
    },
    plus: {
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
    },
    minus: {
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
    },
    qty: {
        color: colors.background,
        textAlign: 'center',
    },
    qtyValueContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1,
        backgroundColor: colors.textPrimary,
        height: 40
    }
});

export default ProductDetailScreen;
