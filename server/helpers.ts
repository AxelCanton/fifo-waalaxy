import * as cron from 'node-cron';
import { maximalValue, removeFromPipe, setNewCredits } from './data';

export const setCronJobs = () => {
    // runs every day at 00:00
    // cron.schedule('0 0 0 * *', () => {
        // setNewCredits();
    // });

    // cron.schedule('2 * * * *', () => {
    //     removeFromPipe();
    // });

    // cron.schedule('* * * * * *', () => {
    //     const getRandomNumber = () => {  
    //         return Math.floor(
    //           Math.random() * 3 + 8
    //         ) / 10;
    //     };
    //     console.log(getRandomNumber())
    // })
};