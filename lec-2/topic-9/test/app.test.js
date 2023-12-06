const fs = require("fs");
const Solution = require("./index");

const writeFileSyncSpy = jest.spyOn(fs, "writeFileSync");
const readFileSyncSpy = jest.spyOn(fs, "readFileSync");
const appendFileSyncSpy = jest.spyOn(fs, "appendFileSync");
const consoleSpy = jest.spyOn(console, "log");

const filePath = "notes.txt";
const content = "The world has enough coders ";
const updateString = "BE A CODING NINJA!";
const updatedContent = `The world has enough coders ${updateString}`;

describe("File Operations", () => {
  it("should create, read and update a file and log the required content in the console", () => {
    Solution();

    expect(writeFileSyncSpy).toHaveBeenCalledWith(filePath, content);
    expect(readFileSyncSpy).toHaveBeenCalledWith(filePath, "utf8");

    expect(appendFileSyncSpy).toHaveBeenCalledWith(filePath, updateString);

    expect(consoleSpy).toHaveBeenCalledTimes(2);
    expect(consoleSpy.mock.calls[0][0]).toBe(content);
    expect(consoleSpy.mock.calls[1][0]).toBe(updatedContent);
  });
});
