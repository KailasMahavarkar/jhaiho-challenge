// import comment model
const CommentModel = require("../../models/comment.model");

// import helper
const { isEmpty } = require("../../helper");

const updateController = async (req, res, next) => {
	// get the comment data from request
	const { name, email, text } = req.body || {};

    // get id from request body
	const id = req.body.id;

    // if id is empty or not found, return error
	if (isEmpty(id)) {
		return res.status(401).json({
			message: "id is required",
			success: "failed",
		});
	}

	try {
		// create a new comment
		const temp = await CommentModel.findOneAndUpdate(
			{
				id: id,
			},
			{
				name: name,
				email: email,
				text: text,
			}
		);

		// if comment is not found, return error
		if (isEmpty(temp)) {
			return res.status(401).json({
				message: "comment not found",
				success: "failed",
			});
		}
		return res.status(200).json({
			message: "comment updated successfully",
			success: "success",
		});
	} catch (error) {
		return res.status(500).json({
			message: "internal server error",
			success: "failed",
		});
	}
};

// export
module.exports = updateController;
