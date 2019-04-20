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

/*
test("absolut - should return a positive number if input is positive", () => {
  // our test goes here
  const result = lib.absolute(1);
  // expect
  expect(result).toBe(1);
});

test("absolut - should return a positive number if input is negative", () => {
  const result = lib.absolute(-1);
  expect(result).toBe(1);
});

test("absolut - should return 0 if input is 0", () => {
  const result = lib.absolute(0);
  expect(result).toBe(0);
});
*/

describe("greet", () => {
  it("should return the greeting message", () => {
    const result = lib.greet("Mosh");
    expect(result).toMatch(/Mosh/);
    // or use
    expect(result).toContain("Mosh");
  });
});

describe("getCurrencies", () => {
  it("should return supported currencies", () => {
    const result = lib.getCurrencies();

    /*
    // general ways to test this function
    expect(result).toBeDefined(); // too general, doesn't check the value
    // another ways
    expect(result).not.toBeNull(); // also doesn't check the value

    // too specific
    expect(result[0]).toBe("USD");
    expect(result[1]).toBe("AUD");
    expect(result[2]).toBe("EUR");
    // another ways
    expect(result.length).toBe(3);
    
    // proper way
    expect(result).toContain("USD");
    expect(result).toContain("AUD");
    expect(result).toContain("EUR");
    */

    // ideal way
    expect(result).toEqual(expect.arrayContaining(["EUR", "USD", "AUD"]));
  });
});

describe("getProduct", () => {
  it("should return product with the given id", () => {
    const result = lib.getProduct(1);
    // expect(result).toBe({ id: 1, price: 10 }); // can't use toBe because it must in one memory
    // expect(result).toEqual({ id: 1, price: 10 });
    // or use this if we doesn't want to got failed test even we pass another key of object
    expect(result).toMatchObject({ id: 1, price: 10 });
    // or use
    expect(result).toHaveProperty("id", 1); // first argument is key, the second is value
  });
});

describe("registerUser", () => {
  it("should throw is username is falsy", () => {
    const args = [null, undefined, NaN, "", 0, false];
    args.forEach(a => {
      expect(() => {
        lib.registerUser(a);
      }).toThrow();
    });
  });
  it("should return a user object if valid username is passed", () => {
    const result = lib.registerUser("mosh");
    expect(result).toMatchObject({ username: "mosh" });
    expect(result.id).toBeGreaterThan(0);
  });
});
