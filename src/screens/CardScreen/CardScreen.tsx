import React, {useState} from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    Pressable
} from 'react-native';
import CCInput from "../../components/input/input";
import CCButton from "../../components/button/button";
import CCNumberSelector from "../../components/numberSelector/numberSelector";
import {useAlert} from "../../components/alert/alert";
import {Entypo} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {encodeJWT} from "../../utils/jwt";
import SplashScreen from "../SplashScreen/SplashScreen";
import {useDispatch} from "react-redux";
import {clearCart} from "../../reducers/cart";
import CCModal from "../../components/modal/modal";
import styles from "./CardScreen.styles";
import {CardScreenProps} from "./CardScreen.types";

const CARD_ICONS: Record<string, any> = {
    visa: require('../../../assets/visa.png'),
    mastercard: require('../../../assets/mastercard.png'),
    amex: require('../../../assets/amex.png'),
};

const AddCardScreen: React.FC<CardScreenProps> = ({route, navigation}: any) => {
    const [cardNumber, setCardNumber] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [cvv, setCvvValue] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [installments, setInstallments] = useState(1);
    const {totalAmount} = route.params;
    const [response, setSelection] = useState(false);
    const [loading, setLoading] = useState(false);
    const CARD_KEY = 'credit_card';
    const {showAlert} = useAlert();
    const dispatch = useDispatch();

    const getCardType = (cardNumber: string) => {
        if (/^4[0-9]{0,}$/.test(cardNumber)) return 'visa';
        if (/^5[1-5][0-9]{0,}$/.test(cardNumber)) return 'mastercard';
        if (/^3[47][0-9]{0,}$/.test(cardNumber)) return 'amex';
        return '';
    };

    const formatCardNumber = (value: string) => {
        return value
            .replace(/\D/g, '')
            .replace(/(.{4})/g, '$1 ')
            .trim()
            .slice(0, 19);
    };

    const cardType = getCardType(cardNumber.replace(/\s/g, ''));

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const formatExpirationDate = (value: string) => {
        if (expirationDate.length < value.length) {
            setExpirationDate(value
                .replace(/\D/g, '')
                .replace(/^(\d{2})(\d{0,2})$/, '$1/$2')
                .slice(0, 5));
        } else {
            setExpirationDate(value);
        }
    };

    const validateForm = (type: string) => {
        if (cardType !== "" && cardNumber.length === 19 && expirationDate.length === 5 && cvv.length === 3) {
            const expirationDateSplitted = expirationDate.split('/');
            if (parseInt(expirationDateSplitted[1]) >= new Date().getFullYear() % 100
                && parseInt(expirationDateSplitted[0]) > 0
                && parseInt(expirationDateSplitted[0]) <= 12) {
                if (type === 'modal') {
                    toggleModal();
                } else {
                    saveCard();
                }
            } else {
                showAlert({
                    message: "Please check the expiration date",
                    type: "error"
                });
            }
        } else {
            showAlert({
                message: "Please check the card information",
                type: "error"
            });
        }
    }
    const saveCard = async () => {
        setLoading(true);
        try {
            if (!response) {
                await fetch('https://www.google.com');
                await AsyncStorage.setItem(CARD_KEY, encodeJWT(JSON.stringify({
                    cardNumber: cardNumber,
                    expirationDate: expirationDate,
                    cvv: cvv,
                    installments: installments
                })));
                toggleModal();
                dispatch(clearCart());
                showAlert({
                    message: "Credit card saved successfully",
                    type: "success"
                });
                navigation.replace('Home');
            } else {
                throw new Error("This is a test error");
            }
        } catch (error) {
            toggleModal();
            showAlert({
                message: "Error validating credit card " + error,
                type: "error"
            });
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <SplashScreen/>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.label}>Card Number</Text>
            <View style={styles.cardInputContainer}>
                <CCInput
                    value={cardNumber}
                    onChangeText={(text) => setCardNumber(formatCardNumber(text))}
                    keyboardType="numeric"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                />
                {cardType && (
                    <Image source={CARD_ICONS[cardType]}
                           style={styles.cardIcon}/>
                )}
            </View>

            <Text style={styles.label}>Expiration Date</Text>
            <CCInput
                value={expirationDate}
                onChangeText={(text) => formatExpirationDate(text)}
                keyboardType="numeric"
                placeholder="MM/YY"
                maxLength={5}
            />
            <Text style={styles.label}>CVV</Text>
            <CCInput
                value={cvv}
                onChangeText={(text) => setCvvValue(text)}
                keyboardType="numeric"
                placeholder="123"
                maxLength={3}
            />
            <Text style={styles.label}>Installments</Text>
            <CCNumberSelector value={installments}
                              onChangeValue={setInstallments}/>
            <Text style={styles.total}>Total Amount:
                ${totalAmount.toFixed(2)}</Text>
            <View style={styles.checkboxContainer}>
                <Pressable
                    onPress={() => setSelection(!response)}
                    style={[styles.checkbox, response ? styles.checked : styles.unchecked]}>
                    {response && <Entypo name="check" size={14} color="white"/>}
                </Pressable>
                <Text style={styles.label}>Activate unsuccessful payment</Text>
            </View>
            <CCButton
                title="Complete payment with card data" type='primary'
                onPress={() => validateForm('modal')}/>
            <CCModal onPrimaryPress={() => validateForm('')}
                     onSecondaryPress={toggleModal}
                     isModalVisible={isModalVisible} toggleModal={toggleModal}
                     card={{
                         cardNumber: cardNumber,
                         expirationDate: expirationDate,
                         installments: installments,
                         cardType: cardType,
                         totalAmount: totalAmount
                     }}/>
        </ScrollView>
    );
};
export default AddCardScreen;