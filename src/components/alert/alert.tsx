// AlertContext.tsx
import React, {createContext, useState, useContext, ReactNode} from 'react';
import {Text, TouchableOpacity, Animated} from 'react-native';
import {AntDesign} from "@expo/vector-icons";
import styles from "./alert.styles";
import {Alert, AlertContextType} from "./alert.types";

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
                        name={alert.type === 'success' ?
                            "checkcircle" : alert.type === 'error' ?
                                "closecircle" : "infocirlce"}
                        size={24} color={iconColors[alert.type]}/>
                    <Text style={styles.alertText}>{alert.message}</Text>
                    <TouchableOpacity onPress={hideAlert}>
                        <AntDesign name="close" size={16} color="black"/>
                    </TouchableOpacity>
                </Animated.View>
            )}
        </AlertContext.Provider>
    );
};


