import React, {useState} from 'react';
import {
    Text,
    Image,
    ScrollView
} from 'react-native';
import {addToCart} from '../../reducers/cart';
import {useDispatch} from "react-redux";
import colors from "../../config/theme";
import typography from "../../config/typography";
import CCButton from "../../components/button/button";
import {useAlert} from "../../components/alert/alert";
import CCNumberSelector from "../../components/numberSelector/numberSelector";
import {ProductDetailScreenProps} from "./ProductDetailScreen.types";
import styles from "./ProductDetailScreen.styles";

const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({route}: any) => {
    // Destructure product details from the route parameters
    const {id, title, price, description, image} = route.params;
    // Initialize Redux dispatch
    const dispatch = useDispatch();
    const {showAlert} = useAlert();
    // State to manage the quantity of the product to add to the cart
    const [qty, setQty] = useState(1);

    /**
     * Adds the selected product to the cart with the specified quantity.
     * Displays a success alert upon completion.
     *
     * @async
     * @returns {Promise<void>} Resolves when the product has been added to the cart and the alert is shown.
     */
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
            <CCNumberSelector value={qty} onChangeValue={setQty}/>
            <CCButton title="Add to Cart" type="primary"
                      onPress={handleAddToCart}/>
        </ScrollView>
    );
};

export default ProductDetailScreen;
