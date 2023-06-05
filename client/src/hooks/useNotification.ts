import { useRef, useState } from "react";

type NotificationState = 'success' | 'error';
type NotificationObject = {message: string, state: NotificationState};

const useNotification = (): [NotificationObject | null, (message: string, state: NotificationState) => void] => {
    const [notification, setNotificationState] = useState<NotificationObject | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const setNotification = (message: string, state: NotificationState) => {
        setNotificationState({
            message,
            state
        });
        const timeout = setTimeout(() => setNotificationState(null), 3000);
        if (timeoutRef.current !== null) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = timeout;
    };

    return [notification, setNotification];
};

export default useNotification;