import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

import { notifyOwner } from "./_core/notification";

function makeCtx(user: TrpcContext["user"] = null): TrpcContext {
  return {
    user,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

const adminUser: NonNullable<TrpcContext["user"]> = {
  id: 1,
  openId: "admin-open-id",
  email: "admin@example.com",
  name: "Admin User",
  loginMethod: "manus",
  role: "admin",
  createdAt: new Date(),
  updatedAt: new Date(),
  lastSignedIn: new Date(),
};

const regularUser: NonNullable<TrpcContext["user"]> = {
  ...adminUser,
  id: 2,
  openId: "user-open-id",
  role: "user",
};

describe("system.health", () => {
  it("returns { ok: true } for any valid timestamp", async () => {
    const caller = appRouter.createCaller(makeCtx());
    const result = await caller.system.health({ timestamp: Date.now() });
    expect(result).toEqual({ ok: true });
  });

  it("returns { ok: true } for timestamp = 0", async () => {
    const caller = appRouter.createCaller(makeCtx());
    const result = await caller.system.health({ timestamp: 0 });
    expect(result).toEqual({ ok: true });
  });

  it("rejects a negative timestamp", async () => {
    const caller = appRouter.createCaller(makeCtx());
    await expect(caller.system.health({ timestamp: -1 })).rejects.toThrow();
  });
});

describe("system.notifyOwner", () => {
  it("throws FORBIDDEN for an unauthenticated caller", async () => {
    const caller = appRouter.createCaller(makeCtx(null));
    await expect(
      caller.system.notifyOwner({ title: "Test", content: "Content" })
    ).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("throws FORBIDDEN for a non-admin user", async () => {
    const caller = appRouter.createCaller(makeCtx(regularUser));
    await expect(
      caller.system.notifyOwner({ title: "Test", content: "Content" })
    ).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("succeeds and returns { success: true } for an admin user", async () => {
    vi.mocked(notifyOwner).mockResolvedValueOnce(true);
    const caller = appRouter.createCaller(makeCtx(adminUser));
    const result = await caller.system.notifyOwner({ title: "Test", content: "Content" });
    expect(result).toEqual({ success: true });
    expect(notifyOwner).toHaveBeenCalledWith({ title: "Test", content: "Content" });
  });

  it("returns { success: false } when notifyOwner returns false", async () => {
    vi.mocked(notifyOwner).mockResolvedValueOnce(false);
    const caller = appRouter.createCaller(makeCtx(adminUser));
    const result = await caller.system.notifyOwner({ title: "Alert", content: "Details" });
    expect(result).toEqual({ success: false });
  });

  it("rejects empty title (zod validation)", async () => {
    const caller = appRouter.createCaller(makeCtx(adminUser));
    await expect(
      caller.system.notifyOwner({ title: "", content: "Content" })
    ).rejects.toThrow();
  });

  it("rejects empty content (zod validation)", async () => {
    const caller = appRouter.createCaller(makeCtx(adminUser));
    await expect(
      caller.system.notifyOwner({ title: "Title", content: "" })
    ).rejects.toThrow();
  });
});
