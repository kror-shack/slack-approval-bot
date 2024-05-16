const { approvalResponse } = require("./approvalResponse");

describe("approvalResponse", () => {
  test("should return the correct view structure", () => {
    const statusText = "approved";
    const requesterId = "user123";
    const approvalText = "Please approve this request.";

    const expectedView = {
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

    const result = approvalResponse(statusText, requesterId, approvalText);
    expect(result).toEqual(expectedView);
  });
});
