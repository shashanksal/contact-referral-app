import * as request from 'supertest';
import app from '../';

describe('Referrals API', () => {
	describe('Given getAllReferrals endpoint is called', () => {
		it('should return all referrals as array', async () => {
			const result = await request(app).get('/referrals');

			expect(result.status).toEqual(200);
			console.log('Length ===', result.body.length);
			expect(Array.isArray(result.body)).toBe(true);
		});
	});

	describe('Given getReferralById endpoint is called with id', () => {
		describe('When id is valid', () => {
			const id = 1;
			it('Should return refereal having the passed id', async () => {
				const result = await request(app).get(`/referrals/${id}`);
				expect(result.status).toEqual(200);
				expect(result.body.id).toBe(id);
			});
		});

		describe('When id is invalid', () => {
			const id = 'some-fake-id';
			it('Should return a server error', async () => {
				const result = await request(app).get(`/referrals/${id}`);
				expect(result.status).toEqual(500);
				expect(result.body).toStrictEqual({
					code: 500,
					message: `Error fetching referral with id: ${id}`
				});
			});
		});
	});

	describe('Given updateReferral endpoint is called with id', () => {
		describe('When id is valid', () => {
			const id = 1;
			it('Should return updated refereal having the passed id', async () => {
				const result = await request(app).patch(`/referrals/${id}`);
				expect(result.status).toEqual(200);
				expect(result.body.id).toBe(id);
			});
		});

		describe('When id is invalid', () => {
			const id = 'some-fake-id';
			it('Should return a server error', async () => {
				const result = await request(app).patch(`/referrals/${id}`);
				expect(result.status).toEqual(500);
				expect(result.body).toStrictEqual({
					code: 500,
					message: `Error updating referral with id: ${id}`
				});
			});
		});
	});

	describe('Given createReferral endpoint is called', () => {
		//TODO: Update post test
		describe('When data paramater is invalid', () => {
			it('Should return a server error', async () => {
				const result = await request(app).post(`/referrals`);
				expect(result.status).toEqual(500);
				expect(result.body).toStrictEqual({
					code: 500,
					message: `Error creating new referral`
				});
			});
		});
	});

	describe('Given deleteReferral endpoint is called with id', () => {
		beforeEach(async () => {
			const id = 100;
			const query = {
				id,
				givenName: 'some-name'
			};
			await request(app)
				.post('/referrals')
				.send(query)
				.set('Accept', 'application/json');
		});
		describe('When id is invalid', () => {
			const id = 'some-fake-id';
			it('Should return a server error', async () => {
				const result = await request(app).delete(`/referrals/${id}`);
				expect(result.status).toEqual(500);
				expect(result.body).toStrictEqual({
					code: 500,
					message: `Error deleting referral with id: ${id}`
				});
			});
		});
	});
});
