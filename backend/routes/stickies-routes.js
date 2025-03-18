const express = require("express");
const router = express.Router();
const stickiesController = require("../controllers/stickies-controller");

router.get("", stickiesController.getAllStickies);

router.post("", stickiesController.createSticky);

router.put("", stickiesController.updateSticky);

router.delete("", stickiesController.deleteSticky);

module.exports = router;
