import {StyleSheet} from "react-native";
import colors from "../../config/theme";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 16,
        backgroundColor: colors.background,
    },
    label: {
        fontFamily: 'poppins-semibold',
        color: colors.textPrimary,
        marginBottom: 8,
    },
    total: {
        fontFamily: 'poppins-semibold',
        color: colors.secondary,
        fontSize: 18,
        paddingBottom: 16,
        textAlign: 'center',
    },
    cardIcon: {
        width: 40,
        height: 25,
        marginLeft: 8,
        position: 'absolute',
        right: 8,
        top: 12,
    },
    cardInputContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    checkboxContainer: {
        flexDirection: 'row',

        alignItems: 'center',
        gap: 10
    },
    checkbox: {
        alignSelf: 'center',
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: colors.primary,
        marginBottom: 10,
    },
    checked: {
        backgroundColor: colors.primary,
    },
    unchecked: {
        backgroundColor: 'transparent',
    },
});

export default styles;