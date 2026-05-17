import { describe, expect, it } from "vitest";

describe("Environment variables", () => {
  it("VITE_GA_MEASUREMENT_ID is set", () => {
    const gaId = process.env.VITE_GA_MEASUREMENT_ID;
    expect(gaId).toBeDefined();
    expect(gaId).not.toBe("");
  });

  it("VITE_GOOGLE_MAPS_API_KEY is set", () => {
    const mapsKey = process.env.VITE_GOOGLE_MAPS_API_KEY;
    expect(mapsKey).toBeDefined();
    expect(mapsKey).not.toBe("");
  });
});
