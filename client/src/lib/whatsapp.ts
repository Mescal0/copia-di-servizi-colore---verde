const WHATSAPP_NUMBER = "393384531102";
const DEFAULT_WHATSAPP_MESSAGE =
  "Salve! Sono nella zona della Valdinievole e ho bisogno di un imbianchino/giardiniere. Potete fissarmi un appuntamento gratuito di valutazione dell'intervento?";

export const whatsappPhoneHref = `tel:+${WHATSAPP_NUMBER}`;
export const whatsappDisplayNumber = "+39 338 453 1102";

export const getWhatsAppUrl = (message = DEFAULT_WHATSAPP_MESSAGE) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
