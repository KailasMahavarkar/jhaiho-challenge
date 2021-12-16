// import crypto module for hashing password
const CryptoJS = require("crypto-js");

const MODE = process.env.MODE === "DEV" ? "DEV" : "PROD";
const MONGOURL =
	MODE === "DEV" ? process.env.MONGO_LOCAL_URL : process.env.MONGO_PROD_URL;

const sha256 = (message) => CryptoJS.SHA256(message).toString();

const isEmpty = (arg) => {
	if (arg == null) {
		return true;
	} else if (typeof arg === "undefined") {
		return true;
	} else if (arg.length === 0) {
		return true;
	} else if (typeof arg === "object" && Object.keys(arg).length === 0) {
		return true;
	}
	return false;
};

module.exports = {
	MODE,
	MONGOURL,
	sha256,
	isEmpty,
};
