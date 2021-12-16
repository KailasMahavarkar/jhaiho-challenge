// import router
const router = require("express").Router();

// login user controller
const loginUser = require("../controllers/auth/login.auth");

// register user controller
const registerUser = require("../controllers/auth/register.auth");

// login route
router.route("/login").post(loginUser);

// register route
router.route("/register").post(registerUser);


// export router
module.exports = router;