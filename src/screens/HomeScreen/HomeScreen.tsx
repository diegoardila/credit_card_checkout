import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity
} from 'react-native';
import typography from "../../config/typography";
import styles from "./HomeScreen.styles";
import SplashScreen from "../SplashScreen/SplashScreen";
import {useAlert} from "../../components/alert/alert";
import {Product} from "./HomeScreen.types";

const HomeScreen: React.FC = ({navigation}: any) => {
    // State for storing the fetched products
    const [products, setProducts] = useState<Product[]>([]);
    // State to track loading status
    const [loading, setLoading] = useState(true);
    const {showAlert} = useAlert();

    //Fetches the list of products from a remote API and updates the state.
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                showAlert({
                    message: "Error fetching products",
                    type: "error"
                });
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Show a splash screen while data is being fetched
    if (loading) {
        return (
            <SplashScreen/>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                style={{paddingVertical: 20}}
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    <TouchableOpacity
                        style={styles.productCard}
                        onPress={() => navigation.push("ProductDetail", item)}>
                        <View style={styles.imageContainer}>
                            <Image source={{uri: item.image}}
                                   style={styles.productImage}/>
                        </View>
                        <View style={styles.productDetails}>
                            <Text
                                style={[typography.textSemiBold1, styles.productTitle]}>{item.title}</Text>
                            <Text
                                style={[typography.textMedium0, styles.productPrice]}>${item.price.toFixed(2)}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};


export default HomeScreen;
