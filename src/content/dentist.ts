// Datos aprobados por el autor (P8). Un cambio aquí lo aprueba el autor.
export type DentistContent = {
  title: string;
  name: string;
  specialty: string;
  phone: { countryCode: string; number: string };
  whatsappMessage: string;
  bank: { name: string; holder: string; accountType: string; cardNumber: string };
  texts: {
    heading: string;
    whatsappButton: string;
    paymentHeading: string;
    copy: string;
    copied: string;
    copyFallback: string;
  };
};

export const dentist: DentistContent = {
  title: "C.D.",
  name: "José Ángel Jiménez Tapia",
  specialty: "Especialista en Ortodoncia",
  phone: { countryCode: "52", number: "7711437889" },
  whatsappMessage: "Hola, doctor. Quiero agendar una cita.",
  bank: {
    name: "BBVA",
    holder: "José Ángel Jiménez",
    accountType: "tarjeta de débito",
    // Sin espacios: el agrupado lo hace src/lib/digits.ts.
    cardNumber: "4152314621558397",
  },
  texts: {
    heading: "Agenda tu cita",
    whatsappButton: "Escríbeme por WhatsApp",
    paymentHeading: "Datos para tu pago",
    copy: "Copiar",
    copied: "Copiado",
    copyFallback: "Mantén presionado para copiar",
  },
};
