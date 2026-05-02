import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";

// Hoist mutable ENV for storage tests.
const mockEnv = vi.hoisted(() => ({
  forgeApiUrl: "https://forge.example.com",
  forgeApiKey: "storage-api-key",
  appId: "",
  cookieSecret: "",
  databaseUrl: "",
  oAuthServerUrl: "",
  ownerOpenId: "",
  isProduction: false,
}));

vi.mock("./_core/env", () => ({ ENV: mockEnv }));

import { storageGet, storagePut, storageGetSignedUrl } from "./storage";

describe("storageGet", () => {
  it("returns the normalised key and the correct URL path", async () => {
    const result = await storageGet("images/photo.jpg");
    expect(result.key).toBe("images/photo.jpg");
    expect(result.url).toBe("/manus-storage/images/photo.jpg");
  });

  it("strips a single leading slash from the key", async () => {
    const result = await storageGet("/images/photo.jpg");
    expect(result.key).toBe("images/photo.jpg");
    expect(result.url).toBe("/manus-storage/images/photo.jpg");
  });

  it("strips multiple leading slashes from the key", async () => {
    const result = await storageGet("///deep/path/file.png");
    expect(result.key).toBe("deep/path/file.png");
    expect(result.url).toBe("/manus-storage/deep/path/file.png");
  });

  it("handles a key with no leading slash unchanged", async () => {
    const result = await storageGet("docs/report.pdf");
    expect(result.key).toBe("docs/report.pdf");
  });
});

describe("storagePut", () => {
  let fetchSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockEnv.forgeApiUrl = "https://forge.example.com";
    mockEnv.forgeApiKey = "storage-api-key";
    fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("throws when forgeApiUrl is missing", async () => {
    mockEnv.forgeApiUrl = "";
    await expect(storagePut("file.txt", "content")).rejects.toThrow(
      /Storage config missing/
    );
  });

  it("throws when forgeApiKey is missing", async () => {
    mockEnv.forgeApiKey = "";
    await expect(storagePut("file.txt", "content")).rejects.toThrow(
      /Storage config missing/
    );
  });

  it("throws when presign request fails", async () => {
    fetchSpy.mockResolvedValueOnce({
      ok: false,
      status: 403,
      statusText: "Forbidden",
      text: vi.fn().mockResolvedValue("unauthorized"),
    });
    await expect(storagePut("file.txt", "hello")).rejects.toThrow(
      /Storage presign failed/
    );
  });

  it("throws when presign response returns an empty URL", async () => {
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue({ url: null }),
    });
    await expect(storagePut("file.txt", "hello")).rejects.toThrow(
      /empty presign URL/
    );
  });

  it("throws when the S3 upload fails", async () => {
    // First call: presign succeeds
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue({ url: "https://s3.example.com/presigned" }),
    });
    // Second call: S3 upload fails
    fetchSpy.mockResolvedValueOnce({ ok: false, status: 500 });

    await expect(storagePut("file.txt", "hello")).rejects.toThrow(
      /Storage upload to S3 failed/
    );
  });

  it("returns key and url on success", async () => {
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue({ url: "https://s3.example.com/presigned" }),
    });
    fetchSpy.mockResolvedValueOnce({ ok: true });

    const result = await storagePut("uploads/file.txt", "hello");

    // Key has a hash suffix appended, but preserves the extension
    expect(result.key).toMatch(/^uploads\/file_[a-f0-9]{8}\.txt$/);
    expect(result.url).toMatch(/^\/manus-storage\/uploads\/file_[a-f0-9]{8}\.txt$/);
  });

  it("appends a hash suffix to a file with no extension", async () => {
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue({ url: "https://s3.example.com/p" }),
    });
    fetchSpy.mockResolvedValueOnce({ ok: true });

    const result = await storagePut("uploads/noext", Buffer.from("data"));
    expect(result.key).toMatch(/^uploads\/noext_[a-f0-9]{8}$/);
  });

  it("sends the correct content-type header to S3", async () => {
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue({ url: "https://s3.example.com/p" }),
    });
    fetchSpy.mockResolvedValueOnce({ ok: true });

    await storagePut("file.txt", "content", "text/plain");

    const s3Call = fetchSpy.mock.calls[1]!;
    expect((s3Call[1] as RequestInit).headers).toMatchObject({
      "Content-Type": "text/plain",
    });
  });
});

describe("storageGetSignedUrl", () => {
  let fetchSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockEnv.forgeApiUrl = "https://forge.example.com";
    mockEnv.forgeApiKey = "storage-api-key";
    fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("throws when forgeApiUrl is missing", async () => {
    mockEnv.forgeApiUrl = "";
    await expect(storageGetSignedUrl("file.txt")).rejects.toThrow(
      /Storage config missing/
    );
  });

  it("throws when forgeApiKey is missing", async () => {
    mockEnv.forgeApiKey = "";
    await expect(storageGetSignedUrl("file.txt")).rejects.toThrow(
      /Storage config missing/
    );
  });

  it("throws when the presign GET request fails", async () => {
    fetchSpy.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: "Not Found",
      text: vi.fn().mockResolvedValue(""),
    });
    await expect(storageGetSignedUrl("file.txt")).rejects.toThrow(
      /Storage signed URL failed/
    );
  });

  it("returns the signed URL on success", async () => {
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue({ url: "https://s3.example.com/signed-url" }),
    });

    const url = await storageGetSignedUrl("images/photo.jpg");
    expect(url).toBe("https://s3.example.com/signed-url");
  });

  it("strips leading slashes from the key before requesting", async () => {
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue({ url: "https://s3.example.com/signed" }),
    });

    await storageGetSignedUrl("/images/photo.jpg");

    const [calledUrl] = fetchSpy.mock.calls[0]!;
    expect(calledUrl.toString()).toContain("path=images%2Fphoto.jpg");
  });
});
