import { Request, Response } from 'express';
import prisma from '../prisma';

export const getAllReferrals = async (req: Request, res: Response) => {
	try {
		const referrals = await prisma.referral.findMany();
		res.status(200).json(referrals);
	} catch (error) {
		console.error('Error fetching all referrals');
		res.status(500).send({
			code: 500,
			message: 'Error fetching all referrals'
		});
	}
};

export const getReferralById = async (req: Request, res: Response) => {
	const { id }: { id?: number } = req.params;
	try {
		const referral = await prisma.referral.findUnique({
			where: { id: Number(id) }
		});
		res.status(200).json(referral);
	} catch (error) {
		console.error(`Error fetching referral with id: ${id}`);
		res.status(500).send({
			code: 500,
			message: `Error fetching referral with id: ${id}`
		});
	}
};

export const updateReferral = async (req: Request, res: Response) => {
	const { id }: { id?: number } = req.params;
	const data = req.body;
	try {
		const updatedReferral = await prisma.referral.update({
			where: { id: Number(id) },
			data: { ...data }
		});
		res.status(200).json(updatedReferral);
	} catch (error) {
		console.error(`Error updating referral with id ${id}: ${error}`);
		res.status(500).send({
			code: 500,
			message: `Error updating referral with id: ${id}`
		});
	}
};

export const deleteReferral = async (req: Request, res: Response) => {
	const { id }: { id?: number } = req.params;
	try {
		await prisma.referral.delete({
			where: { id: Number(id) }
		});
		res.send(204);
	} catch (error) {
		console.error(`Error deleting referral with id: ${id}`);
		res.status(500).send({
			code: 500,
			message: `Error deleting referral with id: ${id}`
		});
	}
};

export const createReferral = async (req: Request, res: Response) => {
	const data = req.body;
	try {
		const referral = await prisma.referral.create({
			data: { ...data }
		});
		res.status(200).json(referral);
	} catch (error) {
		console.error('Error creating new referral');
		res.status(500).send({
			code: 500,
			message: 'Error creating new referral'
		});
	}
};
