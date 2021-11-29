export interface Referral {
	id?: number;
	givenName: string;
	surName: string;
	email: string;
	phone: string;
}

export type Referrals = Array<Referral>;
