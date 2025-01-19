import {Pressable, Text, View, StyleSheet} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import typography from "../../config/typography";
import React, {useState} from "react";
import styles from "./numberSelector.styles";

const CCNumberSelector = ({
                              style = {},
                              value,
                              onChangeValue,
                          }) => {
    const [qty, setQty] = useState(value);
    const handleValueChange = (value: number) => {
        if(value <= 0) return;
        onChangeValue(value);
        setQty(value);
    }
    return (
        <View style={[style, styles.qtyContainer]}>
            <Pressable style={[styles.qtyButton, styles.minus,qty <= 1 && styles.disabled,]}
                       onPress={() => {
                           handleValueChange(qty - 1);
                       }} disabled={qty <= 1}>
                <AntDesign name="minuscircle" size={18} color="white"/>
            </Pressable>
            <View style={styles.qtyValueContainer}>
                <Text
                    style={[typography.textSemiBold1, styles.qty]}>{qty}</Text>
            </View>
            <Pressable style={[styles.qtyButton, styles.plus]}
                       onPress={() => {
                           handleValueChange(qty + 1);
                       }}>
                <AntDesign name="pluscircle" size={18} color="white"/>
            </Pressable>
        </View>
    );
}


export default CCNumberSelector