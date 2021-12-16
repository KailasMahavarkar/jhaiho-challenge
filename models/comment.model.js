const mongoose = require("mongoose");
const { v4 } = require('uuid');
const Schema = mongoose.Schema;


const commentSchema = new Schema({
	_id: {
		type: Schema.ObjectId,
		auto: true,
	},
	id: {
        type: String,
        default: v4(),
    },

	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	text: {
		type: String,
		required: true,
	},
	creation_time: {
		type: Date,
		default: new Date().toISOString(),
	},
});

module.exports = mongoose.model("comment", commentSchema);
