const { slackApp } = require("../../slackApp");

// Slash command listener for /approval
const approval_form = async ({ command, ack, client }) => {
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
};

const approval_view = async ({ ack, body, view, client }) => {
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
              value: `{"requesterId": "${requesterId}", "status": "approved", "approverId": "${approverId}"}`,
            },
            {
              name: "reject",
              text: "Reject",
              type: "button",
              value: `{"requesterId": "${requesterId}", "status": "rejected", "approverId": "${approverId}"}`,
            },
          ],
        },
      ],
    });

    // Respond to the requester indicating that the approval request and reminder have been sent
    await client.chat.postMessage({
      channel: requesterId,
      text: `Your approval request has been sent to <@${approverId}>.`,
    });
  } catch (error) {
    console.error("Error handling approval request:", error);
  }
};

const approval_action = async ({ body, ack, view, respond }) => {
  await ack();

  const actionValue = JSON.parse(body.actions[0].value);
  const { requesterId, status, approverId } = actionValue;
  const statusText = status === "approved" ? "approved" : "rejected";

  try {
    // Respond to the approver's action
    await respond({
      text: `You have ${statusText} the approval request from <@${requesterId}>.`,
    });

    // Notify the requester about the approval status
    await slackApp.client.chat.postMessage({
      channel: requesterId,
      text: `Your approval request has been ${statusText} from <@${approverId}>.`,
    });
  } catch (error) {
    console.error("Error handling approval action:", error);
  }
};
module.exports = {
  approval_form,
  approval_view,
  approval_action,
};
