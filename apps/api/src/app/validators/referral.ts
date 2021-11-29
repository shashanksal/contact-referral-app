import { check } from 'express-validator';

export const createReferralValidator = () => {
	return [
		check('phone')
			.notEmpty()
			.withMessage('phone is required')
			.not()
			.custom(val =>
				/^(\+?\(61\)|\(\+?61\)|\+?61|\(0[1-9]\)|0[1-9])?( ?-?[0-9]){7,9}$/.test(
					val
				)
			)
			.withMessage(
				'Phone number should be a valid australian phone number'
			),
		check('email')
			.notEmpty()
			.withMessage('email is required')
			.isEmail()
			.withMessage('Email must be of a valid email format'),
		check('givenName')
			.notEmpty()
			.withMessage('Given Name is required')
			.isLength({ min: 8, max: 200 })
			.withMessage('Given name must be between 2 to 200 characters'),
		check('surName')
			.notEmpty()
			.withMessage('Sur Name is required')
			.isLength({ min: 8, max: 200 })
			.withMessage('Sur name must be between 2 to 200 characters')
	];
};
