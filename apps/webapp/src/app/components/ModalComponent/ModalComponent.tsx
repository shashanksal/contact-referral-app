import React, { useContext } from 'react';
import {
	Button,
	Box,
	DialogTitle,
	DialogContent,
	DialogActions,
	Dialog,
	TextField
} from '@material-ui/core';

import { Referral } from '../../types/referral';
import { ReferralContext } from '../../context/ReferralContext';
import requestController from '../../controller/requestController';
import { REFERRALS_URL } from '../../utils/constants';

interface ModalComponentProps {
	referral: Referral;
}

const ModalComponent: React.FC<ModalComponentProps> = ({ referral }) => {
	const [form, setForm] = React.useState({
		givenName: referral.givenName ? referral.givenName : '',
		email: referral.email ? referral.email : '',
		surName: referral.surName ? referral.surName : '',
		phone: referral.phone ? referral.phone : ''
	});
	const dialogeRef = React.createRef();
	const {
		plusCount,
		modalState,
		openModal,
		editState,
		updateEdit
	} = useContext(ReferralContext);

	const { email, givenName, surName, phone } = referral;

	const handleChange = (propName, value) => {
		setForm(referral => ({ ...referral, [propName]: value }));
	};

	const closeDialogHandler = () => {
		openModal();
		if (editState) {
			updateEdit();
		}
	};

	const saveHandler = async formData => {
		const url = editState ? REFERRALS_URL + referral.id : REFERRALS_URL;
		const method = editState ? 'PATCH' : 'POST';
		const errorMessage = editState
			? 'Error updating referral'
			: 'Error saving referral';

		const {
			response: savedResult,
			error
		} = await requestController.makeRequest(url, method, formData);
		if (error) {
			alert(errorMessage);
			return;
		}
		plusCount();
		openModal();
		if (editState) {
			updateEdit();
		}
	};

	return (
		<div>
			<Dialog
				open={modalState}
				onClose={() => closeDialogHandler()}
				ref={dialogeRef}
			>
				<DialogTitle className="dialog-title">
					{editState ? 'Update Referral' : 'New Referral'}
				</DialogTitle>
				<Box
					component="form"
					onSubmit={e => {
						e.preventDefault();
						saveHandler(form);
					}}
				>
					<DialogContent>
						<TextField
							autoFocus
							margin="dense"
							id="givenName"
							label="Given Name"
							fullWidth={true}
							variant="standard"
							required
							defaultValue={givenName}
							onChange={e => handleChange('givenName', e.target.value)}
						/>
						<TextField
							margin="dense"
							id="surName"
							label="Last Name"
							fullWidth={true}
							variant="standard"
							required
							defaultValue={surName}
							onChange={e => handleChange('surName', e.target.value)}
						/>
						<TextField
							margin="dense"
							id="email"
							label="Email"
							fullWidth={true}
							variant="standard"
							required
							defaultValue={email}
							onChange={e => handleChange('email', e.target.value)}
						/>
						<TextField
							margin="dense"
							id="phone"
							label="Phone"
							fullWidth={true}
							variant="standard"
							required
							defaultValue={phone}
							onChange={e => handleChange('phone', e.target.value)}
						/>
					</DialogContent>
					<DialogActions>
						<Button
							variant="contained"
							color="primary"
							type="submit"
							className="create-btn"
						>
							Create
						</Button>
						<Button
							variant="contained"
							color="secondary"
							onClick={() => closeDialogHandler()}
							className="close-btn"
						>
							Cancel
						</Button>
					</DialogActions>
				</Box>
			</Dialog>
		</div>
	);
};

export default ModalComponent;
