/**
 * Returns a view used in the Slack API.
 * @param {string} requesterId - The slack id of the requester
 * @param {string} statusText - The status of the request : approved/rejected
 * @param {string} approverId  - THe slack id of the approver
 * @param {string} approvalText - The description of the approval text
 * @returns - An object with the message view of the approval update to send to the requester.
 */
const approvalUpdate = (requesterId, statusText, approverId, approvalText) => {
  const updateView = {
    channel: requesterId,
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `Your approval request has been *${statusText}* from <@${approverId}>.`,
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
