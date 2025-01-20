import React, {useEffect, useRef} from 'react';
import {
    View,
    Text,
    Animated,
    Easing
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {useDispatch} from 'react-redux';
import {setConnectionStatus} from '../../actions/connectionActions';
import {useFonts} from "expo-font";
import typography from "../../config/typography";
import {FontAwesome} from "@expo/vector-icons";
import styles from "./SpashScreen.styles";

const SplashScreen: React.FC = ({navigation}: any) => {
    // Loading custom fonts
    const [fontsLoaded] = useFonts({
        'poppins-regular': require('../../../assets/fonts/Poppins-Regular.ttf'),
        'poppins-medium': require('../../../assets/fonts/Poppins-Medium.ttf'),
        'poppins-bold': require('../../../assets/fonts/Poppins-Bold.ttf'),
        'poppins-semibold': require('../../../assets/fonts/Poppins-SemiBold.ttf'),
        'poppins-black': require('../../../assets/fonts/Poppins-Black.ttf'),
        'poppins-italic': require('../../../assets/fonts/Poppins-Italic.ttf'),
    });
    // Getting the dispatch function to send actions to the Redux store
    const dispatch = useDispatch();
    // Animated values for the curtain and icon animations
    const positionCurtain = useRef(new Animated.Value(200)).current;
    const positionIcon = useRef(new Animated.Value(-36)).current;
    // Utility function to add a delay
    const delay =
        (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    // Effect to animate the curtain movement
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(positionCurtain, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: false,
                    easing: Easing.out(Easing.ease),
                }),
                Animated.timing(positionCurtain, {
                    toValue: 130,
                    duration: 1000,
                    useNativeDriver: false
                }),
            ])
        ).start();
    }, [positionCurtain]);

    // Effect to animate the icon movement
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(positionIcon, {
                    toValue: 150,
                    delay: 350,
                    duration: 650,
                    useNativeDriver: false,
                    easing: Easing.out(Easing.ease),
                }),
                Animated.timing(positionIcon, {
                    toValue: -36,
                    duration: 1000,
                    useNativeDriver: false,
                    easing: Easing.out(Easing.ease),
                }),
            ])).start();

    }, [positionIcon]);

    // Effect to check the network connection and navigate accordingly
    useEffect(() => {
        const checkConnection = async () => {
            const state = await NetInfo.fetch();
            await delay(2000);
            dispatch(setConnectionStatus(state.isConnected));
            navigation.replace(state.isConnected ? 'Home' : 'NoConnection');
        };
        if (fontsLoaded) {
            checkConnection();
        }
    }, [fontsLoaded, dispatch, navigation]);

    return (
        <View
            style={styles.container}>
            <View style={styles.row}>
                <Animated.View
                    style={[styles.curtain, {right: positionCurtain}]}></Animated.View>
                <Animated.View style={[styles.icon, {left: positionIcon}]}>
                    <FontAwesome
                        name="credit-card-alt"
                        size={24} color="white"/>
                </Animated.View>
                <Text
                    style={[typography.textBlack2, styles.title]}>CreditCard</Text>
            </View>
        </View>
    );
};

export default SplashScreen;
