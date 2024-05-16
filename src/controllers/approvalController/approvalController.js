const { slackApp } = require("../../lib/slackApp");
const {
  approvalConfirmation,
} = require("../../views/approvalConfirmation/approvalConfirmation");
const { approvalModal } = require("../../views/approvalModal/approvalModal");
const {
  approvalRequest,
} = require("../../views/approvalRequest/approvalRequest");
const {
  approvalResponse,
} = require("../../views/approvalResponse/approvalResponse");
const { approvalUpdate } = require("../../views/approvalUpdate/approvalUpdate");

// Slash command listener for /approval
const approval_form = async ({ command, ack, client }) => {
  console.log("received at /approval");
  try {
    await ack(); // Acknowledge the command request

    // Fetch the list of users
    const users = await client.users.list();
    const model = approvalModal(users);

    // Open the modal
    await client.views.open({
      trigger_id: command.trigger_id,
      view: model,
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

  // view for the approval request
  const requestView = approvalRequest(requesterId, approvalText, approverId);

  // view for the requester for approval confirmation
  const approvalConfirmationView = approvalConfirmation(
    requesterId,
    approverId,
    approvalText
  );

  try {
    // Send the approval request to the approver
    await client.chat.postMessage(requestView);

    // Respond to the requester indicating that the approval request has been sent
    await client.chat.postMessage(approvalConfirmationView);
  } catch (error) {
    console.error("Error handling approval request:", error);
  }
};

const approval_action = async ({ body, ack, respond }) => {
  console.log("this is an approval action");
  await ack();

  const actionValue = JSON.parse(body.actions[0].value);
  console.log("🚀 ~ constapproval_action= ~ actionValue:", actionValue);
  const { requesterId, status, approverId, approvalText } = actionValue;
  const statusText = status === "approved" ? "approved" : "rejected";

  // View to respond to the approver's action
  const requestResponseView = approvalResponse(
    statusText,
    requesterId,
    approvalText
  );

  // View to notify the requester about the approval status
  const responseUpdateView = approvalUpdate(
    requesterId,
    statusText,
    approverId,
    approvalText
  );

  try {
    // Respond to the approver's action
    await respond(requestResponseView);

    // Notify the requester about the approval status
    await slackApp.client.chat.postMessage(responseUpdateView);
  } catch (error) {
    console.error("Error handling approval action:", error);
  }
};
module.exports = {
  approval_form,
  approval_view,
  approval_action,
};
