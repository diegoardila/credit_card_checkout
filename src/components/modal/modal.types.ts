export interface Card {
    cardType: string;
    cardNumber: string;
    expirationDate: string;
    installments: number;
    totalAmount: number;
}
export interface CCModalProps {
    onPrimaryPress: () => void;
    onSecondaryPress: () => void;
    isModalVisible: boolean;
    toggleModal: () => void;
    card: Card;
}