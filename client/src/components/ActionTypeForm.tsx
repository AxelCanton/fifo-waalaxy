import './ActionTypeForm.css';
import { useState } from "react";
import { API_URL } from "../consts";
import Button from "./Button";
import Input from './Input';
import Title from './Title';
import useNotification from '../hooks/useNotification';

const ActionTypeForm = () => {
    const [actionType, setActionType] = useState('');
    const [notification, setNotification] = useNotification();
    
    const onSubmit = async () => {
        const response = await fetch(API_URL + '/add-action', {
            body: JSON.stringify({
                actionType
            }),
            method: 'POST'
        });

        if (response.status === 400) {
            setNotification('Mauvais type d\'action', 'error')
        }
    };

    return (
        <>
            <Title>Ajout à la queue</Title>
            <Input onChange={(newValue) => setActionType(newValue)}/>
            <p className={notification?.state === 'error' ? 'error-text': 'success-text'}>
                {notification && notification.message}
            </p>
            <Button disabled={actionType === ''} label='Ajouter' onPress={onSubmit}/>
        </>
    );
};

export default ActionTypeForm;