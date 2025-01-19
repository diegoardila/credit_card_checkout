export type Alert = {
    message: string;
    type?: 'success' | 'error' | 'info';
    duration?: number;
};

export type AlertContextType = {
    showAlert: (alert: Alert) => void;
};
