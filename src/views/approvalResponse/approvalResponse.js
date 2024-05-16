const approvalResponse = (statusText, requesterId, approvalText) => {
  // View to respond to the approver's action
  const requestResponseView = {
    channel: requesterId,
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `You have ${statusText} the approval request from <@${requesterId}>.`,
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

  return requestResponseView;
};

module.exports = { approvalResponse };
