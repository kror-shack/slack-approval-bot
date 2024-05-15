const express = require("express");
const router = express.Router();

const slackController = require("../../controllers/slackController/slackController");

router.get("/", slackController.slack_events_index);

module.exports = router;
