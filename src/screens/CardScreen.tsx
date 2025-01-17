import React, {useState} from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    Text,
    Image,
    Button,
    Modal, TouchableOpacity
} from 'react-native';

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
        <View style={styles.container}>
            <Text style={styles.label}>Total Amount:
                ${totalAmount.toFixed(2)}</Text>

            <Text style={styles.label}>Card Number</Text>
            <View style={styles.cardInputContainer}>
                <TextInput
                    style={styles.input}
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
            <TextInput
                style={styles.input}
                value={expirationDate}
                onChangeText={(text) => formatExpirationDate(text)}
                keyboardType="numeric"
                placeholder="MM/YY"
                maxLength={5}
            />
            <Text style={styles.label}>CVV</Text>
            <TextInput
                style={styles.input}
                value={cvv}
                onChangeText={(text) => setCvvValue(text)}
                keyboardType="numeric"
                placeholder="123"
                maxLength={3}
            />
            <Button
                title="Complete payment with card data" onPress={toggleModal}/>
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
                        <View style={{flexDirection: 'row', gap: 10}}>
                            <TouchableOpacity style={styles.closeButton}
                                              onPress={toggleModal}>
                                <Text
                                    style={styles.closeButtonText}>Close</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.closeButton}
                                              onPress={toggleModal}>
                                <Text style={styles.closeButtonText}>Pay</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        fontSize: 16,
        marginBottom: 16,
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
        padding: 20,
        borderRadius: 8,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 10,
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