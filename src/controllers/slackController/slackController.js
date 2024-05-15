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
