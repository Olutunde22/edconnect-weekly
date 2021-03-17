const User = require('../models/user');
const helper = require('../models/mongo_helper');

//Create a user
const create = async ({
	firstname,
	lastname,
	email,
	password,
	matricNumber,
	program,
	graduationYear,
}) => {
	try {
		const user = new User({
			firstname,
			lastname,
			email,
			password,
			matricNumber,
			program,
			graduationYear,
		});
		user.setPassword(password);
		const saved = await user.save();
		if (saved) {
			return [true, user];
		}
	} catch (error) {
		return [false, helper.translateError(error)];
	}
};

/* Authenticate a user */
const authenticate = async (email, password) => {
	try {
		const user = await User.findOne({ email: email });
		if (user != null) {
			const authenticated = await user.validPassword(password);
			if (authenticated) {
				return [true, user];
			} else {
				return [false, ['Invalid email/password']];
			}
		} else {
			return [false, ['Invalid email/password']];
		}
	} catch (error) {
		return helper.translateError(error);
	}
};

/* Return user with specified id */
const getById = async (id) => {
	const user = await User.findById(id);
	return user;
};

/* Return all users */
const getAll = () => {
	return User.find();
};

module.exports = {
	create,
	authenticate,
	getById,
	getAll,
};
