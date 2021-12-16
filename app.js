const express = require("express");
const app = express();
const dotenv = require("dotenv");
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

app.use('/', publicRoutes);
app.use('/', _authUser, privateRoutes);

app.use("/", (req, res, next) => {
	return res.send("Hello World");
});

app.listen(PORT, async () => {
	console.log(`connected to Nodejs | ${PORT}`);
	console.log(`MODE: ${MODE}`);

	// connect to database
	// errors are handled inside connect
	await connect();
});
