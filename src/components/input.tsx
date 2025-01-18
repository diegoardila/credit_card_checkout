import {TextInput, StyleSheet} from "react-native";
import React from "react";
import colors from "../config/theme";

const CCInput = ({style={},value,onChangeText,keyboardType,placeholder,maxLength}) => {
    return (
        <TextInput
            style={[style,styles.input]}
            value={value}
            onChangeText={onChangeText}
            keyboardType={keyboardType}
            placeholder={placeholder}
            maxLength={maxLength}
        />
    );
}
const styles = StyleSheet.create({
    input: {
        backgroundColor: colors.textPrimary,
        color: colors.background,
        paddingHorizontal: 16,
        fontSize: 16,
        fontFamily: 'poppins-semibold',
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {width: 1, height: 3},
        shadowRadius: 4,
    },
});
export default CCInput