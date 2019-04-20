const lib = require("../lib");

// grouping testing
describe("absolute", () => {
  it("should return a positive number if input is positive", () => {
    // our test goes here
    const result = lib.absolute(1);
    // expect
    expect(result).toBe(1);
  });

  it("should return a positive number if input is negative", () => {
    const result = lib.absolute(-1);
    expect(result).toBe(1);
  });

  it("should return 0 if input is 0", () => {
    const result = lib.absolute(0);
    expect(result).toBe(0);
  });
});

// test("absolut - should return a positive number if input is positive", () => {
//   // our test goes here
//   const result = lib.absolute(1);
//   // expect
//   expect(result).toBe(1);
// });

// test("absolut - should return a positive number if input is negative", () => {
//   const result = lib.absolute(-1);
//   expect(result).toBe(1);
// });

// test("absolut - should return 0 if input is 0", () => {
//   const result = lib.absolute(0);
//   expect(result).toBe(0);
// });
