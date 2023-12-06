const readline = require("readline");

const createInterfaceSpy = jest.spyOn(readline, "createInterface");
const consoleSpy = jest.spyOn(console, "log");

describe("get max", () => {
  it("returns the maximum of two numbers", () => {
    const questionSpy = jest
      .fn()
      .mockImplementationOnce((question, cb) => cb("5"))
      .mockImplementationOnce((question, cb) => cb("10"));

    const closeSpy = jest.fn();

    createInterfaceSpy.mockReturnValue({
      question: questionSpy,
      close: closeSpy,
    });

    require("./index");

    expect(createInterfaceSpy).toBeCalledWith({
      input: process.stdin,
      output: process.stdout,
    });

    expect(questionSpy).toHaveBeenCalledTimes(2);
    expect(questionSpy.mock.calls[0][0]).toBe("Enter the first number: ");
    expect(questionSpy.mock.calls[1][0]).toBe("Enter the second number: ");

    // expect(consoleSpy).toHaveBeenCalledTimes(1);
    // expect(consoleSpy).toHaveBeenCalledWith(
    //   "The maximum of the two numbers is: 10"
    // );
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("10"));

    const regex = /(max|large)/i;
    expect(consoleSpy.mock.calls[consoleSpy.mock.calls.length - 1][0]).toMatch(
      regex
    );
  });
});
