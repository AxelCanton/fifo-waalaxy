import request from 'supertest';
import { app } from '..';
import { _resetData } from '../data';

describe('/POST actions', () => {
    afterEach(() => {
        _resetData();
    });

    it('malformed body', async () => {
        const responses = await Promise.all([
            request(app).post('/actions').send({name: 5}),
            request(app).post('/actions').send('B'),
            request(app).post('/actions').send({whatever: 'abc'})
        ]);
        responses.forEach(response => expect(response.status).toBe(400));
    });

    it('good request', async () => {
        const responses = await Promise.all([
            request(app).post('/actions').send({name: 'A'}),
            request(app).post('/actions').send({name: 'dcf'}),
            request(app).post('/actions').send({name: 'OK'})
        ]);

        responses.forEach(response => expect(response.status).toBe(201));
    });

});

describe('/POST maximal-value', () => {
    beforeEach(async () => {
        await request(app).post('/actions').send({name: 'A'});
        await request(app).post('/actions').send({name: 'B'});
        await request(app).post('/actions').send({name: 'C'});
    });
    afterEach(() => {
        _resetData();
    });
    it('malformed body', async () => {
        const responses = await Promise.all([
            request(app).post('/maximal-value').send({maximalValue: 39}),
            request(app).post('/maximal-value').send({actionType: 'A'}),
            request(app).post('/maximal-value').send({maximalValue: 'abc', actionType: 'B'}),
            request(app).post('/maximal-value').send({maximalValue: 50, actionType: true})
        ]);
        responses.forEach(response => expect(response.status).toBe(400));
    });
    it('good request', async () => {
        const responses = await Promise.all([
            request(app).post('/maximal-value').send({maximalValue: 5, actionType: 'B'}),
            request(app).post('/maximal-value').send({maximalValue: 0, actionType: 'A'}),
            request(app).post('/maximal-value').send({maximalValue: 100000, actionType: 'C'})
        ]);

        responses.forEach(response => expect(response.status).toBe(200));
    });
});

describe('/POST add-to-queue', () => {
    beforeEach(async () => {
        await request(app).post('/actions').send({name: 'A'});
        await request(app).post('/actions').send({name: 'B'});
        await request(app).post('/actions').send({name: 'C'});
    });
    afterEach(() => {
        _resetData();
    })

    it('malformed body', async () => {
        const responses = await Promise.all([
            request(app).post('/add-to-queue').send({whatever: 'B'}),
            request(app).post('/add-to-queue').send('A'),
            request(app).post('/add-to-queue').send({action: 5})
        ]);
        responses.forEach(response => expect(response.status).toBe(400));
    });
    it('action not available', async () => {
        const response = await request(app).post('/add-to-queue').send({action: 'Z'});
        expect(response.status).toBe(400);
    });
    it('good request', async () => {
        const responses = await Promise.all([
            request(app).post('/add-to-queue').send({action: 'B'}),
            request(app).post('/add-to-queue').send({action: 'A'}),
            request(app).post('/add-to-queue').send({action: 'C'})
        ]);

        responses.forEach(response => expect(response.status).toBe(200));
    });
});