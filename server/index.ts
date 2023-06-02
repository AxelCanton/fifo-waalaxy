import cors from 'cors';
import express, {Request, Response} from 'express';
import { addToPipe, setMaximalValue } from './data';
import { setCronJobs } from './helpers';

const app = express();
app.use(express.json());
app.use(cors());



app.post('/maximal-value', (req: Request, res: Response) => {
    const {maximalValue: maxProvided, actionType} = req.body;
    if (typeof maxProvided !== 'number' || actionType !== 'string') {
        return res.status(400).send();
    }
    setMaximalValue(actionType, maxProvided);
    return res.send();
});

app.post('/add-action', (req: Request, res: Response) => {
    const {actionType} = req.body;
    if (typeof actionType !== 'string' || actionType === '') {
        return res.status(400).send('actionType not provided or malformed');
    }
    // if (!Object.keys(actionCredit).includes(actionType)) {
    //     return res.status(400).send('actionType not available');
    // }

    addToPipe(actionType);
    return res.send();
});

app.get('/queue', (req: Request, res: Response) => {
    // return res.json({
    //     queue: fifoQueue
    // });
});

app.listen(3001, () => {
    setCronJobs();
});