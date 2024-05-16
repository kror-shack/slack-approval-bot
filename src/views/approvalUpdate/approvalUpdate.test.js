const { approvalUpdate } = require("./approvalUpdate");

describe("approvalUpdate", () => {
  test("should return the correct view structure", () => {
    const requesterId = "user123";
    const statusText = "approved";
    const approverId = "approver456";
    const approvalText = "Please approve this request.";

    const expectedView = {
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

    const result = approvalUpdate(
      requesterId,
      statusText,
      approverId,
      approvalText
    );
    expect(result).toEqual(expectedView);
  });
});
