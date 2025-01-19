import {Modal, StyleSheet, Text, View} from "react-native";
import CCButton from "../button/button";
import colors from "../../config/theme";
import React from "react";
import {Card, CCModalProps} from "./modal.types";
import styles from "./modal.styles";

const CCModal:React.FC<CCModalProps> = ({onPrimaryPress, onSecondaryPress, isModalVisible, toggleModal, card}) => {
    return(<Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}>
        <View style={styles.modalBackdrop}>
            <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Payment
                    Summary</Text>
                <Text style={styles.modalText}>Card
                    Type: {card.cardType.replace(/^\w/, (c) => c.toUpperCase()) || 'N/A'}</Text>
                <Text style={styles.modalText}>Card
                    Number: {card.cardNumber}</Text>
                <Text style={styles.modalText}>Expiration
                    Date: {card.expirationDate}</Text>
                <Text
                    style={styles.modalText}>Installments: {card.installments}</Text>
                <Text style={styles.modalText}>
                    Total Amount: ${card.totalAmount.toFixed(2)}
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
                              title="Close" onPress={onSecondaryPress}/>
                    <CCButton type='primary' style={{flex: 1}}
                              title="Pay"
                              onPress={onPrimaryPress}/>
                </View>
            </View>
        </View>
    </Modal>
    );
}

export default CCModal;