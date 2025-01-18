import React, {useState} from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    Text,
    Image,
    Button,
    Modal, TouchableOpacity, ScrollView
} from 'react-native';
import colors from "../config/theme";
import CCInput from "../components/input";
import CCButton from "../components/button";

const CARD_ICONS: Record<string, any> = {
    visa: require('../../assets/visa.png'),
    mastercard: require('../../assets/mastercard.png'),
    amex: require('../../assets/amex.png'),
};

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


interface CardScreenProps {
    route: {
        params: {
            totalAmount: number
        };
    };
}


const AddCardScreen: React.FC<CardScreenProps> = ({route}) => {
    const [cardNumber, setCardNumber] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [cvv, setCvvValue] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const {totalAmount} = route.params;

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
            <Text style={styles.total}>Total Amount:
                ${totalAmount.toFixed(2)}</Text>
            <CCButton
                title="Complete payment with card data" type='primary'
                onPress={toggleModal}/>
            <Modal
                animationType="fade"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={toggleModal}
            >
                <View style={styles.modalBackdrop}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Payment Summary</Text>
                        <Text style={styles.modalText}>Card
                            Type: {cardType.replace(/^\w/, (c) => c.toUpperCase()) || 'N/A'}</Text>
                        <Text style={styles.modalText}>Card
                            Number: {cardNumber}</Text>
                        <Text style={styles.modalText}>Expiration
                            Date: {expirationDate}</Text>
                        <Text style={styles.modalText}>
                            Total Amount: ${totalAmount.toFixed(2)}
                        </Text>
                        <View style={{
                            flexDirection: 'row',
                            gap: 10,
                            marginTop: 20,
                            paddingHorizontal: 20,
                            paddingBottom: 20
                        }}>
                            <CCButton type='secondary' style={{flex: 1}}
                                      textStyle={{color: colors.primary}}
                                      title="Close" onPress={toggleModal}/>
                            <CCButton type='primary' style={{flex: 1}}
                                      title="Pay" onPress={toggleModal}/>
                        </View>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 16,
        backgroundColor: colors.background,
    },
    label: {
        fontFamily: 'poppins-semibold',
        color: colors.textPrimary,
        marginBottom: 8,
    },
    total: {
        fontFamily: 'poppins-semibold',
        color: colors.secondary,
        fontSize: 18,
        paddingBottom: 16,
        textAlign: 'center',
    },
    cardIcon: {
        width: 40,
        height: 25,
        marginLeft: 8,
        position: 'absolute',
        right: 8,
        top: 12,
    },
    cardInputContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    modalBackdrop: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 8,
        alignItems: 'center',
        overflow: 'hidden',
    },
    modalTitle: {
        width: '100%',
        padding: 20,
        textAlign: 'center',
        backgroundColor: colors.primary,
        color: colors.textPrimary,
        fontFamily: 'poppins-semibold',
        fontSize: 18,
        marginBottom: 20,
        elevation: 3,
    },
    modalText: {
        fontFamily: 'poppins-regular',
        fontSize: 14,
        marginBottom: 8,
    },
    closeButton: {
        flex: 1,
        backgroundColor: '#ff4444',
        padding: 10,
        borderRadius: 8,
        marginTop: 20,
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default AddCardScreen;