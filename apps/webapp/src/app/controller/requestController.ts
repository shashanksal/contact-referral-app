import { Referral, Referrals } from '../types/referral';

export interface Params {
	signal: AbortSignal;
	method: string;
	headers: HeadersInit;
	body?: string;
}

/**
 * Create  request and make Fetch Call
 * @param url {string} HTTP url for making request
 * @param method {string} HTTP request type GET | POST | PATCH | DELETE
 * @param data {Object} body param object for POST request
 */
const makeRequest = async (url: string, method: string, data: Referral) => {
	//AbortController for Timeout fetch request safely
	const controller = new AbortController();
	const params = createParams(method, data);
	const config = { ...params, signal: controller.signal };

	setTimeout(() => {
		controller.abort();
	}, 20000);

	try {
		return await makeFetchCall(url, config);
	} catch (err) {
		if (err.name === 'AbortError') {
			return {
				error: true,
				response: {
					Message: err
				}
			};
		}
	}
};

/**
 * Create header params
 * @param method {string} HTTP request type GET | POST | PUT | DELETE
 * @param data {Referral} body param object for POST and Patch request
 */
const createParams = (method: string, data: Referral) => {
	const params = {
		method: method,
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*'
		},
		body: ''
	};
	//Stringify data only if data present -> eg. POST request
	if (data) params.body = JSON.stringify(data);
	else delete params.body;

	return params;
};

/**
 * Make call using Fetch API
 * @param url {string} HTTP url for making request
 * @param config Params object
 */
const makeFetchCall = async (url: string, config: Params) => {
	const referrals = [] as Referrals;
	const obj = {
		error: false,
		response: referrals
	};
	try {
		const request = await fetch(url, config);
		if (request?.status === 200) {
			const response = await request.json();
			obj.response = response;
		} else {
			obj.error = true;
		}
	} catch (err) {
		obj.error = true;
		obj.response = err;
	}
	return obj;
};

export default {
	makeRequest
};
