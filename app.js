const express = require("express");
const app = express();
const dotenv = require("dotenv");

// load dotenv before database connection else MONGO_PROD_URL will be undefined
dotenv.config();
const connect = require("./connect");
const { MODE } = require("./helper");

// import auth Handler routes
const authHandler = require("./routes/auth.routes");
const publicRoutes = require("./routes/public.routes");
const privateRoutes = require("./routes/private.routes");

// import _auth middleware
const _authUser = require("./middlewares/_auth.user");

// setup json limit for api
app.use(express.urlencoded({ extended: true }));
app.use(
	express.json({
		limit: "10mb",
		extended: "true",
	})
);

// setup port for api
const PORT = process.env.PORT || 80;

app.use("/auth", authHandler);

// public routes
app.use("/public", publicRoutes);

// private routes
app.use("/private", _authUser, privateRoutes);

// welcome message for base route
app.use("/", (req, res, next) => {
	return res.send({
		message: "api is running",
		mode: MODE,
	});
});

// Assume 404 since no middleware responded
app.use(function (req, res, next) {
	console.log("error (404)");
	return res.status(404).json({
		message: "routes or method is incorrect",
		error: "failed",
        solution: "please check documentation",
	});
});

app.listen(PORT, async () => {
	console.log(`connected to Nodejs | ${PORT}`);
	console.log(`MODE: ${MODE}`);

	// connect to database
	// errors are handled inside connect
	await connect();
});
