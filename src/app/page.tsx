import { dentist } from "@/content/dentist";
import { groupDigits } from "@/lib/digits";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import CopyButton from "./CopyButton";

export default function Home(): React.JSX.Element {
  const { phone, bank, texts } = dentist;
  const whatsappUrl = buildWhatsAppUrl(phone.countryCode, phone.number, dentist.whatsappMessage);
  // Un solo nodo de texto: C6 lo busca literal en out/index.html.
  const groupedCard = groupDigits(bank.cardNumber);
  const fullName = `${dentist.title} ${dentist.name}`;

  return (
    <main>
      <header>
        <h1>{fullName}</h1>
        <p className="specialty">{dentist.specialty}</p>
      </header>

      <section aria-labelledby="contact-heading">
        <h2 id="contact-heading">{texts.heading}</h2>
        <a className="button whatsapp" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
          {texts.whatsappButton}
        </a>
      </section>

      <section aria-labelledby="payment-heading">
        <h2 id="payment-heading">{texts.paymentHeading}</h2>
        <p className="bank">{bank.name}</p>
        <p>{bank.accountType}</p>
        <p>{bank.holder}</p>
        <p className="card">{groupedCard}</p>
        <CopyButton
          digits={bank.cardNumber}
          label={texts.copy}
          copiedLabel={texts.copied}
          fallbackLabel={texts.copyFallback}
        />
      </section>
    </main>
  );
}
