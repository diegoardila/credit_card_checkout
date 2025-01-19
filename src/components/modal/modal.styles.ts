import {StyleSheet} from "react-native";
import colors from "../../config/theme";

const styles = StyleSheet.create({

    modalBackdrop: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 8,
        alignItems: 'center',
        overflow: 'hidden',
    },
    modalTitle: {
        width: '100%',
        padding: 20,
        textAlign: 'center',
        backgroundColor: colors.primary,
        color: colors.textPrimary,
        fontFamily: 'poppins-semibold',
        fontSize: 18,
        marginBottom: 20,
        elevation: 3,
    },
    modalText: {
        fontFamily: 'poppins-regular',
        fontSize: 14,
        marginBottom: 8,
    },
    closeButton: {
        flex: 1,
        backgroundColor: '#ff4444',
        padding: 10,
        borderRadius: 8,
        marginTop: 20,
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default styles;