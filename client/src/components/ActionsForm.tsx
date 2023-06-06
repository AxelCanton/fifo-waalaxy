import './ActionsForm.css';
import { useEffect, useRef, useState } from "react";
import Title from "./Title";
import Select from 'react-select';
import { API_URL } from "../consts";
import Input from "./Input";
import Button from "./Button";
import useNotification from '../hooks/useNotification';
import AddActionForm from './AddActionForm';

type Props = {
    reloadQueue: () => void
}

const ActionsForm = ({
    reloadQueue
}: Props) => {
    const [actions, setActions] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAction, setSelectedAction] = useState('');
    const [maxValue, setMaxValue] = useState<number | null>(null);
    const [credit, setCredit] = useState(0);
    const [initialMaxValue, setInitialMaxValue] = useState(0);
    const [notification, setNotification] = useNotification();
    const intervalIdRef = useRef<NodeJS.Timer | null>();

    const fetchActions = async () => {
        const response = await fetch(API_URL + '/actions');
        const formattedResponse = await response.json();
        if (Array.isArray(formattedResponse?.actions)) {
            setActions(formattedResponse.actions);
        }
        setIsLoading(false);
    };

    const fetchAction = async (action: string) => {
        const response = await fetch(API_URL + `/actions/${action}`);
        const formattedResponse = await response.json();
        if (typeof formattedResponse?.action === 'object') {
            setMaxValue(formattedResponse.action.maximalValue);
            setInitialMaxValue(formattedResponse.action.maximalValue);
            setCredit(formattedResponse.action.credit);
        }
    };
    
    const onPushQueue = async (action: string) => {
        const response = await fetch(API_URL + '/add-to-queue', {
            body: JSON.stringify({
                action: action
            }),
            headers: new Headers({'content-type': 'application/json'}),
            method: 'POST'
        });

        if (response.status === 200) {
            setNotification('Action ajoutée à la queue', 'success');
            reloadQueue();
        } else {
            setNotification('Une erreur est survenue', 'error');
        }
    };

    const onSubmitMaximalValue = async (event: React.FormEvent<HTMLFormElement>, value: number | null, action: string) => {
        event.preventDefault();
        if (value === null) {
            return;
        }
        const response = await fetch(API_URL + '/maximal-value', {
            body: JSON.stringify({
                action: action,
                maximalValue: value
            }),
            headers: new Headers({'content-type': 'application/json'}),
            method: 'POST'
        });

        if (response.status === 200) {
            setNotification('Valeur maximale modifiée', 'success');
        } else {
            setNotification('Une erreur est survenue', 'error');
        }
    };

    useEffect(() => {
        fetchActions();
    }, []);

    useEffect(() => {
        if (selectedAction) {
            setMaxValue(null);
            if (intervalIdRef.current) {
                clearInterval(intervalIdRef.current)
            }
            fetchAction(selectedAction);
            intervalIdRef.current = setInterval(() => fetchAction(selectedAction), 120000);
        }
    }, [selectedAction])

    return (
        <>
            <AddActionForm onSuccess={fetchActions}/>
            <Title>Actions</Title>
            <Select
                isLoading={isLoading}
                isDisabled={isLoading}
                onChange={(newValue) => setSelectedAction(newValue ? newValue.value : '')}
                options={actions.map(action => ({value: action, label: action}))}
                placeholder='Choisissez une option...'
            />
            {selectedAction && (
                <>
                    <p>Nombre de crédit : {credit}</p>
                    <div className='actions-form-container'>
                        <form
                            onSubmit={(event) => onSubmitMaximalValue(event, maxValue, selectedAction)}
                            className='actions-form-maximal-value'
                        >
                            <h3>Valeur maximale</h3>
                            <div className='actions-form-maximal-value-inner-container'>
                                    <Input 
                                        inputClass='actions-form-maximal-value-input'
                                        value={maxValue}
                                        onChange={(newValue) => {
                                            const parsedValue = parseFloat(newValue);
                                            setMaxValue(Number.isNaN(parsedValue) ? null : parsedValue);
                                        }}
                                    />
                                    <Button
                                        disabled={maxValue === null || maxValue === initialMaxValue}
                                        Icon={<img src='refresh.svg'
                                        className='actions-form-refresh-icon'/>}
                                    />
                            </div>
                        </form>
                        <div className='actions-form-push-queue'>
                            <Button label='Ajout queue' onPress={() => onPushQueue(selectedAction)}/>
                        </div>
                    </div>
                    <span className={notification?.state === 'error' ? 'error-text': 'success-text'}>
                            {notification && notification.message}
                    </span>
                </>
            )}
        </>
    );
};

export default ActionsForm;