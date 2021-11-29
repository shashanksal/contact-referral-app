/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useState, Dispatch, SetStateAction } from 'react';

type Props = {
	children: JSX.Element | JSX.Element[];
};

const initialContext = {
	refreshCount: 0,
	modalState: false,
	editState: false,
	plusCount: () => {},
	openModal: () => {},
	updateEdit: () => {}
};

const ReferralContext = createContext(initialContext);

const ReferralProvider = ({ children }: Props): JSX.Element => {
	const [refreshCount, setRefreshCount] = useState(0);
	const [modalState, setModalState] = useState(false);
	const [editState, setEditState] = useState(false);

	const plusCount = (): void => {
		setRefreshCount(refreshCount + 1);
	};

	const openModal = (): void => {
		setModalState(!modalState);
	};

	const updateEdit = (): void => {
		setEditState(!editState);
	};

	return (
		<ReferralContext.Provider
			value={{
				refreshCount,
				modalState,
				editState,
				plusCount,
				openModal,
				updateEdit
			}}
		>
			{children}
		</ReferralContext.Provider>
	);
};

export { ReferralContext, ReferralProvider };
