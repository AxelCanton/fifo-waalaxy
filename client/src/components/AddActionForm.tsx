import './AddActionForm.css';
import { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import Title from "./Title";
import { API_URL } from "../consts";
import useNotification from "../hooks/useNotification";

type Props = {
    onSuccess: () => void
};

const AddActionForm = ({
    onSuccess
}: Props) => {
    const [name, setName] = useState('');
    const [notification, setNotification] = useNotification();

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const response = await fetch(API_URL + '/actions', {
            body: JSON.stringify({
                name
            }),
            headers: new Headers({'content-type': 'application/json'}),
            method: 'POST'
        });

        switch (response.status) {
            case 201:
                setNotification('Action créée', 'success');
                setName('');
                onSuccess();
                break;
            case 409:
                setNotification('L\'action existe déjà', 'error');
                break
            default:
                setNotification('Une erreur est survenue', 'error');
                break;
        }
    }

    return (
        <form onSubmit={(event) => onSubmit(event)} className='add-action-form-container'>
            <Title>Ajouter une action</Title>
            <div>   
                <Input value={name} inputClass='add-action-form-input-container' onChange={(newValue) => setName(newValue)}/>
                <Button label='Ajouter'/>
            </div>
            <span className={notification?.state === 'error' ? 'error-text' : 'success-text'}>
                {notification && notification.message}
            </span>
        </form>
    );
};

export default AddActionForm;