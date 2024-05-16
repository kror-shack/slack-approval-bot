/**
 * Returns a view used in the Slack API.
 * @param {string} requesterId - The slack id of the requester
 * @param {string} approverId  - THe slack id of the approver
 * @param {string} approvalText - The description of the approval text
 * @returns - An object with the view of approval request sent confirmation to be sent to the requester
 */
const approvalConfirmation = (requesterId, approverId, approvalText) => {
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
