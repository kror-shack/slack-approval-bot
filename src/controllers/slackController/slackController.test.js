const request = require("supertest");
const { slackApp } = require("../../lib/slackApp");
const { slack_events_index } = require("./slackController");

jest.mock("../../lib/slackApp", () => ({
  slackApp: {
    processEvent: jest.fn(),
  },
}));

describe("slack_events_index", () => {
  test("should return challenge for url_verification", async () => {
    const challenge = "challenge123";
    const req = {
      body: {
        type: "url_verification",
        challenge,
      },
    };
    const res = {
      send: jest.fn(),
    };

    await slack_events_index(req, res);

    expect(res.send).toHaveBeenCalledWith({ challenge });
  });
});
