import { describe, expect, it } from "vitest";

import { createSlug, formatCompactNumber } from "@/lib/utils";

describe("utils", () => {
  it("creates stable slugs", () => {
    expect(createSlug("Hello, World from Inkspire")).toBe("hello-world-from-inkspire");
  });

  it("formats compact numbers", () => {
    expect(formatCompactNumber(12800)).toContain("12.8");
  });
});
