// import express router
const express = require("express");
const router = express.Router();

// import middlewares
const _checkComment = require("../middlewares/_check.comment");

// exposed public routes
const listController = require("../controllers/private/list.controller");
const viewController = require("../controllers/private/view.controller");
const updateController = require("../controllers/private/update.controller");

router.route("/list").get(listController);
router.route("/view").post(viewController);
router.route("/update").post(_checkComment, updateController);


module.exports = router;