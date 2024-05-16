const approvalRequest = (requesterId, approvalText, approverId) => {
  const requestView = {
    channel: approverId,
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `:wave: Have a moment? A colleague is in need of your approval.`,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*Requested by:* <@${requesterId}>\n*Description:* ${approvalText}`,
        },
      },
    ],
    attachments: [
      {
        fallback: "You are unable to approve or reject",
        callback_id: "approval_action",
        actions: [
          {
            name: "approve",
            text: "Approve",
            type: "button",
            value: `{"requesterId": "${requesterId}", "status": "approved", "approverId": "${approverId}", "approvalText": "${approvalText}"}`,
          },
          {
            name: "reject",
            text: "Reject",
            type: "button",
            value: `{"requesterId": "${requesterId}", "status": "rejected", "approverId": "${approverId}", "approvalText": "${approvalText}"}`,
          },
        ],
      },
    ],
  };

  return requestView;
};

module.exports = { approvalRequest };
