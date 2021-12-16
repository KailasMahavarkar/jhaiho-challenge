// import user model
const UserModel = require("../../models/user.model");

// import sha256 from helper
const { sha256, isEmpty } = require("../../helper");

// import session model
const SessionModel = require("../../models/session.model");

// login user controller
const loginUser = async (req, res) => {
	const { username, password } = req.body || {};

	// username and password are required
	if (isEmpty(username) || isEmpty(password)) {
		return res.status(401).json({
			message: "username and password are required",
			sucesss: "failed",
		});
	}

	// find user by username
	try {
		// find username in collection users
		// if username is not found, return error
		const result = await UserModel.findOne({
			username: username,
			password: sha256(password),
		});
		if (!result) {
			return res.status(401).json({
				message: "username or password is incorrect",
				success: "failed",
			});
		}

		try {
			// add user to session
			const sessionData = new SessionModel({
				username: username,
			});

			// save session
			const ss = await sessionData.save();

			// return session id
			return res.status(200).json({
				message: "user logged in successfully",
				success: "success",
				session: ss._id,
			});
		} catch (error) {
			return res.status(500).json({
				message: "session data save failed",
				success: "failed",
			});
		}
	} catch (error) {
		// internal server error
		return res.status(500).json({
			message: "internal server error",
			success: "exited",
		});
	}
};

module.exports = loginUser;
