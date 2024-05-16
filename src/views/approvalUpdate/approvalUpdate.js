const approvalUpdate = (requesterId, statusText, approverId, approvalText) => {
  // View to notify the requester about the approval status
  const updateView = {
    channel: requesterId,
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `Your approval request has been ${statusText} from <@${approverId}>.`,
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
                text: "Request Description",
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
  return updateView;
};

module.exports = { approvalUpdate };
