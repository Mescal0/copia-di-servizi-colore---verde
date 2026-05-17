/**
 * Test di validazione per l'integrazione Resend.
 * Verifica che la chiave API sia configurata e che la procedura preventivo.invia
 * ritorni correttamente il campo emailInviata.
 */
import { describe, expect, it, vi, beforeEach } from "vitest";

describe("Resend integration", () => {
  it("RESEND_API_KEY è configurata come variabile d'ambiente", () => {
    // La chiave deve essere presente nell'ambiente
    const key = process.env.RESEND_API_KEY;
    expect(key).toBeDefined();
    expect(typeof key).toBe("string");
    expect(key!.length).toBeGreaterThan(10);
  });

  it("la chiave Resend inizia con il prefisso corretto", () => {
    const key = process.env.RESEND_API_KEY ?? "";
    // Le chiavi Resend iniziano con "re_"
    expect(key.startsWith("re_")).toBe(true);
  });
});

describe("preventivo.invia con email", () => {
  it("la risposta include il campo emailInviata", async () => {
    // Mock di Resend per evitare chiamate reali nei test
    vi.mock("resend", () => ({
      Resend: vi.fn().mockImplementation(() => ({
        emails: {
          send: vi.fn().mockResolvedValue({ data: { id: "test-id" }, error: null }),
        },
      })),
    }));

    const { appRouter } = await import("./routers");

    const ctx = {
      user: null,
      req: { protocol: "https", headers: {} } as any,
      res: { clearCookie: vi.fn() } as any,
    };

    const caller = appRouter.createCaller(ctx);

    const result = await caller.preventivo.invia({
      nome: "Test Cliente",
      telefono: "+39 333 1234567",
      email: "test@example.com",
      servizio: "Imbiancatura",
      messaggio: "Test messaggio",
    });

    expect(result).toHaveProperty("success", true);
    expect(result).toHaveProperty("emailInviata");
    expect(typeof result.emailInviata).toBe("boolean");
  });
});
