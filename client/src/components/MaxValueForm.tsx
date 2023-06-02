import { useEffect, useState } from "react";
import { API_URL } from "../consts";
import useNotification from "../hooks/useNotification";
import Button from "./Button";
import Input from "./Input";
import Title from "./Title";

const MaxValueForm = () => {
    const [maxValue, setMaxValue] = useState<number | null>(null);
    const [notification, setNotification] = useNotification();

    const onSubmit = async() => {
        const response = await fetch(API_URL + '/maximal-value', {
            body: JSON.stringify({
                maximalValue: maxValue
            }),
            method: 'POST'
        })
    };
    
    return (
        <>
            <Title>Valeur maximale</Title>
            <Input type='number' onChange={(newValue) => setMaxValue(parseFloat(newValue))} value={maxValue || ''}/>
            <p className={notification?.state === 'error' ? 'error-text': 'success-text'}>
                {notification && notification.message}
            </p>
            <Button disabled={maxValue === null} onPress={onSubmit} label='Envoyer'/>
        </>
    );
};

export default MaxValueForm;