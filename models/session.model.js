// create session model mongoose

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sessionSchema = new Schema(
	{
		_id: {
			type: Schema.ObjectId,
			auto: true,
		},
		username: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

sessionSchema.index({ expireAfterSeconds: 60 * 1 });

module.exports = mongoose.model("session", sessionSchema);
