import { afterEach, describe, expect, it, vi } from "vitest";

import { SITE_URL, absoluteUrl } from "./site";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe("SITE_URL", () => {
  it("is an absolute https origin", () => {
    // metadataBase, sitemap.ts and the JSON-LD blocks all assume this.
    expect(() => new URL(SITE_URL)).not.toThrow();
    expect(SITE_URL.startsWith("https://")).toBe(true);
  });

  it("has no trailing slash", () => {
    expect(SITE_URL.endsWith("/")).toBe(false);
  });

  it("strips a trailing slash off NEXT_PUBLIC_SITE_URL", async () => {
    // The env var is baked in at build time by the Docker build-arg, so a stray
    // trailing slash there would silently produce "//blog" canonicals.
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://example.com/");
    vi.resetModules();

    const fresh = await import("./site");
    expect(fresh.SITE_URL).toBe("https://example.com");
    expect(fresh.absoluteUrl("/blog")).toBe("https://example.com/blog");
  });
});

describe("absoluteUrl", () => {
  it("defaults to the site root", () => {
    expect(absoluteUrl()).toBe(`${SITE_URL}/`);
  });

  it("passes through a path that already has a leading slash", () => {
    expect(absoluteUrl("/blog")).toBe(`${SITE_URL}/blog`);
  });

  it("adds a missing leading slash", () => {
    expect(absoluteUrl("blog")).toBe(`${SITE_URL}/blog`);
  });

  it("produces a parseable URL for nested paths", () => {
    const url = absoluteUrl("/blog/agentic-operating-model");
    expect(new URL(url).pathname).toBe("/blog/agentic-operating-model");
  });
});
