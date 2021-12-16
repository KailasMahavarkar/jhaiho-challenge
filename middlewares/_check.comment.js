// import helpers
const { isEmpty } = require("../helper");

const _checkComment = (req, res, next) => {
	// get the comment data from request
	const { name, email, text } = req.body || {};

	// check isEmpty
	if (isEmpty(name) || isEmpty(email) || isEmpty(text)) {
		return res.status(401).json({
			message: "name, email and text are required",
			success: "failed",
		});
	}

	next();
};


module.exports = _checkComment;