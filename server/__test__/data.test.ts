import { _resetData, addAction, addToQueue, getActions, getQueueContent, removeFromQueue} from '../data';

describe('queue content', () => {
    const initialActions = ['A', 'B', 'C', 'D'];
    const initialQueueContent = ['A', 'A', 'B'];
    beforeEach(() => {
        initialActions.forEach(action => addAction(action));
        initialQueueContent.forEach(action => addToQueue(action));
    });
    afterEach(() => {
        _resetData();
    })
    it('getActions returns list of actions', () => {
        const actions = getActions();
        expect(actions).toStrictEqual(initialActions);
    });
    it('addAction should add action to list', () => {
        addAction('E');
        expect(getActions()).toContain('E');
    });
    it('addToQueue should add to queue', () => {
        const newContent = ['A', 'B', 'C'];
        newContent.forEach((action) => {
            addToQueue(action);
            const queue = getQueueContent();
            expect(queue[queue.length -1]).toBe(action);
        });
    });
    it('removeFromQueue should remove from queue', () => {
        addToQueue('B')
        const queue = getQueueContent();
        removeFromQueue();
        const queueAfterRm = getQueueContent();
        queue.shift();
        expect(queueAfterRm).toStrictEqual(queue);
    });
});