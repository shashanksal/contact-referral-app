import React from 'react';
import { ReactComponent as BrandLogo } from '../assets/logo.svg';
import style from './App.module.css';
import { ReferralList } from './pages/ReferralList';
import { ReferralProvider } from './context/ReferralContext';

export const App = () => {
	return (
		<div className={style.container}>
			<div className={style.header}>
				<BrandLogo className={style.logo} />
			</div>
			<ReferralProvider>
				<div className={style.listItem}>
					<ReferralList />
				</div>
			</ReferralProvider>
		</div>
	);
};

export default App;
