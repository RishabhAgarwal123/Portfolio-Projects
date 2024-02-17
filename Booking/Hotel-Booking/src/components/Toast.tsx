import { useEffect } from "react";

type ToastProps = {
    message: string;
    type: 'SUCCESS' | 'ERROR';
    onClose: () => void;
}

const Toast = ({ message, type, onClose }: ToastProps) => {
    const style = 'fixed top-4 right-4 z-50 p-3 rounded-md mx-w-md text-white';
    const styles = type === 'SUCCESS'
        ? `${style} bg-green-600`
        : `${style} bg-red-600`;

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000);

        return () => {
            clearTimeout(timer);
        }
    }, [onClose]);

    return (
        <div className={styles}>
            <div className="flex justify-center items-center">
                <span className="text-lg font-semibold">
                    {message}
                </span>
            </div>
        </div>
    )
}

export default Toast