import {Pressable, Text} from "react-native";
import colors from "../config/theme";
import typography from "../config/typography";

const CCButton = ({
                      title,
                      type,
                      onPress,
                      disabled = false,
                      style = {},
                      textStyle = {}
                  }) => {
    return (
        <Pressable style={[style, {
            backgroundColor: type === 'primary' ? colors.primary : 'transparent',
            borderRadius: 10,
            paddingVertical: 8,
            alignItems: 'center',
            justifyContent: 'center',
            borderStyle: 'solid',
            borderWidth: type === 'primary' ? 0 : 1,
            borderColor: colors.primary,
            width: '100%'
        }]} onPress={onPress} disabled={disabled}>
            <Text
                style={[typography.textSemiBold1, {color: colors.textPrimary}, textStyle]}>{title}</Text>
        </Pressable>);
}
export default CCButton