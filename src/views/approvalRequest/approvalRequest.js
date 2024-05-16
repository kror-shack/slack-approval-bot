const approvalRequest = (requesterId, approvalText, approverId) => {
  const requestView = {
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
  };
  return requestView;
};

module.exports = { approvalRequest };
