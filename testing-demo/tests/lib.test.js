const lib = require("../lib");

test("absolut - should return a positive number if input is positive", () => {
  // our test goes here
  const result = lib.absolute(1);
  // expect
  expect(result).toBe(1);
});

test("absolut - should return a positive number if input is negative", () => {
  // our test goes here
  const result = lib.absolute(-1);
  // expect
  expect(result).toBe(1);
});

test("absolut - should return 0 if input is 0", () => {
  // our test goes here
  const result = lib.absolute(0);
  // expect
  expect(result).toBe(0);
});
