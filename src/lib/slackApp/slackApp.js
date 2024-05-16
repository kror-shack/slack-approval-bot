require("dotenv").config();
const { App } = require("@slack/bolt");

// Initialize the Bolt app
const slackApp = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

// Starts the Slack Bolt app.
(async () => {
  await slackApp.start(process.env.PORT || 3000);
  console.log("Slack bot is running!");
})();

module.exports = { slackApp };
