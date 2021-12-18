// import comment model
const CommentModel = require("../../models/comment.model");

// list all the comments

const listController = (req, res) => {
	// list message from database

	try {
		CommentModel
			.find({})
			.sort({ creation_time: "desc" })
			.select("-__v -_id")
			.exec((err, data) => {
				if (err) {
					return res.status(401).json({
						message: "internal server error",
						success: "failed",
					});
				}

				// return the comment data
				return res.status(200).json({
					message: "comment list",
					success: "success",
					data: data,
				});
			});
	} catch (error) {
		return res.status(500).json({
			message: "internal server error",
			success: "failed",
		});
	}
};

module.exports = listController;
