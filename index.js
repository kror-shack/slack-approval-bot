require("dotenv").config();
const express = require("express");
const { App } = require("@slack/bolt");
const bodyParser = require("body-parser");

// Initialize an Express application
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Initialize the Bolt app
const slackApp = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

// Endpoint to handle Slack events
app.post("/slack/events", async (req, res) => {
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
});

(async () => {
  await slackApp.start(process.env.PORT || 3000);
  console.log("Slack bot is running!");
})();

// Slash command listener for /approval
slackApp.command("/approval-test", async ({ command, ack, client }) => {
  console.log("received at /approval");
  try {
    await ack(); // Acknowledge the command request

    // Fetch the list of users
    const users = await client.users.list();

    // Construct the modal view
    const modal = {
      type: "modal",
      callback_id: "approval_request",
      title: {
        type: "plain_text",
        text: "Request Approval",
      },
      blocks: [
        {
          type: "input",
          block_id: "approver_block",
          element: {
            type: "static_select",
            action_id: "approver_action",
            options: users.members.map((user) => ({
              text: {
                type: "plain_text",
                text: user.real_name,
              },
              value: user.id,
            })),
          },
          label: {
            type: "plain_text",
            text: "Select Approver",
          },
        },
        {
          type: "input",
          block_id: "approval_text_block",
          element: {
            type: "plain_text_input",
            multiline: true,
            action_id: "approval_text_action",
          },
          label: {
            type: "plain_text",
            text: "Approval Text",
          },
        },
      ],
      submit: {
        type: "plain_text",
        text: "Submit",
      },
    };

    // Open the modal
    await client.views.open({
      trigger_id: command.trigger_id,
      view: modal,
    });
  } catch (error) {
    console.error("Error handling slash command:", error);
  }
});

// View submission handler for the approval request modal
slackApp.view("approval_request", async ({ ack, body, view, client }) => {
  await ack(); // Acknowledge the view submission

  const approverId =
    view.state.values.approver_block.approver_action.selected_option.value;
  const approvalText =
    view.state.values.approval_text_block.approval_text_action.value;
  const requesterId = body.user.id;

  try {
    // Send the approval request to the approver
    await client.chat.postMessage({
      channel: approverId,
      text: `You have a new approval request from <@${requesterId}>: ${approvalText}`,
      attachments: [
        {
          fallback: "You are unable to approve or reject",
          callback_id: "approval_action",
          actions: [
            {
              name: "approve",
              text: "Approve",
              type: "button",
              value: `{"requesterId": "${requesterId}", "status": "approved"}`,
            },
            {
              name: "reject",
              text: "Reject",
              type: "button",
              value: `{"requesterId": "${requesterId}", "status": "rejected"}`,
            },
          ],
        },
      ],
    });

    // Respond to the requester indicating that the approval request and reminder have been sent
    await client.chat.postMessage({
      channel: requesterId,
      text: "Your approval request has been sent to the approver",
    });
  } catch (error) {
    console.error("Error handling approval request:", error);
  }
});

// Action handler for Approve and Reject buttons
slackApp.action(
  { callback_id: "approval_action" },
  async ({ body, ack, respond }) => {
    await ack(); // Acknowledge the action

    const actionValue = JSON.parse(body.actions[0].value);
    const { requesterId, status } = actionValue;
    const statusText = status === "approved" ? "approved" : "rejected";

    try {
      // Respond to the approver's action
      await respond({
        text: `You have ${statusText} the approval request from <@${requesterId}>.`,
      });

      // Notify the requester about the approval status
      await slackApp.client.chat.postMessage({
        channel: requesterId,
        text: `Your approval request has been ${statusText}.`,
      });
    } catch (error) {
      console.error("Error handling approval action:", error);
    }
  }
);

module.exports = { app, slackApp };
