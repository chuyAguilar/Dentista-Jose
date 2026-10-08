// Datos aprobados por el autor (P8). Un cambio aquí lo aprueba el autor.
export type Service = { title: string; description: string };

export type Office = {
  id: string;
  name: string;
  street: string;
  area: string;
  city: string;
  hours: string;
};

export type Step = { title: string; description: string };

export type DentistContent = {
  clinic: string;
  title: string;
  name: string;
  specialty: string;
  profession: string;
  licenses: string[];
  tagline: string;
  phone: { countryCode: string; number: string };
  whatsappMessage: string;
  services: Service[];
  offices: Office[];
  hoursNote: string;
  steps: Step[];
  bank: { name: string; holder: string; accountType: string; cardNumber: string };
  texts: {
    heading: string;
    whatsappButton: string;
    paymentHeading: string;
    copy: string;
    copied: string;
    copyFallback: string;
    servicesHeading: string;
    officesHeading: string;
    directions: string;
    contactLead: string;
    paymentLead: string;
    paymentNav: string;
    holderLabel: string;
    cardLabel: string;
    licensesLabel: string;
    callLabel: string;
  };
};

export const dentist: DentistContent = {
  clinic: "Integración Dental",
  title: "C.D.",
  name: "José Ángel Jiménez Tapia",
  specialty: "Especialista en Ortodoncia",
  profession: "Cirujano Dentista",
  // Cédulas profesionales (REF-01). La paridad las compara con la tarjeta.
  licenses: ["3490657", "6595318"],
  tagline: "Ortodoncia e implantes en Tula y Pachuca. Agenda tu cita por WhatsApp.",
  phone: { countryCode: "52", number: "7711437889" },
  whatsappMessage: "Hola, doctor. Quiero agendar una cita.",
  services: [
    {
      title: "Ortodoncia",
      description: "Alineamos tus dientes y corregimos tu mordida con un plan hecho a tu medida.",
    },
    {
      title: "Implantes",
      description: "Reponemos los dientes que te faltan con implantes que se ven y funcionan como los naturales.",
    },
  ],
  // Direcciones de REF-02 y REF-03. Los horarios son provisionales (A2).
  offices: [
    {
      id: "tula",
      name: "Consultorio Tula",
      street: "Cerrada Luis Monroy 101 A",
      area: "Col. San Marcos",
      city: "Tula, Hgo.",
      hours: "Lunes a sábado, 8:00 a 18:00",
    },
    {
      id: "pachuca",
      name: "Consultorio Pachuca",
      street: "Blvd. Valle de San Javier 528",
      area: "C.P. 42080",
      city: "Pachuca, Hgo.",
      hours: "Lunes a sábado, 8:00 a 18:00",
    },
  ],
  hoursNote: "Sujeto a cambios, confirma por WhatsApp.",
  // Solo describe el camino que ya existe en la página; no promete nada del consultorio.
  steps: [
    { title: "Escríbeme", description: "Toca el botón de WhatsApp. El mensaje ya va escrito." },
    { title: "Elige consultorio", description: "Dime si prefieres Tula o Pachuca y qué día te acomoda." },
    { title: "Confirma tu cita", description: "Te respondo con la hora disponible y listo." },
  ],
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
    servicesHeading: "Servicios",
    officesHeading: "Consultorios",
    directions: "Cómo llegar",
    contactLead: "Escríbeme y te respondo para apartar el día y la hora que mejor te queden.",
    paymentLead: "Puedes depositar o transferir a esta tarjeta. Toca «Copiar» y pega el número en la app de tu banco.",
    paymentNav: "Datos para tu pago",
    holderLabel: "Titular",
    cardLabel: "Tarjeta de débito",
    licensesLabel: "Cédulas profesionales",
    callLabel: "Llamar",
  },
};
