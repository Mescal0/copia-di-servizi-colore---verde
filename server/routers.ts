import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { notifyOwner } from "./_core/notification";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

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

        // Invio email via Resend
        let emailInviata = false;
        if (resend) {
          try {
            const htmlBody = `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9f7f4;">
                <div style="background: #2e5c38; color: white; padding: 20px 24px; border-radius: 4px 4px 0 0;">
                  <h2 style="margin: 0; font-size: 20px;">🎯 Nuovo Preventivo Ricevuto</h2>
                  <p style="margin: 4px 0 0; opacity: 0.85; font-size: 14px;">Colore &amp; Verde — Pistoia</p>
                </div>
                <div style="background: white; padding: 24px; border-radius: 0 0 4px 4px; border: 1px solid #e8e0d8;">
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr><td style="padding: 10px 0; border-bottom: 1px solid #f0ebe4; color: #666; font-size: 13px; width: 140px;">👤 Nome</td><td style="padding: 10px 0; border-bottom: 1px solid #f0ebe4; font-weight: 600;">${nome}</td></tr>
                    <tr><td style="padding: 10px 0; border-bottom: 1px solid #f0ebe4; color: #666; font-size: 13px;">📞 Telefono</td><td style="padding: 10px 0; border-bottom: 1px solid #f0ebe4;"><a href="tel:${telefono}" style="color: #2e5c38; font-weight: 600;">${telefono}</a></td></tr>
                    ${email ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #f0ebe4; color: #666; font-size: 13px;">📧 Email</td><td style="padding: 10px 0; border-bottom: 1px solid #f0ebe4;"><a href="mailto:${email}" style="color: #2e5c38;">${email}</a></td></tr>` : ""}
                    <tr><td style="padding: 10px 0; border-bottom: 1px solid #f0ebe4; color: #666; font-size: 13px;">🔧 Servizio</td><td style="padding: 10px 0; border-bottom: 1px solid #f0ebe4; font-weight: 600; color: #2e5c38;">${servizio}</td></tr>
                    ${messaggio ? `<tr><td style="padding: 10px 0; color: #666; font-size: 13px; vertical-align: top;">💬 Messaggio</td><td style="padding: 10px 0; line-height: 1.6;">${messaggio}</td></tr>` : ""}
                  </table>
                  <div style="margin-top: 20px; padding: 12px 16px; background: #f0f7f2; border-left: 3px solid #2e5c38; border-radius: 2px;">
                    <p style="margin: 0; font-size: 13px; color: #555;">⏰ Ricevuto il <strong>${new Date().toLocaleString("it-IT", { timeZone: "Europe/Rome" })}</strong></p>
                  </div>
                  <div style="margin-top: 20px; text-align: center;">
                    <a href="tel:${telefono}" style="display: inline-block; background: #2e5c38; color: white; padding: 12px 28px; border-radius: 4px; text-decoration: none; font-weight: 600; font-size: 14px;">📞 Chiama ora ${telefono}</a>
                  </div>
                </div>
              </div>
            `;

            const { error } = await resend.emails.send({
              from: "Colore & Verde <onboarding@resend.dev>",
              to: ["marco.baldi.24@gmail.com"],
              subject: `🎯 Nuovo preventivo da ${nome} — ${servizio}`,
              html: htmlBody,
            });

            emailInviata = !error;
            if (error) console.error("[Resend] Errore invio email:", error);
          } catch (err) {
            console.error("[Resend] Eccezione:", err);
          }
        }

        return { success: true, notificaInviata: inviato, emailInviata };
      }),
  }),
});

export type AppRouter = typeof appRouter;
