import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock notifyOwner per evitare chiamate reali al servizio di notifica
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

import { notifyOwner } from "./_core/notification";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("preventivo.invia", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("invia la notifica al titolare con i dati corretti", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.preventivo.invia({
      nome: "Mario Rossi",
      telefono: "+39 333 123 4567",
      email: "mario@esempio.it",
      servizio: "Imbiancatura",
      messaggio: "Devo tinteggiare il soggiorno",
    });

    expect(result.success).toBe(true);
    expect(result.notificaInviata).toBe(true);
    expect(notifyOwner).toHaveBeenCalledOnce();

    const chiamata = vi.mocked(notifyOwner).mock.calls[0]![0];
    expect(chiamata.title).toContain("Mario Rossi");
    expect(chiamata.title).toContain("Imbiancatura");
    expect(chiamata.content).toContain("+39 333 123 4567");
    expect(chiamata.content).toContain("mario@esempio.it");
    expect(chiamata.content).toContain("Devo tinteggiare il soggiorno");
  });

  it("funziona anche senza email e messaggio (campi opzionali)", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.preventivo.invia({
      nome: "Anna Bianchi",
      telefono: "+39 338 000 0000",
      servizio: "Verniciatura",
    });

    expect(result.success).toBe(true);
    expect(notifyOwner).toHaveBeenCalledOnce();

    const chiamata = vi.mocked(notifyOwner).mock.calls[0]![0];
    expect(chiamata.content).toContain("Anna Bianchi");
    expect(chiamata.content).not.toContain("undefined");
  });

  it("rifiuta i dati non validi (nome troppo corto)", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.preventivo.invia({
        nome: "A",
        telefono: "+39 338 000 0000",
        servizio: "Imbiancatura",
      })
    ).rejects.toThrow();

    expect(notifyOwner).not.toHaveBeenCalled();
  });

  it("rifiuta i dati non validi (telefono troppo corto)", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.preventivo.invia({
        nome: "Mario Rossi",
        telefono: "123",
        servizio: "Verde",
      })
    ).rejects.toThrow();
  });
});
