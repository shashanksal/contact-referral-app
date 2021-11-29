import { getByText, render, waitFor, fireEvent } from '@testing-library/react';
import React from 'react';
import { Referral } from '../../types/referral';
import ModalComponent from './ModalComponent';

describe('ModalComponent', () => {
	const testReferrals: Referral[] = [
		{
			id: 1,
			givenName: 'John',
			surName: 'Doe',
			phone: '0456 123123',
			email: 'testing@brighte.com.au'
		}
	];

	const testData = {
		id: 1,
		givenName: 'John',
		surName: 'Doe',
		phone: '0456 123123',
		email: 'testing@brighte.com.au'
	};

	it('should render title correctly', async () => {
		const { baseElement } = render(<ModalComponent referral={testData} />);
		await waitFor(() => baseElement.querySelector('.dialog-title'));
	});

	it('should render buttons correctly', async () => {
		const { baseElement } = render(<ModalComponent referral={testData} />);
		await waitFor(() => baseElement.querySelector('.create-btn'));
		await waitFor(() => baseElement.querySelector('.cancel-btn'));
	});
});
