import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { TRPCError } from "@trpc/server";

// Hoist a mutable ENV object so individual tests can override properties.
const mockEnv = vi.hoisted(() => ({
  forgeApiUrl: "https://forge.example.com",
  forgeApiKey: "test-api-key",
  appId: "",
  cookieSecret: "",
  databaseUrl: "",
  oAuthServerUrl: "",
  ownerOpenId: "",
  isProduction: false,
}));

vi.mock("./_core/env", () => ({ ENV: mockEnv }));

import { notifyOwner } from "./_core/notification";

describe("notifyOwner", () => {
  let fetchSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockEnv.forgeApiUrl = "https://forge.example.com";
    mockEnv.forgeApiKey = "test-api-key";
    fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  // --- validatePayload ---

  it("throws BAD_REQUEST when title is empty string", async () => {
    fetchSpy.mockResolvedValue({ ok: true });
    await expect(notifyOwner({ title: "", content: "some content" })).rejects.toThrow(
      TRPCError
    );
  });

  it("throws BAD_REQUEST when title is whitespace only", async () => {
    fetchSpy.mockResolvedValue({ ok: true });
    await expect(notifyOwner({ title: "   ", content: "some content" })).rejects.toThrow(
      TRPCError
    );
  });

  it("throws BAD_REQUEST when content is empty string", async () => {
    fetchSpy.mockResolvedValue({ ok: true });
    await expect(notifyOwner({ title: "Title", content: "" })).rejects.toThrow(
      TRPCError
    );
  });

  it("throws BAD_REQUEST when content is whitespace only", async () => {
    fetchSpy.mockResolvedValue({ ok: true });
    await expect(notifyOwner({ title: "Title", content: "   " })).rejects.toThrow(
      TRPCError
    );
  });

  it("throws BAD_REQUEST when title exceeds 1200 characters", async () => {
    fetchSpy.mockResolvedValue({ ok: true });
    await expect(
      notifyOwner({ title: "a".repeat(1201), content: "content" })
    ).rejects.toThrow(TRPCError);
  });

  it("throws BAD_REQUEST when content exceeds 20000 characters", async () => {
    fetchSpy.mockResolvedValue({ ok: true });
    await expect(
      notifyOwner({ title: "Title", content: "a".repeat(20001) })
    ).rejects.toThrow(TRPCError);
  });

  it("does not throw for title of exactly 1200 characters", async () => {
    fetchSpy.mockResolvedValue({ ok: true, text: async () => "" });
    await expect(
      notifyOwner({ title: "a".repeat(1200), content: "content" })
    ).resolves.toBe(true);
  });

  it("does not throw for content of exactly 20000 characters", async () => {
    fetchSpy.mockResolvedValue({ ok: true, text: async () => "" });
    await expect(
      notifyOwner({ title: "Title", content: "a".repeat(20000) })
    ).resolves.toBe(true);
  });

  // --- ENV guards ---

  it("throws INTERNAL_SERVER_ERROR when forgeApiUrl is missing", async () => {
    mockEnv.forgeApiUrl = "";
    await expect(notifyOwner({ title: "Title", content: "Content" })).rejects.toMatchObject({
      code: "INTERNAL_SERVER_ERROR",
    });
  });

  it("throws INTERNAL_SERVER_ERROR when forgeApiKey is missing", async () => {
    mockEnv.forgeApiKey = "";
    await expect(notifyOwner({ title: "Title", content: "Content" })).rejects.toMatchObject({
      code: "INTERNAL_SERVER_ERROR",
    });
  });

  // --- Fetch outcomes ---

  it("returns true on a successful fetch", async () => {
    fetchSpy.mockResolvedValue({ ok: true });
    const result = await notifyOwner({ title: "Title", content: "Content" });
    expect(result).toBe(true);
  });

  it("returns false when the upstream service responds with a non-OK status", async () => {
    fetchSpy.mockResolvedValue({
      ok: false,
      status: 503,
      statusText: "Service Unavailable",
      text: vi.fn().mockResolvedValue("down"),
    });
    const result = await notifyOwner({ title: "Title", content: "Content" });
    expect(result).toBe(false);
  });

  it("returns false when fetch throws a network error", async () => {
    fetchSpy.mockRejectedValue(new Error("Network error"));
    const result = await notifyOwner({ title: "Title", content: "Content" });
    expect(result).toBe(false);
  });

  it("sends the correct payload to the notification endpoint", async () => {
    fetchSpy.mockResolvedValue({ ok: true });
    await notifyOwner({ title: "  Hello  ", content: "  World  " });

    expect(fetchSpy).toHaveBeenCalledOnce();
    const [url, options] = fetchSpy.mock.calls[0]!;
    expect(url).toContain("forge.example.com");
    expect(url).toContain("SendNotification");
    const body = JSON.parse(options.body as string);
    // validatePayload trims the values
    expect(body.title).toBe("Hello");
    expect(body.content).toBe("World");
  });

  it("includes the API key in the Authorization header", async () => {
    fetchSpy.mockResolvedValue({ ok: true });
    await notifyOwner({ title: "Title", content: "Content" });

    const [, options] = fetchSpy.mock.calls[0]!;
    expect((options.headers as Record<string, string>)["authorization"]).toBe(
      "Bearer test-api-key"
    );
  });

  it("builds the endpoint URL correctly when base URL has no trailing slash", async () => {
    mockEnv.forgeApiUrl = "https://forge.example.com";
    fetchSpy.mockResolvedValue({ ok: true });
    await notifyOwner({ title: "Title", content: "Content" });

    const [url] = fetchSpy.mock.calls[0]!;
    expect(url).toMatch(/^https:\/\/forge\.example\.com\//);
  });

  it("builds the endpoint URL correctly when base URL has a trailing slash", async () => {
    mockEnv.forgeApiUrl = "https://forge.example.com/";
    fetchSpy.mockResolvedValue({ ok: true });
    await notifyOwner({ title: "Title", content: "Content" });

    const [url] = fetchSpy.mock.calls[0]!;
    expect(url).toMatch(/^https:\/\/forge\.example\.com\//);
    // Should not have double slashes in the path (after the scheme)
    const urlPath = url.replace(/^https?:\/\//, "");
    expect(urlPath).not.toContain("//");
  });
});
