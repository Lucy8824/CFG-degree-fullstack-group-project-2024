const request = require('supertest');
const axios = require('axios');
const app = require('../index');
// require('dotenv').config({ path: '.env'});

jest.mock('axios');


describe('GET /api/festivals/user/:id', () => {
    it('should return festivals data successfully', async () => {
        const mockData = {
            _embedded: {
                events: [
                    { id: '1', name: 'Festival 1' },
                    { id: '2', name: 'Festival 2' }
                ]
            }
        };

        axios.get.mockResolvedValue({ data: mockData });

        const response = await request(app)
            .get('/api/festivals/user/1')
            .query({ page: 0 });

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockData);
        expect(axios.get).toHaveBeenCalledWith(
            'https://app.ticketmaster.com/discovery/v2/events.json',
            expect.objectContaining({
                params: {
                    classificationName: 'Festival',
                    size: 200,
                    page: '0',
                    apikey: process.env.TICKETMASTER_API_KEY
                }
            })
        );
    });

    it('should handle errors from the Ticketmaster API', async () => {
        axios.get.mockRejectedValue(new Error('Network Error'));

        const response = await request(app)
            .get('/api/festivals/user/1')
            .query({ page: 0 });

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ message: 'Error fetching festivals' });
    });
});