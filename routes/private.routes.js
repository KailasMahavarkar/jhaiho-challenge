// import express router
const express = require("express");
const router = express.Router();


// exposed public routes
const listController = require("../controllers/private/list.controller");
const viewController = require("../controllers/private/view.controller");

router.route("/view").post(viewController);
router.route("/list").get(listController);



module.exports = router;