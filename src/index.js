require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const slackRouter = require("./routes/slackRoutes/slackRoutes");
const approvalController = require("./controllers/approvalController/approvalController");
const { slackApp } = require("./slackApp");

// Initialize an Express application
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Endpoint to handle Slack events
app.use("/slack/events", slackRouter);

// Endpoint for slash command
slackApp.command("/approval-test", approvalController.approval_form);

// View submission handler for the approval request modal
slackApp.view("approval_request", approvalController.approval_view);

// Action handler for Approve and Reject buttons
slackApp.action(
  { callback_id: "approval_action" },
  approvalController.approval_action
);

module.exports = { app };
