import Constants from "expo-constants";
import colors from "../config/theme";
import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        paddingHorizontal: 15,
        backgroundColor: colors.background
    },
    cartButton: {
        position: 'absolute',
        right: 0,
        top: 0,
        backgroundColor: colors.error,
        width: 15,
        height: 15,
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',

    }
});

export default styles;