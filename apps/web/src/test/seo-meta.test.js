import { describe, expect, it } from "vitest";
import { buildDescription, buildTitle } from "../lib/seoMeta";
import { blog } from "../data/blog";
import { services } from "../data/services";
import { portfolio } from "../data/portfolio";

describe("seoMeta", () => {
  it("keeps the full brand suffix when the title fits", () => {
    expect(buildTitle("Cloud & DevOps")).toBe("Cloud & DevOps | Bluecore Software PLC");
  });

  it("falls back to a shorter suffix, then the bare title", () => {
    expect(buildTitle("Practical AI Automation, Without the Hype")).toBe(
      "Practical AI Automation, Without the Hype | Bluecore",
    );
    const long = "A".repeat(70);
    expect(buildTitle(long)).toBe(long);
  });

  it("leaves short descriptions alone and trims long ones to 160 characters", () => {
    expect(buildDescription("Short.")).toBe("Short.");
    const long = `${"word ".repeat(60)}end.`;
    const out = buildDescription(long);
    expect(out.length).toBeLessThanOrEqual(160);
    expect(out.endsWith("…")).toBe(true);
  });

  it("prefers whole sentences when trimming", () => {
    const text = `${"A".repeat(90)}. ${"B".repeat(90)}.`;
    expect(buildDescription(text)).toBe(`${"A".repeat(90)}.`);
  });

  it("keeps every blog, service and portfolio title and description in range", () => {
    for (const post of blog) {
      expect(buildTitle(post.seoTitle ?? post.title).length).toBeLessThanOrEqual(60);
      expect(buildDescription(post.description).length).toBeLessThanOrEqual(160);
    }
    for (const item of [...services, ...portfolio]) {
      expect(buildTitle(item.title).length).toBeLessThanOrEqual(60);
      expect(buildDescription(item.overview?.[0] ?? item.text).length).toBeLessThanOrEqual(160);
    }
  });
});
