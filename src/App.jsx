import { useEffect, useMemo, useState } from "react";
import MoltenMetal from "./MoltenMetal";

const CONTACT = {
  name: "Valdecir Micarelli",
  role: "Atendimento personalizado para ajudar você a encontrar o carro ideal.",

  // Opcional.
  photo: "./valdecir.png",

  // Coloque somente números.
  whatsapp: "5511996321637",

  instagram: "micarelli",

  website: "https://www.micarelli.com/",

  email: "valdi_mica@hotmail.com",

  logo:
    "./clube-logo.svg",
};

function Icon({ type }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  if (type === "whatsapp") {
    return (
      <svg {...common}>
        <path d="M20.5 11.5a8.38 8.38 0 0 1-9 8.36 8.5 8.5 0 0 1-3.7-.98L3 20l1.18-4.62A8.5 8.5 0 1 1 20.5 11.5Z" />
        <path d="M8.6 7.8c.17-.38.36-.39.53-.4h.46c.14 0 .34.05.51.43l.73 1.77c.09.22.05.41-.04.58l-.53.72c-.14.18-.28.34-.11.64.17.3.74 1.2 1.6 1.94 1.1.95 2.03 1.25 2.32 1.39.29.14.46.12.63-.07l.81-.94c.19-.22.39-.18.65-.09l1.69.8c.27.13.45.2.52.31.07.11.07.65-.15 1.28-.22.63-1.29 1.2-1.78 1.28" />
      </svg>
    );
  }

  if (type === "instagram") {
    return (
      <svg {...common}>
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="5"
        />
        <circle
          cx="12"
          cy="12"
          r="4"
        />
        <circle
          cx="17.5"
          cy="6.5"
          r=".8"
          fill="currentColor"
          stroke="none"
        />
      </svg>
    );
  }

  if (type === "globe") {
    return (
      <svg {...common}>
        <circle
          cx="12"
          cy="12"
          r="9"
        />
        <path d="M3 12h18" />
        <path d="M12 3a14 14 0 0 1 0 18" />
        <path d="M12 3a14 14 0 0 0 0 18" />
      </svg>
    );
  }

  if (type === "mail") {
    return (
      <svg {...common}>
        <rect
          x="3"
          y="5"
          width="18"
          height="14"
          rx="3"
        />
        <path d="m4 7 8 6 8-6" />
      </svg>
    );
  }

  if (type === "user") {
    return (
      <svg {...common}>
        <circle
          cx="12"
          cy="8"
          r="4"
        />
        <path d="M4.5 21a7.5 7.5 0 0 1 15 0" />
      </svg>
    );
  }

  if (type === "download") {
    return (
      <svg {...common}>
        <path d="M12 3v12" />
        <path d="m7 10 5 5 5-5" />
        <path d="M5 21h14" />
      </svg>
    );
  }

  if (type === "arrow") {
    return (
      <svg {...common}>
        <path d="M5 12h14" />
        <path d="m14 7 5 5-5 5" />
      </svg>
    );
  }

  return null;
}

function App() {
  const links = useMemo(
    () => [
      {
        type: "whatsapp",
        title: "WhatsApp",
        subtitle: "Fale comigo agora",
        url: `https://wa.me/${CONTACT.whatsapp}`,
        featured: true,
      },
      {
        type: "instagram",
        title: "Instagram",
        subtitle: `@${CONTACT.instagram}`,
        url: `https://instagram.com/${CONTACT.instagram}`,
      },
      {
        type: "globe",
        title: "Site da Loja",
        subtitle: "Acesse nosso site",
        url: CONTACT.website,
      },
      {
        type: "mail",
        title: "E-mail",
        subtitle: CONTACT.email,
        url: `mailto:${CONTACT.email}`,
      },
    ],
    []
  );

  const [shiningButton, setShiningButton] = useState(-1);

  /*
   * Faz o brilho aparecer aleatoriamente
   * em um dos botões.
   */
  useEffect(() => {
    let startTimeout;
    let finishTimeout;

    let cancelled = false;

    const scheduleGlow = () => {
      const delay = 2800 + Math.random() * 4200;

      startTimeout = window.setTimeout(() => {
        if (cancelled) return;

        const randomIndex = Math.floor(
          Math.random() * links.length
        );

        setShiningButton(randomIndex);

        finishTimeout = window.setTimeout(() => {
          if (cancelled) return;

          setShiningButton(-1);

          scheduleGlow();
        }, 1100);
      }, delay);
    };

    scheduleGlow();

    return () => {
      cancelled = true;

      window.clearTimeout(startTimeout);
      window.clearTimeout(finishTimeout);
    };
  }, [links.length]);

  const downloadVCard = () => {
    const vcard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `FN:${CONTACT.name}`,
      `ORG:Valdecir Micarelli`,
      `TEL;TYPE=CELL:+${CONTACT.whatsapp}`,
      `EMAIL:${CONTACT.email}`,
      `URL:${CONTACT.website}`,
      "END:VCARD",
    ].join("\n");

    const blob = new Blob([vcard], {
      type: "text/vcard;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = `${CONTACT.name
      .toLowerCase()
      .replace(/\s+/g, "-")}.vcf`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <main className="page">
      <section className="profile-card">

        {/* HERO */}
        <header className="hero">

          <div className="molten-wrapper">
            <MoltenMetal
              color1="#84CC16"
              color2="#10B981"
              color3="#FFFFFF"
              speed={0.35}
              scale={4}
              detail={3}
              glow={1.6}
              coreSize={0.1}
              swirl={1}
              fold={-0.2}
              blackPoint={0.05}
              brightness={1.3}
              colorMode="molten"
              grain
              grainIntensity={0.05}
              mouseInteraction={false}
              mouseStrength={0.3}
              opacity={1}
            />
          </div>

          <div className="hero-dark-overlay" />

          <div className="hero-glow hero-glow-one" />
          <div className="hero-glow hero-glow-two" />

          <div className="hero-content">
            <div className="brand-glass">
              <img
                className="brand-logo"
                src={CONTACT.logo}
                alt="Micarelli"
              />
            </div>

            <div className="hero-copy">
              <span className="availability">
                <span className="availability-dot" />
                Disponível para atendimento
              </span>

              <h1>
                Seu próximo carro
                <span> começa aqui.</span>
              </h1>
            </div>
          </div>

          <div className="hero-bottom-fade" />
        </header>

        {/* PERFIL */}
        <section className="profile-content">

          <div className="avatar-position">

            <div className="avatar-ring">

              {CONTACT.photo ? (
                <img
                  src={CONTACT.photo}
                  alt={CONTACT.name}
                  className="avatar-image"
                />
              ) : (
                <div className="avatar-placeholder">
                  <Icon type="user" />
                </div>
              )}

              <span className="online-indicator" />
            </div>

          </div>

          <div className="identity">

            <h2>{CONTACT.name}</h2>

            <p>{CONTACT.role}</p>

          </div>

          <div className="divider" />

          <div className="links">

            {links.map((item, index) => (
              <a
                key={item.title}
                href={item.url}
                target={
                  item.type === "mail"
                    ? undefined
                    : "_blank"
                }
                rel={
                  item.type === "mail"
                    ? undefined
                    : "noopener noreferrer"
                }
                className={[
                  "contact-button",
                  item.featured
                    ? "contact-button-featured"
                    : "",
                  shiningButton === index
                    ? "is-shining"
                    : "",
                ].join(" ")}
              >
                <span className="shine-layer" />

                <span className="contact-icon">
                  <Icon type={item.type} />
                </span>

                <span className="contact-text">

                  <strong>
                    {item.title}
                  </strong>

                  <small>
                    {item.subtitle}
                  </small>

                </span>

                <span className="contact-arrow">
                  <Icon type="arrow" />
                </span>
              </a>
            ))}

          </div>

          <button
            className="save-contact"
            onClick={downloadVCard}
          >
            <Icon type="download" />

            <span>
              Salvar contato
            </span>
          </button>

          <footer className="footer">

            <span>
              Clube do Auto
            </span>

            <span className="footer-dot" />

            <span>
              São Paulo
            </span>

          </footer>

        </section>

      </section>
    </main>
  );
}

export default App;