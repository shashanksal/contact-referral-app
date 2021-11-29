import React, { useEffect, useState, useContext } from 'react';
import { ReferralTable } from '../../components/ReferralTable';
import { Referral, Referrals } from '../../types/referral';
import style from './ReferralList.module.css';

import requestController from '../../controller/requestController';
import { REFERRALS_URL } from '../../utils/constants';

import { ReferralContext } from '../../context/ReferralContext';

const ReferralList: React.FC = () => {
	const [referrals, setReferrals] = useState<Referrals | []>([]);
	const { refreshCount } = useContext(ReferralContext);

	useEffect(() => {
		(async () => {
			const { response } = await requestController.makeRequest(
				REFERRALS_URL,
				'GET',
				null
			);
			setReferrals(response);
		})();
	}, [refreshCount]);

	return (
		<div className={style.frame}>
			<ReferralTable referrals={referrals} />
		</div>
	);
};

export { ReferralList };
