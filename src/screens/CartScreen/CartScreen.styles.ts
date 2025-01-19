import {StyleSheet} from "react-native";
import colors from "../../config/theme";

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

export default styles;