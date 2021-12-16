// importing user model
const SessionModel = require("../models/session.model");

// import helpers
const { isEmpty } = require("../helper");

// check if user session is valid
const _authUser = async (req, res, next) => {
	// get user session from request
	const session = req.headers["session-id"] || "";

	// session is required
	if (isEmpty(session)) {
		return res.status(401).json({
			message: "session id does not exists",
			success: "failed",
		});
	}

	// find session in session Model
	try {
		// find session in collection sessions
		// if session is not found, return error

		try {
			const result = await SessionModel.findOne({
				_id: session,
			});

			// check if result is empty
			if (isEmpty(result)) {
				return res.status(401).json({
					message: "session id does not exists",
					success: "failed",
				});
			}

			// pass control to next middleware
			next();
		} catch (error) {
			// session id does not exist if db query fails
			// exception is thrown
			// return error
			return res.status(401).json({
				message: "session authentication failed",
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

module.exports = _authUser;
