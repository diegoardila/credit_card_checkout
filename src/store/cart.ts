import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;
    qty: number;
}

const CART_KEY = 'cart_items';

export const Cart = {
    async addToCart(product: Product) {
        try {
            const cartJSON = await AsyncStorage.getItem(CART_KEY);
            const cart = cartJSON ? JSON.parse(cartJSON) : [];
            const updatedCart = [...cart, product];
            await AsyncStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
            return updatedCart;
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    },

    async getCart() {
        try {
            const idCount: Record<number, number> = {};
            const cartJSON = await AsyncStorage.getItem(CART_KEY);
            let data: Product[] = [];

            if (cartJSON) {
                data = JSON.parse(cartJSON);
                for (const product of data) {
                    idCount[product.id] = (idCount[product.id] || 0) + 1;
                    product.qty = idCount[product.id];
                }
                data = data.filter((item: Product) => item.qty === idCount[item.id])
            } else {
                data = [];
            }
            return data;
        } catch (error) {
            console.error('Error fetching cart:', error);
            return [];
        }
    },

    async clearCart() {
        try {
            await AsyncStorage.removeItem(CART_KEY);
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    },
};
