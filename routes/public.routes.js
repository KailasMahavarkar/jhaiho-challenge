const express = require("express");
const router = express.Router();

// import create controller
const createController = require("../controllers/public/create.controller");

// import empty check
const _checkComment = require("../middlewares/_check.comment");

router.route("/create").post(_checkComment, createController);

module.exports = router;
