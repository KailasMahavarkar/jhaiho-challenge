// import comment model
const { isEmpty } = require("../../helper");
const CommentModel = require("../../models/comment.model");

// view specific message by id
const viewController = async (req, res) => {
	// get the comment id from request
	const { id } = req.body || {};

	try {
		// find the comment by id
		const data = await CommentModel.findOne({ id: id }).select("-__v -_id");

		// if comment is not found, return error
		if (isEmpty(data)) {
			return res.status(401).json({
				message: `comment with ${id} not found`,
				success: "failed",
			});
		}

		// return the comment data
		return res.status(200).json({
			success: "success",
			data: data,
		});
	} catch (error) {
		return res.status(500).json({
			message: "internal server error",
			success: "failed",
		});
	}
};

module.exports = viewController;
