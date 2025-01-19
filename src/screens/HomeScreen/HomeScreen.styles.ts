import {StyleSheet} from "react-native";
import colors from "../../config/theme";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        color: colors.textPrimary
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContainer: {
        paddingHorizontal: 10,
    },
    productCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#333',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 4,
    },
    imageContainer: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        overflow: 'hidden',
    },
    productImage: {
        width: '100%',
        height: undefined,
        aspectRatio: 1,
    },
    productDetails: {
        flex: 1,
        justifyContent: 'center',
    },
    productTitle: {
        color: colors.textPrimary
    },
    productPrice: {
        fontSize: 14,
        color: colors.secondary,
        marginTop: 5,
    },
});

export default styles;