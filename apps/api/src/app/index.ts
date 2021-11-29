import * as cors from 'cors';
import * as express from 'express';
import {
	getAllReferrals,
	getReferralById,
	updateReferral,
	deleteReferral,
	createReferral
} from './referrals/api';
import { createReferralValidator } from './validators/referral';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/referrals', getAllReferrals);
app.get('/referrals/:id', getReferralById);
app.patch('/referrals/:id', createReferralValidator(), updateReferral);
app.delete('/referrals/:id', deleteReferral);
app.post('/referrals', createReferralValidator(), createReferral);

export default app;
