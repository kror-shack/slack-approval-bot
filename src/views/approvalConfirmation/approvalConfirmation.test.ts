const request = require("supertest");
const { approvalConfirmation } = require("./approvalConfirmation");

describe("approvalConfirmation", () => {
  test("should return the correct view structure", () => {
    const requesterId = "user123";
    const approverId = "approver456";
    const approvalText = "Please approve this request.";

    const expectedView = {
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

    const result = approvalConfirmation(requesterId, approverId, approvalText);
    expect(result).toEqual(expectedView);
  });
});
