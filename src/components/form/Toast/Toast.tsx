import styles from './Toast.module.css';

interface ToastProps {
    message: string;
    type: 'error' | 'success' | 'warning' | 'info';
    onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
    const getIcon = () => {
        switch (type) {
            case 'error': return '❌';
            case 'success': return '✅';
            case 'warning': return '⚠️';
            case 'info': return 'ℹ️';
            default: return '❌';
        }
    };

    return (
        <div className={`${styles.toast} ${styles[`toast--${type}`]}`}>
            <span className={styles.toast__icon}>{getIcon()}</span>
            <span className={styles.toast__message}>{message}</span>
            <button className={styles.toast__close} onClick={onClose}>
                ×
            </button>
        </div>
    );
}