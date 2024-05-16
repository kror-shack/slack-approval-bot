/**
 * Represents a view object used in the Slack API.
 * @typedef {Object} View
 * @param {string} statusText - The status of the request : approved/rejected
 * @param {string} requesterId - The slack id of the requester
 * @param {string} approvalText - The description of the approval text
 * @returns - An object with the message view of the appoval response to send to the approver.
 */
const approvalResponse = (statusText, requesterId, approvalText) => {
  const requestResponseView = {
    channel: requesterId,
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `You have *${statusText}* the approval request from <@${requesterId}>.`,
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
