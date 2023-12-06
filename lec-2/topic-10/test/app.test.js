const fs = require("fs");
const Solution = require("./index");

afterEach(() => {
  fs.writeFileSync("note.txt", "old data");
});
beforeEach(() => {
  fs.writeFileSync("note.txt", "old data");
});

jest.mock("fs");

const newcontent = "new data";
const updateString = "old data new data";

fs.readFile.mockImplementation((file, options, cb) => {
  cb(null, updateString);
});

fs.appendFile.mockImplementation((file, data, cb) => {
  cb(null);
});

const consoleSpy = jest.spyOn(console, "log");

describe("test app.js", () => {
  test("it should append data to file note.txt,and then read with updated data", () => {
    Solution();

    expect(fs.readFile).toHaveBeenCalledWith(
      "note.txt",
      "utf-8",
      expect.any(Function)
    );
    expect(fs.appendFile).toHaveBeenCalledWith(
      "note.txt",
      newcontent,
      expect.any(Function)
    );

    expect(consoleSpy).toHaveBeenCalledTimes(2);
    expect(fs.readFile).toHaveBeenCalledTimes(1);
  });
});
