import { dentist } from "@/content/dentist";
import { groupDigits } from "@/lib/digits";
import { buildMapsUrl } from "@/lib/maps";
import { buildTelUrl, formatMxPhone } from "@/lib/phone";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import CopyButton from "./CopyButton";
import {
  AlignIcon,
  BadgeIcon,
  CardIcon,
  ClockIcon,
  ImplantIcon,
  PhoneIcon,
  PinIcon,
  ToothIcon,
  WhatsAppIcon,
} from "./icons";

const SERVICE_ICONS = [AlignIcon, ImplantIcon];

export default function Home(): React.JSX.Element {
  const { phone, bank, texts } = dentist;
  const whatsappUrl = buildWhatsAppUrl(phone.countryCode, phone.number, dentist.whatsappMessage);
  const telUrl = buildTelUrl(phone.countryCode, phone.number);
  // Un solo nodo de texto: la prueba del build lo busca literal en out/index.html.
  const groupedCard = groupDigits(bank.cardNumber);
  const fullName = `${dentist.title} ${dentist.name}`;

  return (
    <>
      <header className="topbar">
        <div className="wrap topbar-inner">
          <span className="brand">
            <ToothIcon className="brand-icon" />
            {dentist.clinic}
          </span>
          <a className="topbar-link" href={telUrl}>
            <PhoneIcon className="icon-sm" />
            {formatMxPhone(phone.number)}
          </a>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="wrap">
            <p className="eyebrow">{dentist.profession}</p>
            <h1>{fullName}</h1>
            <p className="specialty">{dentist.specialty}</p>
            <p className="tagline">{dentist.tagline}</p>
            <ul className="licenses" aria-label={texts.licensesLabel}>
              {dentist.licenses.map((license) => (
                <li key={license}>
                  <BadgeIcon className="icon-sm" />
                  Cédula {license}
                </li>
              ))}
            </ul>
            <div className="hero-actions">
              <a className="button whatsapp" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="icon" />
                {texts.whatsappButton}
              </a>
              <a className="button ghost" href="#pago">
                <CardIcon className="icon" />
                {texts.paymentNav}
              </a>
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="services-heading">
          <div className="wrap">
            <h2 id="services-heading">{texts.servicesHeading}</h2>
            <div className="grid">
              {dentist.services.map((service, index) => {
                const Icon = SERVICE_ICONS[index % SERVICE_ICONS.length];
                return (
                  <article className="card" key={service.title}>
                    <span className="card-icon">
                      <Icon className="icon" />
                    </span>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section alt" aria-labelledby="offices-heading">
          <div className="wrap">
            <h2 id="offices-heading">{texts.officesHeading}</h2>
            <div className="grid">
              {dentist.offices.map((office) => (
                <article className="card office" key={office.id}>
                  <h3>{office.name}</h3>
                  <p className="row">
                    <PinIcon className="icon-sm row-icon" />
                    <span>
                      {office.street}, {office.area}
                      <br />
                      {office.city}
                    </span>
                  </p>
                  <p className="row">
                    <ClockIcon className="icon-sm row-icon" />
                    <span>{office.hours}</span>
                  </p>
                  <a
                    className="button outline"
                    href={buildMapsUrl([office.street, office.area, office.city])}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${texts.directions}: ${office.name}`}
                  >
                    <PinIcon className="icon" />
                    {texts.directions}
                  </a>
                </article>
              ))}
            </div>
            <p className="note">{dentist.hoursNote}</p>
          </div>
        </section>

        <section className="section" aria-labelledby="contact-heading">
          <div className="wrap">
            <div className="cta">
              <h2 id="contact-heading">{texts.heading}</h2>
              <p>{texts.contactLead}</p>
              <ol className="steps">
                {dentist.steps.map((step, index) => (
                  <li key={step.title}>
                    <span className="step-number" aria-hidden="true">
                      {index + 1}
                    </span>
                    <span>
                      <strong>{step.title}</strong>
                      <br />
                      {step.description}
                    </span>
                  </li>
                ))}
              </ol>
              <a className="button whatsapp" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="icon" />
                {texts.whatsappButton}
              </a>
            </div>
          </div>
        </section>

        <section id="pago" className="section alt" aria-labelledby="payment-heading">
          <div className="wrap">
            <h2 id="payment-heading">{texts.paymentHeading}</h2>
            <p className="lead">{texts.paymentLead}</p>
            <div className="pay">
              <div className="pay-card">
                <p className="pay-bank">{bank.name}</p>
                <p className="pay-label">{texts.cardLabel}</p>
                <p className="pay-number">{groupedCard}</p>
                <p className="pay-label">{texts.holderLabel}</p>
                <p className="pay-holder">{bank.holder}</p>
              </div>
              <CopyButton
                digits={bank.cardNumber}
                label={texts.copy}
                copiedLabel={texts.copied}
                fallbackLabel={texts.copyFallback}
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap">
          <p className="footer-brand">
            <ToothIcon className="icon-sm" />
            {dentist.clinic}
          </p>
          <p>
            {fullName} · {dentist.specialty}
          </p>
          <p>
            {texts.licensesLabel}: {dentist.licenses.join(" · ")}
          </p>
          <p>
            <a href={telUrl}>
              {texts.callLabel}: {formatMxPhone(phone.number)}
            </a>
          </p>
        </div>
      </footer>

      <a
        className="fab"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={texts.whatsappButton}
      >
        <WhatsAppIcon className="icon-lg" />
      </a>
    </>
  );
}
