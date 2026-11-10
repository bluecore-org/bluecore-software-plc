import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";
import App from "../App";
import { ThemeProvider } from "../context/ThemeProvider";

describe("heading structure", () => {
  beforeAll(() => {
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        observe() {}
        unobserve() {}
        disconnect() {}
        takeRecords() { return []; }
      },
    );
  });

  afterEach(() => {
    cleanup();
    window.history.pushState({}, "", "/");
  });

  it.each(["/", "/blog", "/support", "/services/cloud-and-devops"])(
    "renders exactly one h1 on %s (the preloader must not add a second)",
    (path) => {
      window.history.pushState({}, "", path);
      const { container } = render(<ThemeProvider><App /></ThemeProvider>);
      expect(container.querySelectorAll("h1")).toHaveLength(1);
    },
  );
});
