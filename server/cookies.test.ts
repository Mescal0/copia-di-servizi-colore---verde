import { describe, expect, it } from "vitest";
import { getSessionCookieOptions } from "./_core/cookies";
import type { Request } from "express";

function makeReq(
  protocol: string,
  forwardedProto?: string | string[]
): Request {
  const headers: Record<string, string | string[] | undefined> = {};
  if (forwardedProto !== undefined) {
    headers["x-forwarded-proto"] = forwardedProto;
  }
  return { protocol, headers } as unknown as Request;
}

describe("getSessionCookieOptions", () => {
  it("always sets httpOnly, path, and sameSite", () => {
    const opts = getSessionCookieOptions(makeReq("https"));
    expect(opts.httpOnly).toBe(true);
    expect(opts.path).toBe("/");
    expect(opts.sameSite).toBe("none");
  });

  it("marks secure=true for https protocol", () => {
    const opts = getSessionCookieOptions(makeReq("https"));
    expect(opts.secure).toBe(true);
  });

  it("marks secure=false for http protocol with no forwarded header", () => {
    const opts = getSessionCookieOptions(makeReq("http"));
    expect(opts.secure).toBe(false);
  });

  it("marks secure=true when x-forwarded-proto is 'https'", () => {
    const opts = getSessionCookieOptions(makeReq("http", "https"));
    expect(opts.secure).toBe(true);
  });

  it("marks secure=false when x-forwarded-proto is 'http'", () => {
    const opts = getSessionCookieOptions(makeReq("http", "http"));
    expect(opts.secure).toBe(false);
  });

  it("marks secure=true when x-forwarded-proto list contains 'https'", () => {
    const opts = getSessionCookieOptions(makeReq("http", "http, https"));
    expect(opts.secure).toBe(true);
  });

  it("marks secure=false when x-forwarded-proto list has no 'https'", () => {
    const opts = getSessionCookieOptions(makeReq("http", "http, ftp"));
    expect(opts.secure).toBe(false);
  });

  it("marks secure=true when x-forwarded-proto is an array containing 'https'", () => {
    const opts = getSessionCookieOptions(makeReq("http", ["http", "https"]));
    expect(opts.secure).toBe(true);
  });

  it("marks secure=false when x-forwarded-proto is an array with no 'https'", () => {
    const opts = getSessionCookieOptions(makeReq("http", ["http", "ftp"]));
    expect(opts.secure).toBe(false);
  });

  it("handles x-forwarded-proto with mixed case (e.g. 'HTTPS')", () => {
    const opts = getSessionCookieOptions(makeReq("http", "HTTPS"));
    expect(opts.secure).toBe(true);
  });

  it("handles x-forwarded-proto with extra whitespace", () => {
    const opts = getSessionCookieOptions(makeReq("http", "  https  "));
    expect(opts.secure).toBe(true);
  });
});
