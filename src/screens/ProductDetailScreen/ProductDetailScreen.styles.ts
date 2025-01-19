import {StyleSheet} from "react-native";
import colors from "../../config/theme";

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
    }
});

export default styles;