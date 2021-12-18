// import comment schema
const CommentSchema = require("../../models/comment.model");

const createController = (req, res) => {
	// get the comment data from request
	const { name, email, text } = req.body || {};

	// create a new comment
	const comment = new CommentSchema({
		name: name,
		email: email,
		text: text,
	});

	// save the comment
	comment.save((err, data) => {
		// return if contain any error
		if (err) {
			return res.status(500).json({
				message: "internal server error",
				success: "failed",
			});
		}

		// return the comment data
		return res.status(200).json({
			message: "comment created successfully",
			success: "success",
			data: { ...data._doc, _id: undefined, __v: undefined },
		});
	});
};

module.exports = createController;
