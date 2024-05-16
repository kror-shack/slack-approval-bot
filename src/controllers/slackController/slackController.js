const { slackApp } = require("../../lib/slackApp/slackApp");

/**
 * Handles Slack events received at the "/slacks/events" endpoint.
 * @function
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} A Promise that resolves when the event is processed.
 */
const slack_events_index = async (req, res) => {
  if (req.body.type === "url_verification") {
    return res.send({ challenge: req.body.challenge });
  }

  try {
    await slackApp.processEvent(req.body);
    res.status(200).send();
  } catch (error) {
    console.error("Error processing Slack event:", error);
    res.status(500).send("Internal Server Error");
  }
};
module.exports = {
  slack_events_index,
};
