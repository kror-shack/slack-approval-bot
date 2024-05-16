const { approvalModal } = require("./approvalModal");

describe("approvalModal", () => {
  test("should return the correct modal structure", () => {
    const users = {
      members: [
        { real_name: "User One", id: "user1" },
        { real_name: "User Two", id: "user2" },
      ],
    };

    const expectedModal = {
      type: "modal",
      callback_id: "approval_request",
      title: {
        type: "plain_text",
        text: "Request Approval",
      },
      blocks: [
        {
          type: "input",
          block_id: "approver_block",
          element: {
            type: "static_select",
            action_id: "approver_action",
            options: [
              {
                text: {
                  type: "plain_text",
                  text: "User One",
                },
                value: "user1",
              },
              {
                text: {
                  type: "plain_text",
                  text: "User Two",
                },
                value: "user2",
              },
            ],
          },
          label: {
            type: "plain_text",
            text: "Select Approver",
          },
        },
        {
          type: "input",
          block_id: "approval_text_block",
          element: {
            type: "plain_text_input",
            multiline: true,
            action_id: "approval_text_action",
          },
          label: {
            type: "plain_text",
            text: "Approval Text",
          },
        },
      ],
      submit: {
        type: "plain_text",
        text: "Submit",
      },
    };

    const result = approvalModal(users);
    expect(result).toEqual(expectedModal);
  });
});
