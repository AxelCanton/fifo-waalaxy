import * as cron from 'node-cron';
import { removeFromQueue, setNewCredits } from './data';

export const setCronJobs = () => {
    // runs every day at 00:00
    cron.schedule('0 0 1-31 * *', () => {
        console.log('new credits')
        setNewCredits();
    });

    cron.schedule('*/2 * * * *', () => {
        const a = removeFromQueue();
        console.log('removed: ', a);
    });
};