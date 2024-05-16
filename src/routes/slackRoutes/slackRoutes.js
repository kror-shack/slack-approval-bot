const express = require("express");
const slackController = require("../../controllers/slackController/slackController");

const router = express.Router();

/**
 * Route handler for GET requests to "/slack/events".
 * @function
 */
router.get("/", slackController.slack_events_index);

module.exports = router;
