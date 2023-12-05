const axios = require("axios");
const Solution = require(".");
describe("use axios to fetch data", () => {
  it("should hit https://api.codingninjas.com/api/v3/event_tags API endpoint", async () => {
    const consoleSpy = jest.spyOn(console, "log");
    const axiosSpy = jest
      .spyOn(axios, "get")
      .mockReturnValueOnce({ data: { name: "coding_ninjas" } });
    await Solution();
    expect(consoleSpy).toHaveBeenCalledWith({
      name: "coding_ninjas",
    });
    expect(axiosSpy).toHaveBeenCalledWith(
      "https://api.codingninjas.com/api/v3/event_tags"
    );
    axiosSpy.mockRestore();
    consoleSpy.mockRestore();
  });
});
