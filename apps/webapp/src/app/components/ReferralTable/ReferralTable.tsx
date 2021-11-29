import React, { useState, useContext } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ModalComponent from '../ModalComponent/ModalComponent';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import { ReactComponent as CreateIcon } from '../../../assets/create-24px.svg';
import { ReactComponent as DeleteIcon } from '../../../assets/delete-24px.svg';
import { Referral, Referrals } from '../../types/referral';
import { IconButton } from '../IconButton';
import style from './ReferralTable.module.css';

import requestController from '../../controller/requestController';
import { REFERRALS_URL } from '../../utils/constants';
import { ReferralContext } from '../../context/ReferralContext';

const TableHeadCell: React.FC = ({ children }) => (
	<TableCell classes={{ root: style.tableHeadCell }}>{children}</TableCell>
);

const TableBodyCell: React.FC = ({ children }) => (
	<TableCell classes={{ root: style.tableBodyCell }}>{children}</TableCell>
);

interface ActionBodyCellProps {
	onEditClick: () => void;
	onDeleteClick: () => void;
}

const ActionBodyCell: React.FC<ActionBodyCellProps> = ({
	onEditClick,
	onDeleteClick
}) => (
	<TableCell classes={{ root: style.actionBodyCell }}>
		<IconButton onClick={onEditClick}>
			<CreateIcon />
		</IconButton>
		<IconButton onClick={onDeleteClick}>
			<DeleteIcon />
		</IconButton>
	</TableCell>
);

interface ReferralTableProps {
	referrals?: Referrals;
}

const ReferralTable: React.FC<ReferralTableProps> = ({ referrals }) => {
	const [open, setOpen] = useState(false);
	const [referralData, setReferralData] = useState<Referral | null>(null);

	const { plusCount, openModal, updateEdit } = useContext(ReferralContext);

	const handleEditClick = async referral => {
		const {
			response: referralResult,
			error
		} = await requestController.makeRequest(
			REFERRALS_URL + referral.id,
			'GET',
			null
		);
		if (error) {
			alert('Error fetching referral');
		}

		setReferralData(referralResult);
		openModal();
		updateEdit();
	};

	const handleDeleteClick = async referral => {
		// eslint-disable-next-line no-restricted-globals
		if (confirm('Do you want to delete this referral ?')) {
			await requestController.makeRequest(
				REFERRALS_URL + referral.id,
				'DELETE',
				null
			);
			plusCount();
		} else {
			return;
		}
	};

	const handleNewClick = () => {
		setReferralData({
			givenName: '',
			surName: '',
			email: '',
			phone: ''
		});
		openModal();
	};

	return (
		<div>
			{referralData ? <ModalComponent referral={referralData} /> : <div></div>}

			<TableContainer classes={{ root: style.container }}>
				<Table>
					<TableHead>
						<TableRow>
							<TableHeadCell>Given Name</TableHeadCell>
							<TableHeadCell>Surname</TableHeadCell>
							<TableHeadCell>Email</TableHeadCell>
							<TableHeadCell>Phone</TableHeadCell>
							<TableHeadCell>Actions</TableHeadCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{referrals.map(referral => (
							<TableRow key={referral.id}>
								<TableBodyCell>{referral.givenName}</TableBodyCell>
								<TableBodyCell>{referral.surName}</TableBodyCell>
								<TableBodyCell>{referral.email}</TableBodyCell>
								<TableBodyCell>{referral.phone}</TableBodyCell>
								<ActionBodyCell
									onEditClick={() => handleEditClick(referral)}
									onDeleteClick={() => handleDeleteClick(referral)}
								/>
							</TableRow>
						))}
					</TableBody>
				</Table>
				<Box marginTop={3}>
					<Button
						variant="contained"
						color="primary"
						onClick={() => handleNewClick()}
					>
						Create new
					</Button>
				</Box>
			</TableContainer>
		</div>
	);
};

export { ReferralTable };
