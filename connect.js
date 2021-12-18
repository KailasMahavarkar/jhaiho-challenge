// import mode
const { MONGOURL } = require("./helper");

// connection to database
const mongoose = require("mongoose");

// mongodb connection status
const STATUS = {
	0: "disconnected",
	1: "connected",
	2: "connecting",
	3: "disconnecting",
};

// connect to database and return a promise
const connect = async () => {
	try {
		await mongoose.connect(MONGOURL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		mongoose.connection.on("connecting", () => {
			console.log("MongoDB is connecting");
		});
		mongoose.connection.on("connected", () => {
			console.log("MongoDB is connected");
		});
		mongoose.connection.on("disconnecting", () => {
			console.log("MongoDB is disconnecting");
		});
		mongoose.connection.on("disconnected", () => {
			console.log("MongoDB is disconnected");
		});
		console.log(
			`connection to MongoDB status: ${
				STATUS[mongoose.connection.readyState]
			}`
		);
	} catch (error) {
		console.log("connection to MongoDB status: Failed [fatal error]");
		process.exit();
	}
};

// returns promise
module.exports = connect;
