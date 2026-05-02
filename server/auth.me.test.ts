import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function makeCtx(user: TrpcContext["user"] = null): TrpcContext {
  return {
    user,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

const sampleUser: NonNullable<TrpcContext["user"]> = {
  id: 42,
  openId: "open-id-42",
  email: "user@example.com",
  name: "Example User",
  loginMethod: "manus",
  role: "user",
  createdAt: new Date(),
  updatedAt: new Date(),
  lastSignedIn: new Date(),
};

describe("auth.me", () => {
  it("returns null when the caller is not authenticated", async () => {
    const caller = appRouter.createCaller(makeCtx(null));
    const result = await caller.auth.me();
    expect(result).toBeNull();
  });

  it("returns the user object when the caller is authenticated", async () => {
    const caller = appRouter.createCaller(makeCtx(sampleUser));
    const result = await caller.auth.me();
    expect(result).toEqual(sampleUser);
  });

  it("returns the full user shape including role and timestamps", async () => {
    const caller = appRouter.createCaller(makeCtx(sampleUser));
    const result = await caller.auth.me();
    expect(result).toMatchObject({
      id: 42,
      email: "user@example.com",
      role: "user",
    });
  });
});
