import {StyleSheet} from "react-native";
import colors from "../../config/theme";

const styles = StyleSheet.create({
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
    disabled: {
        backgroundColor: '#555',
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

export default styles;