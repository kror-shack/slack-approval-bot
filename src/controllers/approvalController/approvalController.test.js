const request = require("supertest");
const { slackApp } = require("../../lib/slackApp/slackApp");
const {
  approval_form,
  approval_view,
  approval_action,
} = require("./approvalController");

jest.mock("../../lib/slackApp/slackApp", () => ({
  slackApp: {
    client: {
      users: {
        list: jest.fn(() => ({
          members: [
            { real_name: "userOne", id: 1 },
            { real_name: "userTwo", id: 2 },
          ],
        })),
      },
      views: {
        open: jest.fn(),
      },
      chat: {
        postMessage: jest.fn(),
      },
    },
  },
}));

describe("Approval Controller", () => {
  describe("approval_form", () => {
    test("should acknowledge command and open modal", async () => {
      const ack = jest.fn();
      const client = slackApp.client;
      const command = { trigger_id: "123" };

      await approval_form({ command, ack, client });
      expect(ack).toHaveBeenCalled();
      expect(client.views.open).toHaveBeenCalledWith({
        trigger_id: "123",
        view: expect.any(Object),
      });
    });
  });

  describe("approval_view", () => {
    test("should acknowledge view submission and send messages", async () => {
      const ack = jest.fn();
      const body = { user: { id: "user123" } };
      const view = {
        state: {
          values: {
            approver_block: {
              approver_action: {
                selected_option: {
                  value: 0,
                },
              },
            },
            approval_text_block: {
              approval_text_action: {
                value: 0,
              },
            },
          },
        },
      };
      const client = slackApp.client;

      await approval_view({ ack, body, view, client });

      expect(ack).toHaveBeenCalled();
      expect(client.chat.postMessage).toHaveBeenCalledTimes(2);
    });
  });

  describe("approval_action", () => {
    test("should acknowledge action and send messages", async () => {
      const ack = jest.fn();
      const respond = jest.fn();
      const body = {
        actions: [{ value: JSON.stringify({ requesterId: "user123" }) }],
      };

      await approval_action({ ack, body, respond });

      expect(ack).toHaveBeenCalled();
      expect(respond).toHaveBeenCalled();
      expect(slackApp.client.chat.postMessage).toHaveBeenCalled();
    });
  });
});
