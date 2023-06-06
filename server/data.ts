type ActionData = {
    credit: number,
    maximalValue: number
}

const actionCredit: {
    [actionType: string]: ActionData
} = {};

const fifoQueue: string[] = [];

export const addAction = (action: string) => {
    if (actionCredit[action] !== undefined) {
        return false;
    }
    actionCredit[action] = {
        credit: 0,
        maximalValue: 0
    };
    return true;
};

export const addToQueue = (newValue: string) => {
    fifoQueue.push(newValue);
};

export const getActions = () => Object.keys(actionCredit);

export const getAction = (action: string): ActionData | undefined => actionCredit[action];

export const getQueueContent = () => fifoQueue;

export const removeFromQueue = () => {
    if (fifoQueue.length === 0) {
        return;
    }
    const actionToRemove = fifoQueue[fifoQueue.length - 1];
    if (actionCredit[actionToRemove].credit === 0) {
        return;
    }

    fifoQueue.shift();
    actionCredit[actionToRemove].credit--;
    return actionToRemove;
};

export const setMaximalValue = (action: string, newValue: number) => {
    if(!actionCredit[action]) {
        return;
    }
    actionCredit[action].maximalValue = newValue;
};

export const setNewCredits = () => {
    // Random number between 0.8 and 1
    const getRandomNumber = () => {  
        return Math.floor(
          Math.random() * 21 + 80
        ) / 100;
    };
    Object.keys(actionCredit).forEach((actionType) => {
        const actionObject = actionCredit[actionType];
        actionObject.credit = Math.round(actionObject.maximalValue * getRandomNumber());
    });
};

/**
 * test only
 */
export const _resetData = () => {
    for (const prop of Object.getOwnPropertyNames(actionCredit)) {
        delete actionCredit[prop];
    }
    fifoQueue.length = 0;
}