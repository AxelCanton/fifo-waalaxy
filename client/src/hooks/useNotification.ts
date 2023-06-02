import { useState } from "react";

type NotificationState = 'success' | 'error';
type NotificationObject = {message: string, state: NotificationState};

const useNotification = (): [NotificationObject | null, (message: string, state: NotificationState) => void] => {
    const [notification, setNotificationState] = useState<NotificationObject | null>(null);

    const setNotification = (message: string, state: NotificationState) => {
        setNotificationState({
            message,
            state
        });
    };

    return [notification, setNotification];
};

export default useNotification;