const approvalModal = (users) => {
  // Construct the modal view
  const modal = {
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
          options: users.members.map((user) => ({
            text: {
              type: "plain_text",
              text: user.real_name,
            },
            value: user.id,
          })),
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
  return modal;
};
module.exports = { approvalModal };
