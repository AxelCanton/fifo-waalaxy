import express, {Request, Response} from 'express';
import { addAction, addToQueue, getActions, getAction, getQueueContent, setMaximalValue } from './data';
import { setCronJobs } from './helpers';
import cors from 'cors';

export const app = express();
app.use(express.json());
app.use(cors());

app.post('/maximal-value', (req: Request, res: Response) => {
    const {maximalValue: maxProvided, action} = req.body;
    if (typeof maxProvided !== 'number' || typeof action !== 'string') {
        return res.status(400).send();
    }
    setMaximalValue(action, maxProvided);
    return res.send();
});

app.post('/actions', (req: Request, res: Response) => {
    const {name} = req.body;
    if (typeof name !== 'string' || name === '') {
        return res.status(400).send();
    }

    const isCreated = addAction(name);
    return res.status(isCreated ? 201 : 409).send();
});

app.post('/add-to-queue', (req: Request, res: Response) => {
    const {action} = req.body;
    if (typeof action !== 'string' || action === '') {
        return res.status(400).send('action not provided or malformed');
    }
    if (!getActions().includes(action)) {
        return res.status(400).send('action not available');
    }

    addToQueue(action);
    return res.send();
});

app.get('/actions', (req: Request, res: Response) => {
    return res.json({
        actions: getActions()
    });
});

app.get('/actions/:name', (req: Request, res: Response) => {
    const {name} = req.params;

    const action = getAction(name);

    if (action) {
        return res.json({
            action
        });
    } else {
        return res.status(404).send();
    }
    
});

app.get('/queue', (req: Request, res: Response) => {
    return res.json({
        queue: getQueueContent()
    });
});

if (process.env.NODE_ENV !== 'test') {
    app.listen(3001, () => {
        setCronJobs();
    });
}
