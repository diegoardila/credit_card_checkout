import {StyleSheet} from "react-native";
import colors from "../../config/theme";

const styles = StyleSheet.create({
    alertContainer: {
        position: 'absolute',
        top: 50,
        left: 20,
        right: 20,
        padding: 15,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 10,
        justifyContent: 'space-between',
        backgroundColor: colors.textPrimary,
        zIndex: 1000,
    },
    alertText: {
        flex: 1,
        color: colors.background,
        fontFamily: 'poppins-medium',
        fontSize: 16,
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default styles;