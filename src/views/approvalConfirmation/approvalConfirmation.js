const approvalConfirmation = (requesterId, approverId, approvalText) => {
  //view to notify the requester that the approval has been requested
  const approvalConfirmationView = {
    channel: requesterId,
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `Your approval request has been sent to <@${approverId}>.`,
        },
      },
      {
        type: "rich_text",
        elements: [
          {
            type: "rich_text_section",
            elements: [
              {
                type: "text",
                text: "\n Request Description",
                style: {
                  bold: true,
                },
              },
            ],
          },
          {
            type: "rich_text_quote",
            elements: [
              {
                type: "text",
                text: `${approvalText}`,
              },
            ],
          },
        ],
      },
    ],
  };
  return approvalConfirmationView;
};

module.exports = { approvalConfirmation };
