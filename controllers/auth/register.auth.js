// import user model
const UserModel = require("../../models/user.model");

// import sha256 from helper
const { sha256, isEmpty } = require("../../helper");

// register user
const registerUser = async (req, res) => {
	// get username and password from request body
	const { username, password } = req.body || {};

	// username and password are required
	if (isEmpty(username) || isEmpty(password)) {
		return res.status(401).json({
			message: "username and password are required",
			success: "failed",
		});
	}

	// find user by username
	try {
		// find username in collection users
		// if username is not found, return error
		const result = await UserModel.findOne({ username: username });
		if (result) {
			return res.status(401).json({
				message: "username already exists",
				success: "failed",
			});
		}

		// create new user
		const newUser = new UserModel({
			username: username,
			password: sha256(password),
		});

		// save new user
		const ress = await newUser.save();
		console.log(ress);

		return res.status(200).json({
			message: "user created successfully",
			success: "success",
		});

		// pass control to next middleware
		// next();
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: "internal server error",
			success: "exited",
		});
	}
};

// export registerUser
module.exports = registerUser;
