export let maximalValue = 0;

const actionCredit: {
    [actionType: string]: {
        credit: number,
        maximalValue: number
    }
} = {};

const fifoQueue: string[] = [];


export const addToPipe = (newValue: string) => {
    fifoQueue.push(newValue);
};

export const removeFromPipe = () => {
    const removedAction = fifoQueue.shift();
    if (removedAction) {
        actionCredit[removedAction].credit--;
    }
    return removedAction;
};

export const setMaximalValue = (action: string, newValue: number) => {
    maximalValue = newValue;
};

export const setNewCredits = () => {
    // Random number between 0.8 and 1
    const getRandomNumber = () => {  
        return Math.floor(
          Math.random() * 3 + 8
        ) / 10;
    };
    Object.keys(actionCredit).forEach((actionType) => {
        const actionObject = actionCredit[actionType];
        actionObject.credit = actionObject.maximalValue * getRandomNumber();
    });
};