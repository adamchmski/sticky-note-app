const express = require("express");
const router = express.Router();
const stickiesController = require("../controllers/stickies-controller");

router.post("", stickiesController.createSticky);

router.post("/userStickies", stickiesController.getUserStickies);

router.put("", stickiesController.updateSticky);

router.delete("", stickiesController.deleteSticky);

module.exports = router;
