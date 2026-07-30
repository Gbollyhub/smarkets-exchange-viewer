import { describe, it, expect } from "vitest";
import { priceToDecimal, formatDecimal, formatEventType } from "./misc";

describe("priceToDecimal", () => {
  it("converts basis points to decimal odds", () => {
    expect(priceToDecimal(5000)).toBe(2.0);   // 50% -> evens
    expect(priceToDecimal(2500)).toBe(4.0);   // 25%
    expect(priceToDecimal(8000)).toBe(1.25);  // heavy favourite
  });

  it("handles the extremes of the valid range", () => {
    expect(priceToDecimal(1)).toBe(10000);
    expect(priceToDecimal(9999)).toBeCloseTo(1.0001, 4);
  });
});

describe("formatDecimal", () => {
  it("formats to two decimal places", () => {
    expect(formatDecimal(5000)).toBe("2.00");
    expect(formatDecimal(4000)).toBe("2.50");
  });

  it("shows a dash for missing or zero prices", () => {
    expect(formatDecimal(undefined)).toBe("—");
    expect(formatDecimal(null)).toBe("—");
    expect(formatDecimal(0)).toBe("—");
  });
});

describe("formatEventType", () => {
  it("replaces underscores with spaces and lowercases", () => {
    expect(formatEventType("football_match")).toBe("football match");
    expect(formatEventType("horse_racing_race")).toBe("horse racing race");
  });

  it("leaves a single word unchanged", () => {
    expect(formatEventType("politics")).toBe("politics");
  });
});