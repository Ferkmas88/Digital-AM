import { useEffect, useMemo, useState } from "react";

const content = {
  es: {
    metaTitle:
      "Agencia de Marketing Digital en Louisville, KY | SEO Local y Generacion de Leads | Digital AM",
    metaDescription:
      "Digital AM ayuda a negocios en Louisville a crecer con SEO Local, optimizacion de Google Business y sitios web de alta conversion para generar leads calificados.",
    ogTitle: "Agencia de Marketing Digital en Louisville, KY | Digital AM",
    ogDescription:
      "SEO local en Louisville, optimizacion de Google Business, diseno web y sistemas de generacion de leads para crecimiento real.",
    twitterTitle: "Agencia de Marketing Digital en Louisville, KY | Digital AM",
    twitterDescription:
      "Sistemas de SEO local y generacion de leads para que negocios de Louisville dominen su visibilidad.",
    schemaDescription:
      "Digital AM es una agencia de marketing digital en Louisville, KY enfocada en SEO Local, optimizacion de Google Business, diseno web y generacion de leads.",
    nav: {
      services: "Servicios",
      industries: "Industrias",
      process: "Proceso",
      results: "Resultados",
      cta: "Agenda Llamada Gratis",
    },
    hero: {
      eyebrow: "Agencia de Marketing Digital en Louisville, KY",
      title: "Domina tu mercado local en Louisville.",
      lead:
        "Ayudamos a negocios locales en Louisville a generar leads calificados de forma constante con posicionamiento estrategico en Google, SEO y sistemas de conversion.",
      primary: "Agenda Llamada Gratis",
      secondary: "Solicita una Auditoria Gratis",
    },
    authority: {
      title: "Construido para crecimiento local en Louisville, KY.",
      copy:
        "La mayoria de negocios locales son invisibles online. Digital AM crea sistemas estrategicos para posicionar tu negocio justo donde tus compradores ya estan buscando.",
      services: [
        {
          title: "Dominio de SEO Local",
          desc: "Posicionate donde tus clientes estan buscando en Louisville.",
        },
        {
          title: "Optimizacion de Google Business",
          desc: "Convierte tu perfil de Google en una maquina de leads.",
        },
        {
          title: "Sitios Web Enfocados en Conversion",
          desc: "Webs pensadas para generar leads, no solo verse bien.",
        },
        {
          title: "Sistemas de Captura de Leads",
          desc: "Seguimiento automatizado para no perder ningun prospecto.",
        },
      ],
    },
    industries: {
      title: "Soluciones estrategicas para industrias locales de alta oportunidad",
      cards: [
        {
          title: "Para empresas de limpieza en Louisville",
          desc:
            "Genera solicitudes de reserva cada mes con posicionamiento en Google y visibilidad basada en confianza.",
          bullets: [
            "Estrategia de posicionamiento en Google Maps",
            "Landing pages optimizadas para reservas",
            "Sistema de generacion de reseñas",
            "Captura de leads y seguimiento automatizado",
          ],
          cta: "Haz crecer mi negocio de limpieza",
        },
        {
          title: "Para pequenos negocios en Louisville",
          desc: "Convierte visitas online en clientes calificados listos para comprar o reservar.",
          bullets: [
            "Landing pages de alta conversion para tus servicios",
            "Formularios de contacto y cotizacion optimizados",
            "Optimizacion de autoridad en Google Business",
            "SEO local enfocado en intencion de compra",
          ],
          cta: "Generar mas clientes para mi negocio",
        },
      ],
    },
    process: {
      title: "Un sistema claro. Sin adivinar.",
      steps: [
        { title: "Auditar", description: "Identificamos brechas de visibilidad e ingresos perdidos." },
        { title: "Construir", description: "Implementamos una base digital estrategica." },
        { title: "Optimizar", description: "Mejoramos segun datos reales de rendimiento." },
        { title: "Escalar", description: "Aumentamos visibilidad y tasas de conversion." },
      ],
    },
    results: {
      title: "Crecimiento real. Impacto medible.",
      metrics: [
        { value: "+40%", label: "Aumento en visibilidad local" },
        { value: "3X", label: "Mas consultas mensuales" },
        { value: "30 Dias", label: "Framework de implementacion" },
        { value: "Alta Intencion", label: "Generacion de leads" },
      ],
    },
    contact: {
      title: "Listo para liderar tu mercado en Louisville?",
      copy: "Tus competidores ya estan invirtiendo en visibilidad. La pregunta es: tu tambien?",
      primary: "Agenda tu llamada estrategica gratis",
      formTitle: "Solicita tu estrategia",
      fields: {
        name: "Nombre",
        businessType: "Tipo de negocio",
        phone: "Telefono",
        email: "Email",
        message: "Mensaje",
      },
      submit: "Enviar solicitud",
      success: "Gracias. Te contactaremos en breve.",
    },
    footer: {
      line1: "Digital AM - Agencia de Marketing Digital en Louisville",
      line2: "SEO Local | Google Business | Generacion de Leads",
    },
    whatsapp: "WhatsApp",
  },
  en: {
    metaTitle:
      "Digital Marketing Agency in Louisville, KY | Local SEO & Lead Generation | Digital AM",
    metaDescription:
      "Digital AM helps Louisville businesses grow with Local SEO, Google Business optimization, and conversion-focused websites that generate qualified leads.",
    ogTitle: "Digital Marketing Agency in Louisville, KY | Digital AM",
    ogDescription:
      "Local SEO Louisville KY, Google Business optimization, website design, and lead generation systems for serious local business growth.",
    twitterTitle: "Digital Marketing Agency in Louisville, KY | Digital AM",
    twitterDescription:
      "Lead generation and local SEO systems built to help Louisville businesses dominate local search visibility.",
    schemaDescription:
      "Digital AM is a digital marketing agency in Louisville, KY focused on Local SEO, Google Business optimization, website design, and lead generation.",
    nav: {
      services: "Services",
      industries: "Industries",
      process: "Process",
      results: "Results",
      cta: "Book Free Strategy Call",
    },
    hero: {
      eyebrow: "Digital Marketing Agency in Louisville, KY",
      title: "Dominate Your Local Market in Louisville.",
      lead:
        "We help local businesses in Louisville generate consistent, qualified leads using strategic Google positioning, SEO, and high-conversion systems.",
      primary: "Book Free Strategy Call",
      secondary: "Get a Free Audit",
    },
    authority: {
      title: "Built for Local Growth in Louisville, KY.",
      copy:
        "Most local businesses are invisible online. Digital AM builds strategic systems that position your business where buyers are already searching.",
      services: [
        {
          title: "Local SEO Domination",
          desc: "Rank where your customers are searching in Louisville.",
        },
        {
          title: "Google Business Optimization",
          desc: "Turn your Google profile into a lead machine.",
        },
        {
          title: "Conversion-Focused Websites",
          desc: "Websites designed to generate leads, not just look good.",
        },
        {
          title: "Lead Capture Systems",
          desc: "Automated follow-up systems so no prospect is lost.",
        },
      ],
    },
    industries: {
      title: "Strategic Solutions for High-Opportunity Local Industries",
      cards: [
        {
          title: "For Cleaning Companies in Louisville",
          desc:
            "Generate consistent booking requests every month through optimized Google positioning and trust-based visibility.",
          bullets: [
            "Google Maps ranking strategy",
            "Booking-optimized landing pages",
            "Review generation system",
            "Lead capture and follow-up automation",
          ],
          cta: "Grow My Cleaning Business",
        },
        {
          title: "For Small Businesses in Louisville",
          desc: "Turn online visits into qualified customers ready to buy or book.",
          bullets: [
            "High-conversion landing pages for your services",
            "Optimized contact and quote forms",
            "Google Business authority optimization",
            "Local SEO targeting buyer intent",
          ],
          cta: "Generate More Customers for My Business",
        },
      ],
    },
    process: {
      title: "A Clear System. No Guessing.",
      steps: [
        { title: "Audit", description: "Identify visibility gaps and missed revenue." },
        { title: "Build", description: "Implement a strategic digital foundation." },
        { title: "Optimize", description: "Improve based on performance data." },
        { title: "Scale", description: "Increase visibility and conversion rates." },
      ],
    },
    results: {
      title: "Real Growth. Measurable Impact.",
      metrics: [
        { value: "+40%", label: "Local Visibility Increase" },
        { value: "3X", label: "More Monthly Inquiries" },
        { value: "30-Day", label: "Implementation Framework" },
        { value: "High-Intent", label: "Lead Generation" },
      ],
    },
    contact: {
      title: "Ready to Lead Your Market in Louisville?",
      copy: "Your competitors are already investing in visibility. The question is: are you?",
      primary: "Book Your Free Strategy Call",
      formTitle: "Request your strategy",
      fields: {
        name: "Name",
        businessType: "Business Type",
        phone: "Phone",
        email: "Email",
        message: "Message",
      },
      submit: "Send Request",
      success: "Thanks. We will contact you shortly.",
    },
    footer: {
      line1: "Digital AM - Louisville Digital Marketing Agency",
      line2: "Local SEO | Google Business | Lead Generation",
    },
    whatsapp: "WhatsApp",
  },
};

function setMetaByName(name, value) {
  const el = document.querySelector(`meta[name='${name}']`);
  if (el) el.setAttribute("content", value);
}

function setMetaByProperty(property, value) {
  const el = document.querySelector(`meta[property='${property}']`);
  if (el) el.setAttribute("content", value);
}

export default function App() {
  const [lang, setLang] = useState(() => localStorage.getItem("lang") || "es");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const t = content[lang] || content.es;

  const localBusinessSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Digital AM",
      image: "https://digitalamwebsites.com/logo-digital-am.png",
      logo: "https://digitalamwebsites.com/logo-digital-am.png",
      url: "https://digitalamwebsites.com",
      telephone: "+1-830-475-0779",
      email: "contact@digitalamwebsites.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Louisville",
        addressRegion: "KY",
        addressCountry: "US",
      },
      areaServed: "Louisville, Kentucky",
      priceRange: "$$",
      inLanguage: lang === "es" ? "es" : "en",
      description: t.schemaDescription,
    }),
    [lang, t.schemaDescription]
  );

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
    document.title = t.metaTitle;
    setMetaByName("description", t.metaDescription);
    setMetaByProperty("og:title", t.ogTitle);
    setMetaByProperty("og:description", t.ogDescription);
    setMetaByName("twitter:title", t.twitterTitle);
    setMetaByName("twitter:description", t.twitterDescription);
    setFormSent(false);
  }, [lang, t]);

  const closeMobile = () => setMenuOpen(false);

  const onSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const required = ["name", "businessType", "phone", "email"];
    const isValid = required.every((field) => String(formData.get(field) || "").trim());
    if (!isValid) return;
    event.currentTarget.reset();
    setFormSent(true);
  };

  return (
    <>
      <header className={`site-header ${isScrolled ? "site-header--scrolled" : ""}`}>
        <div className="container nav-row">
          <a href="#top" className="brand" onClick={closeMobile}>
            <img src="/logo-digital-am.png" alt="Digital AM" className="brand-logo" />
            <span className="brand-text">Digital AM</span>
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span />
            <span />
            <span />
          </button>

          <nav className={`nav ${menuOpen ? "nav--open" : ""}`}>
            <a href="#services" onClick={closeMobile}>
              {t.nav.services}
            </a>
            <a href="#industries" onClick={closeMobile}>
              {t.nav.industries}
            </a>
            <a href="#process" onClick={closeMobile}>
              {t.nav.process}
            </a>
            <a href="#results" onClick={closeMobile}>
              {t.nav.results}
            </a>
            <div className="lang-switch" role="group" aria-label="Language switcher">
              <button
                type="button"
                className={`lang-btn ${lang === "es" ? "active" : ""}`}
                onClick={() => setLang("es")}
              >
                ES
              </button>
              <button
                type="button"
                className={`lang-btn ${lang === "en" ? "active" : ""}`}
                onClick={() => setLang("en")}
              >
                EN
              </button>
            </div>
            <a href="#contact" className="btn btn-primary" onClick={closeMobile}>
              {t.nav.cta}
            </a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="bg-grid" />
          <div className="container hero-inner reveal">
            <p className="eyebrow">{t.hero.eyebrow}</p>
            <h1>{t.hero.title}</h1>
            <p className="lead">{t.hero.lead}</p>
            <div className="hero-actions">
              <a href="#contact" className="btn btn-primary">
                {t.hero.primary}
              </a>
              <a href="#contact" className="btn btn-outline">
                {t.hero.secondary}
              </a>
            </div>
          </div>
        </section>

        <section id="services" className="section reveal">
          <div className="container">
            <h2>{t.authority.title}</h2>
            <p className="section-copy">{t.authority.copy}</p>

            <div className="cards four-col">
              {t.authority.services.map((service) => (
                <article className="card" key={service.title}>
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="industries" className="section section-muted reveal">
          <div className="container">
            <h2>{t.industries.title}</h2>

            <div className="cards two-col">
              {t.industries.cards.map((card) => (
                <article className="card feature-card" key={card.title}>
                  <h3>{card.title}</h3>
                  <p>{card.desc}</p>
                  <ul>
                    {card.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                  <a href="#contact" className="btn btn-primary">
                    {card.cta}
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="section reveal">
          <div className="container">
            <h2>{t.process.title}</h2>
            <div className="process-row">
              {t.process.steps.map((step, index) => (
                <article key={step.title} className="process-item card">
                  <span className="step-number">{index + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="results" className="section section-muted reveal">
          <div className="container">
            <h2>{t.results.title}</h2>
            <div className="cards four-col metrics">
              {t.results.metrics.map((metric) => (
                <article key={`${metric.value}-${metric.label}`} className="metric-card card">
                  <p className="metric-value">{metric.value}</p>
                  <p className="metric-label">{metric.label}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section reveal">
          <div className="container contact-wrap">
            <div className="contact-copy">
              <h2>{t.contact.title}</h2>
              <p>{t.contact.copy}</p>
              <a href="#contact-form" className="btn btn-primary">
                {t.contact.primary}
              </a>
            </div>

            <form id="contact-form" className="contact-form card" onSubmit={onSubmit}>
              <h3 className="full-width">{t.contact.formTitle}</h3>
              <label>
                {t.contact.fields.name}
                <input type="text" name="name" required />
              </label>
              <label>
                {t.contact.fields.businessType}
                <input type="text" name="businessType" required />
              </label>
              <label>
                {t.contact.fields.phone}
                <input type="tel" name="phone" required />
              </label>
              <label>
                {t.contact.fields.email}
                <input type="email" name="email" required />
              </label>
              <label className="full-width">
                {t.contact.fields.message}
                <textarea name="message" rows="4" />
              </label>
              <button type="submit" className="btn btn-primary full-width">
                {t.contact.submit}
              </button>
              {formSent ? <p className="success-message full-width">{t.contact.success}</p> : null}
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-row">
          <p>{t.footer.line1}</p>
          <p>{t.footer.line2}</p>
        </div>
      </footer>

      <a
        href="https://wa.me/18304750779"
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <span>{t.whatsapp}</span>
      </a>

      <script
        key={lang}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
    </>
  );
}
