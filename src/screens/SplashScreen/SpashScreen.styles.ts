import {StyleSheet} from "react-native";
import colors from "../../config/theme";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center'
    },
    row: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'center',
    },
    curtain: {
        position: 'absolute',
        width: 250,
        height: '100%',
        backgroundColor: colors.background,
        zIndex: 2
    },
    icon: {
        position: 'absolute',
        top: 7,
        zIndex: 3,
    },
    title: {
        color: colors.textPrimary,
    }
});

export default styles;