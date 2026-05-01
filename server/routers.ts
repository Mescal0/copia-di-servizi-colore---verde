import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { notifyOwner } from "./_core/notification";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  preventivo: router({
    /**
     * Riceve i dati del form preventivo e invia una notifica al titolare.
     * Procedura pubblica — non richiede autenticazione.
     */
    invia: publicProcedure
      .input(
        z.object({
          nome: z.string().min(2, "Nome troppo corto"),
          telefono: z.string().min(6, "Telefono non valido"),
          email: z.string().email("Email non valida").optional().or(z.literal("")),
          servizio: z.string().min(1, "Seleziona un servizio"),
          messaggio: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const { nome, telefono, email, servizio, messaggio } = input;

        const contenuto = [
          `👤 Nome: ${nome}`,
          `📞 Telefono: ${telefono}`,
          email ? `📧 Email: ${email}` : null,
          `🔧 Servizio richiesto: ${servizio}`,
          messaggio ? `💬 Messaggio: ${messaggio}` : null,
          `\n⏰ Ricevuto il: ${new Date().toLocaleString("it-IT", { timeZone: "Europe/Rome" })}`,
        ]
          .filter(Boolean)
          .join("\n");

        const inviato = await notifyOwner({
          title: `🎯 Nuovo preventivo da ${nome} — ${servizio}`,
          content: contenuto,
        });

        return { success: true, notificaInviata: inviato };
      }),
  }),
});

export type AppRouter = typeof appRouter;
