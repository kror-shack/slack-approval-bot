const { slackApp } = require("./slackApp");

jest.mock("./slackApp", () => ({
  slackApp: {
    start: jest.fn(),
  },
}));

describe("Slack App", () => {
  test("should export slackApp object", () => {
    expect(slackApp).toBeDefined();
  });
});
