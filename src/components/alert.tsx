// AlertContext.tsx
import React, {createContext, useState, useContext, ReactNode} from 'react';
import {Text, StyleSheet, TouchableOpacity, Animated} from 'react-native';
import colors from "../config/theme";
import {AntDesign} from "@expo/vector-icons";

type Alert = {
    message: string;
    type?: 'success' | 'error' | 'info';
    duration?: number;
};

type AlertContextType = {
    showAlert: (alert: Alert) => void;
};

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlert = () => {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error('useAlert must be used within an AlertProvider');
    }
    return context;
};

export const AlertProvider = ({children}: { children: ReactNode }) => {
    const [alert, setAlert] = useState<Alert | null>(null);
    const [fadeAnim] = useState(new Animated.Value(0));
    const iconColors = {
        success: 'mediumseagreen',
        error: 'crimson',
        info: 'cornflowerblue',
    }

    const showAlert = ({message, type = 'info', duration = 3000}: Alert) => {
        setAlert({message, type, duration});

        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();

        if (duration > 0) {
            setTimeout(() => {
                hideAlert();
            }, duration);
        }
    };

    const hideAlert = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            setAlert(null);
        });
    };

    return (
        <AlertContext.Provider value={{showAlert}}>
            {children}
            {alert && (
                <Animated.View
                    style={[
                        styles.alertContainer,
                        {opacity: fadeAnim},
                    ]}>
                    <AntDesign
                        name={alert.type === 'success' ? "checkcircle" : alert.type === 'error' ? "closecircle" : "infocirlce"}
                        size={24} color={iconColors[alert.type]}/>
                    <Text style={styles.alertText}>{alert.message}</Text>
                    <TouchableOpacity onPress={hideAlert}>
                        <AntDesign name="close" size={16} color="black" />
                    </TouchableOpacity>
                </Animated.View>
            )}
        </AlertContext.Provider>
    );
};

const styles = StyleSheet.create({
    alertContainer: {
        position: 'absolute',
        top: 50,
        left: 20,
        right: 20,
        padding: 15,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 10,
        justifyContent: 'space-between',
        backgroundColor: colors.textPrimary,
        zIndex: 1000,
    },
    alertText: {
        flex: 1,
        color: colors.background,
        fontFamily: 'poppins-medium',
        fontSize: 16,
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    /*success: {
        backgroundColor: 'green',
    },
    error: {
        backgroundColor: 'red',
    },
    info: {
        backgroundColor: 'blue',
    },*/
});
