import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { useDispatch } from 'react-redux';
import { setConnectionStatus } from '../actions/connectionActions';

const SplashScreen: React.FC = ({ navigation }: any) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const checkConnection = async () => {
            const state = await NetInfo.fetch();
            dispatch(setConnectionStatus(state.isConnected));
            navigation.replace(state.isConnected ? 'Home' : 'NoConnection');
        };

        checkConnection();
    }, [dispatch, navigation]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Checking Connection...</Text>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
    },
});

export default SplashScreen;
