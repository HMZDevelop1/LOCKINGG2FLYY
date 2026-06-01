import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Globe, Mail, MapPin, Menu, Phone, Scissors, Sparkles, X } from "lucide-react";
import Lenis from "lenis";

const BRAND = "Looking2FlyyByMKash";
const LOGO = "/images/logo.png";
const INSTAGRAM = "https://www.instagram.com/looking2flyy._.bymkash/";
const TIKTOK = "https://www.tiktok.com/@looking2flyybymkash";
const MAPS = "https://maps.app.goo.gl/HkJgV5TAzphz6q1U8";
const GCAL = "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2mAzhPwgft50vqrC8X3G5VjLDVZH95me0Qugu4nXKPKbnUVmGVqOivbraemYZxtPZBG7DqcTGW";
const PHONE = "873-660-0144";
const PHONE_LINK = "tel:+18736600144";
const EMAIL = "Meaneatanganaowona@gmail.com";
const EMAIL_LINK = `mailto:${EMAIL}`;

const en = {
  nav: [
    ["home", "Home"],
    ["services", "Services"],
    ["prices", "Prices"],
    ["about", "Studio"],
    ["policies", "Policies"],
    ["gallery", "Gallery"],
    ["book", "Book"],
    ["contact", "Contact"],
  ],
  heroEyebrow: "Premium Hair Studio - Gatineau",
  heroTitle1: "Clean Locs, Braids",
  heroTitle2: "Made To Last",
  heroText: "Private appointments in Gatineau for locs, natural hair and extension styles with a polished finish.",
  bookCall: "Book a Call",
  seePrices: "See Prices",
  servicesTitle: "Services",
  servicesKicker: "Clean parts. Sharp finish. Flyy result.",
  servicesList: [
    ["Locs / Dreads", "Retwist, interlock, micro locs, crochet, barrels and protective styles for locs.", "/images/work/locs-dreads.jpg"],
    ["Natural Hair", "Cornrows, twists, braids, barrels and starter locs on natural hair.", "/images/work/natural-hair.jpg"],
    ["Extensions", "Knotless braids, boho knotless, twists, loc extensions and cornrows.", "/images/work/extensions.jpg"],
  ],
  pricesTitle: "Prices",
  pricesKicker: "Simple, clear, appointment-ready.",
  pricesData: [
    ["Locs / Dreads", [
      ["Simple retwist", "$55"],
      ["Interlock retwist", "$65"],
      ["Micro locs retwist", "$70"],
      ["Crochet retwist", "$180"],
      ["Half barrels", "$65"],
      ["Barrels", "$70"],
      ["Half barrels + 2 strand", "$75"],
      ["Cornrows", "$75"],
      ["2 Strand", "$75"],
      ["Braids", "$75"],
    ]],
    ["Natural Hair", [
      ["Half head cornrows", "$35"],
      ["Basic cornrows 4 or less", "$50"],
      ["Cornrows 6+", "$60"],
      ["Cornrows with design", "$60-$80"],
      ["Basic twist", "$60"],
      ["2 strand twist", "$70"],
      ["Braids", "$80"],
      ["Barrels", "$70"],
      ["Half barrels + half twist", "$75-$80"],
      ["Starter locs comb", "$120"],
      ["Starter locs crochet", "$200-$300"],
    ]],
    ["Extensions", [
      ["Knotless braids med/large", "$90-$120"],
      ["Boho knotless braids", "$120"],
      ["Twist", "$90"],
      ["Locs extension", "$300-$500"],
      ["Cornrows", "$85"],
    ]],
  ],
  pricesNote: "+$15 design - +$10 blow dry",
  aboutTitle: "Studio",
  aboutKicker: "Professional, private, polished.",
  aboutText: "Looking2FlyyByMKash is a premium hair service in Gatineau, designed for clean results, style and a comfortable appointment experience.",
  policiesTitle: "Policies",
  policiesKicker: "Please read before booking.",
  policiesList: [
    ["Wash your hair", "Hair must be washed before every appointment."],
    ["Cash only", "All payments are accepted in cash only."],
    ["2 people max", "You can bring a maximum of 2 people."],
    ["Cancellation", "Cancel at least 24 hours in advance."],
    ["$15 deposit", "Non-refundable deposit required."],
    ["Confirmation", "Contact by message to confirm your appointment."],
  ],
  galleryTitle: "Recent Work",
  galleryKicker: "A glimpse of the style.",
  galleryLink: "View more work on Instagram",
  galleryItems: [
    ["Loc Retwist", "Clean parts and fresh finish", "/images/work/loc-retwist.jpg"],
    ["Cornrows", "Natural protective styling", "/images/work/cornrows.jpg"],
    ["Knotless Braids", "Soft, neat extension work", "/images/work/knotless-braids.jpg"],
    ["Two Strand Twist", "Defined natural texture", "/images/work/two-strand.jpg"],
    ["Barrels", "Polished loc styling", "/images/work/barrels.jpg"],
    ["Starter Locs", "Fresh foundation work", "/images/work/starter-locs.jpg"],
  ],
  bookTitle: "Book",
  bookKicker: "Book in one click via Google Calendar.",
  bookHeading: "Book your appointment",
  bookText: "Pick a time that works for you via Google Calendar. Simple, fast and secure.",
  bookBtn: "Schedule Appointment",
  bookNote: "You will be redirected to Google Calendar to complete your booking.",
  contactTitle: "Contact",
  contactKicker: "Booking and information.",
  scheduleBtn: "Schedule Appointment",
  footerText: "Designed by",
};

const fr = {
  nav: [
    ["home", "Accueil"],
    ["services", "Services"],
    ["prices", "Prix"],
    ["about", "Studio"],
    ["policies", "Règles"],
    ["gallery", "Galerie"],
    ["book", "Book"],
    ["contact", "Contact"],
  ],
  heroEyebrow: "Salon de coiffure premium - Gatineau",
  heroTitle1: "Locs propres, tresses",
  heroTitle2: "Faites pour durer",
  heroText: "Rendez-vous prives a Gatineau pour locs, cheveux naturels et extensions avec une finition soignee.",
  bookCall: "Reserver",
  seePrices: "Voir les prix",
  servicesTitle: "Services",
  servicesKicker: "Tranches nettes. Fini precis. Resultat flyy.",
  servicesList: [
    ["Locs / Dreads", "Retwist, interlock, micro locs, crochet, barrels et styles protecteurs pour locs.", "/images/work/locs-dreads.jpg"],
    ["Naturels", "Cornrows, twists, braids, barrels et starter locs sur cheveux naturels.", "/images/work/natural-hair.jpg"],
    ["Extensions", "Knotless braids, boho knotless, twists, loc extensions et cornrows.", "/images/work/extensions.jpg"],
  ],
  pricesTitle: "Prix",
  pricesKicker: "Simple, clair, pret pour votre rendez-vous.",
  pricesData: [
    ["Locs / Dreads", [
      ["Simple retwist", "$55"],
      ["Interlock retwist", "$65"],
      ["Micro locs retwist", "$70"],
      ["Crochet retwist", "$180"],
      ["Demi-barrels", "$65"],
      ["Barrels", "$70"],
      ["Demi-barrels + 2 strand", "$75"],
      ["Cornrows", "$75"],
      ["2 Strand", "$75"],
      ["Braids", "$75"],
    ]],
    ["Cheveux naturels", [
      ["Demi-tete cornrows", "$35"],
      ["Cornrows basiques 4 ou moins", "$50"],
      ["Cornrows 6+", "$60"],
      ["Cornrows avec motif", "$60-$80"],
      ["Twist basique", "$60"],
      ["2 strand twist", "$70"],
      ["Braids", "$80"],
      ["Barrels", "$70"],
      ["Demi-barrels + demi-twist", "$75-$80"],
      ["Starter locs peigne", "$120"],
      ["Starter locs crochet", "$200-$300"],
    ]],
    ["Extensions", [
      ["Knotless braids moy/grand", "$90-$120"],
      ["Boho knotless braids", "$120"],
      ["Twist", "$90"],
      ["Extension locs", "$300-$500"],
      ["Cornrows", "$85"],
    ]],
  ],
  pricesNote: "+$15 motif - +$10 sechage",
  aboutTitle: "Studio",
  aboutKicker: "Professionnel, prive, soigne.",
  aboutText: "Looking2FlyyByMKash est un service hair premium a Gatineau, pense pour des resultats propres, styles et une experience de rendez-vous confortable.",
  policiesTitle: "Regles",
  policiesKicker: "A lire avant de reserver.",
  policiesList: [
    ["Lavez vos cheveux", "Les cheveux doivent etre lave avant chaque rendez-vous."],
    ["Comptant seulement", "Tous les paiements sont acceptes en comptant seulement."],
    ["2 personnes max", "Vous pouvez amener un maximum de 2 personnes."],
    ["Annulation", "Annulez au moins 24 heures a l'avance."],
    ["Depot $15", "Depot non-remboursable requis."],
    ["Confirmation", "Contactez par message pour confirmer votre rendez-vous."],
  ],
  galleryTitle: "Travaux recents",
  galleryKicker: "Un apercu du style.",
  galleryLink: "Voir plus sur Instagram",
  galleryItems: [
    ["Loc Retwist", "Tranches propres et fini frais", "/images/work/loc-retwist.jpg"],
    ["Cornrows", "Coiffure naturelle protectrice", "/images/work/cornrows.jpg"],
    ["Knotless Braids", "Extension douce et soignee", "/images/work/knotless-braids.jpg"],
    ["Two Strand Twist", "Texture naturelle definie", "/images/work/two-strand.jpg"],
    ["Barrels", "Coiffure locs soignee", "/images/work/barrels.jpg"],
    ["Starter Locs", "Travail de base frais", "/images/work/starter-locs.jpg"],
  ],
  bookTitle: "Book",
  bookKicker: "Reservez en un clic via Google Calendar.",
  bookHeading: "Reservez votre rendez-vous",
  bookText: "Choisissez le creneau qui vous arrange via Google Calendar. Simple, rapide et securise.",
  bookBtn: "Prendre rendez-vous",
  bookNote: "Vous serez redirige vers Google Calendar pour completer votre reservation.",
  contactTitle: "Contact",
  contactKicker: "Reservation et informations.",
  scheduleBtn: "Prendre rendez-vous",
  footerText: "Concu par",
};

const LangContext = createContext();

function useLang() {
  return useContext(LangContext);
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5.2" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.2" cy="6.8" r="1.15" className="icon-dot" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M15.35 3c.27 2.2 1.58 3.86 3.87 4.18v3.02a7.06 7.06 0 0 1-3.78-1.13v5.82A5.25 5.25 0 1 1 10.2 9.7c.28 0 .55.02.81.07v3.18a2.05 2.05 0 1 0 1.42 1.95V3h2.92Z" />
    </svg>
  );
}

function Logo({ className = "", animated = false }) {
  const [error, setError] = useState(false);
  return (
    <div className={`logo-shell ${animated ? "logo-shell-hero" : ""} ${className}`}>
      {!error ? (
        <img src={LOGO} alt={BRAND} loading="lazy" decoding="async" onError={() => setError(true)} />
      ) : (
        <div className="logo-fallback">
          <span>Looking</span>
          <strong>2 Flyy</strong>
          <small>By MKash</small>
        </div>
      )}
    </div>
  );
}

function WorkImage({ src, title, text, className = "" }) {
  const [error, setError] = useState(false);
  return (
    <div className={`work-image ${className}`}>
      <img src={error ? LOGO : src} alt={title} loading="lazy" decoding="async" onError={() => setError(true)} />
      <div className="work-image-label">
        <strong>{title}</strong>
        {text && <span>{text}</span>}
      </div>
    </div>
  );
}

function SocialLink({ href, label, children }) {
  return (
    <a className="icon-button" href={href} target="_blank" rel="noreferrer" aria-label={label}>
      {children}
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const navRef = useRef(null);
  const indicatorRef = useRef(null);
  const { t, lang, setLang } = useLang();
  const langs = ["en", "fr"];

  const go = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  }, []);

  useEffect(() => {
    const ids = t.nav.map(([id]) => id);
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
      );
      observer.observe(el);
      return observer;
    }).filter(Boolean);
    return () => observers.forEach((o) => o.disconnect());
  }, [t]);

  useEffect(() => {
    const nav = navRef.current;
    const indicator = indicatorRef.current;
    if (!nav || !indicator) return;
    const activeBtn = nav.querySelector(`[data-section="${active}"]`);
    if (activeBtn) {
      const navRect = nav.getBoundingClientRect();
      const btnRect = activeBtn.getBoundingClientRect();
      indicator.style.width = `${btnRect.width}px`;
      indicator.style.transform = `translateX(${btnRect.left - navRect.left}px)`;
    }
  }, [active]);

  const toggleLang = () => setLang(lang === "en" ? "fr" : "en");

  return (
    <header className="site-header">
      <div className="header-inner">
        <button className="brand-mark" onClick={() => go("home")} aria-label="Home">
          <Logo />
          <span>{BRAND}</span>
        </button>

        <nav className="desktop-nav" ref={navRef} aria-label={lang === "en" ? "Main navigation" : "Navigation principale"}>
          <div className="nav-indicator" ref={indicatorRef} />
          {t.nav.map(([id, label]) => (
            <button
              key={id}
              data-section={id}
              className={`nav-link ${active === id ? "nav-link-active" : ""}`}
              onClick={() => go(id)}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="header-actions">
          <button className="lang-toggle" onClick={toggleLang} aria-label="Toggle language">
            <Globe size={14} />
            <span>{lang === "en" ? "FR" : "EN"}</span>
          </button>
          <SocialLink href={INSTAGRAM} label="Instagram"><InstagramIcon /></SocialLink>
          <SocialLink href={TIKTOK} label="TikTok"><TikTokIcon /></SocialLink>
          <a className="book-pill" href={GCAL} target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            {t.bookCall}
          </a>
          <button className="menu-button" onClick={() => setOpen((v) => !v)} aria-label="Menu">
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>

      <motion.nav
        className="mobile-nav"
        aria-label={lang === "en" ? "Mobile navigation" : "Navigation mobile"}
        initial={false}
        animate={open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mobile-nav-inner">
          {t.nav.map(([id, label]) => (
            <button
              key={id}
              className={`mobile-nav-link ${active === id ? "mobile-nav-link-active" : ""}`}
              onClick={() => go(id)}
            >
              {active === id && <span className="mobile-active-dot" />}
              {label}
            </button>
          ))}
          <button className="mobile-nav-link mobile-nav-lang" onClick={toggleLang}>
            <Globe size={12} />
            {lang === "en" ? "FR" : "EN"}
          </button>
        </div>
      </motion.nav>
    </header>
  );
}

function Hero() {
  const { t } = useLang();
  return (
    <section id="home" className="hero">
      <div className="hero-grid">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow"><Sparkles size={15} /> {t.heroEyebrow}</p>
          <h1>{t.heroTitle1}<br /><span>{t.heroTitle2}</span></h1>
          <p className="hero-text">{t.heroText}</p>
          <div className="hero-buttons">
            <a className="gcal-button" href={GCAL} target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              {t.bookCall}
            </a>
            <button className="secondary-button" onClick={() => {
              const el = document.getElementById("prices");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}>
              <Scissors size={18} /> {t.seePrices}
            </button>
          </div>
        </motion.div>

        <motion.div
          className="hero-art"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="logo-orbit"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="hero-logo-card"
            animate={{ y: [0, -12, 0], rotateY: [-8, 10, -8], rotateX: [4, -3, 4] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.05, rotateY: -16, transition: { duration: 0.4 } }}
          >
            <Logo animated />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Section({ id, title, kicker, children }) {
  return (
    <motion.section
      id={id}
      className="section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: { opacity: 0, y: 40, rotateX: -6 },
        visible: { opacity: 1, y: 0, rotateX: 0 },
      }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="section-inner section-stage">
        {kicker && <p className="section-kicker">{kicker}</p>}
        <h2>{title}</h2>
        {children}
      </div>
    </motion.section>
  );
}

function Services() {
  const { t } = useLang();
  const stagger = useMemo(() => ({
    hidden: {},
    visible: { transition: { staggerChildren: 0.09 } },
  }), []);
  const card3d = useMemo(() => ({
    hidden: { opacity: 0, y: 32, rotateX: -10, rotateY: 3, scale: 0.95 },
    visible: { opacity: 1, y: 0, rotateX: 0, rotateY: 0, scale: 1 },
  }), []);

  return (
    <Section id="services" title={t.servicesTitle} kicker={t.servicesKicker}>
      <motion.div className="service-grid" variants={stagger}>
        {t.servicesList.map(([title, text, image], index) => (
          <motion.article
            key={title}
            className="service-card lift-card"
            variants={card3d}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{
              y: -10, rotateX: 5, rotateY: index % 2 ? 5 : -5, scale: 1.015,
              transition: { duration: 0.35 },
            }}
          >
            <WorkImage src={image} title={title} className="service-work-image" />
            <div className="service-card-content">
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  );
}

function Prices() {
  const { t } = useLang();
  const stagger = useMemo(() => ({
    hidden: {},
    visible: { transition: { staggerChildren: 0.09 } },
  }), []);
  const card3d = useMemo(() => ({
    hidden: { opacity: 0, y: 32, rotateX: -10, rotateY: 3, scale: 0.95 },
    visible: { opacity: 1, y: 0, rotateX: 0, rotateY: 0, scale: 1 },
  }), []);

  return (
    <Section id="prices" title={t.pricesTitle} kicker={t.pricesKicker}>
      <motion.div className="price-grid" variants={stagger}>
        {t.pricesData.map(([title, items]) => (
          <motion.article
            className="price-card lift-card"
            key={title}
            variants={card3d}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{
              y: -8, rotateX: 4, rotateY: -3, scale: 1.012,
              transition: { duration: 0.35 },
            }}
          >
            <h3>{title}</h3>
            {items.map(([name, price]) => (
              <div className="price-row" key={name}>
                <span>{name}</span>
                <strong>{price}</strong>
              </div>
            ))}
          </motion.article>
        ))}
      </motion.div>
      <motion.div
        className="note-card lift-card"
        variants={card3d}
        whileHover={{ rotateX: 4, y: -4, transition: { duration: 0.3 } }}
      >
        {t.pricesNote}
      </motion.div>
    </Section>
  );
}

function About() {
  const { t } = useLang();
  const card3d = useMemo(() => ({
    hidden: { opacity: 0, y: 32, rotateX: -10, rotateY: 3, scale: 0.95 },
    visible: { opacity: 1, y: 0, rotateX: 0, rotateY: 0, scale: 1 },
  }), []);

  return (
    <Section id="about" title={t.aboutTitle} kicker={t.aboutKicker}>
      <motion.div className="studio-scene" variants={card3d} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
        <motion.div
          className="studio-art"
          animate={{ y: [0, -10, 0], rotateY: [-10, 11, -10], rotateX: [4, -3, 4] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div className="studio-orbit" animate={{ rotate: 360 }} transition={{ duration: 24, repeat: Infinity, ease: "linear" }} />
          <div className="studio-glow" />
          <Logo animated />
        </motion.div>
        <motion.div
          className="about-panel studio-panel lift-card"
          variants={{ hover: { rotateY: -4, rotateX: 3, y: -6 } }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <p>{t.aboutText}</p>
          <motion.a className="map-button studio-map-card" href={MAPS} target="_blank" rel="noreferrer" whileHover={{ y: -3, rotateX: 4, scale: 1.012 }} whileTap={{ scale: 0.98 }}>
            <span className="map-pin-scene"><MapPin size={20} /><i /></span>
            <span>
              <strong>49 Rue Lemieux #1, Gatineau</strong>
            </span>
          </motion.a>
        </motion.div>
      </motion.div>
    </Section>
  );
}

function Policies() {
  const { t } = useLang();
  const stagger = useMemo(() => ({
    hidden: {},
    visible: { transition: { staggerChildren: 0.09 } },
  }), []);
  const card3d = useMemo(() => ({
    hidden: { opacity: 0, y: 32, rotateX: -10, rotateY: 3, scale: 0.95 },
    visible: { opacity: 1, y: 0, rotateX: 0, rotateY: 0, scale: 1 },
  }), []);

  return (
    <Section id="policies" title={t.policiesTitle} kicker={t.policiesKicker}>
      <motion.div className="policy-grid" variants={stagger}>
        {t.policiesList.map(([title, text], index) => (
          <motion.article
            key={title}
            className="policy-card lift-card"
            variants={card3d}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{
              y: -7, rotateX: 5, rotateY: index % 2 ? -4 : 4, scale: 1.015,
              transition: { duration: 0.3 },
            }}
          >
            <h3>{title}</h3>
            <p>{text}</p>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  );
}

function Gallery() {
  const { t } = useLang();
  const stagger = useMemo(() => ({
    hidden: {},
    visible: { transition: { staggerChildren: 0.09 } },
  }), []);
  const card3d = useMemo(() => ({
    hidden: { opacity: 0, y: 32, rotateX: -10, rotateY: 3, scale: 0.95 },
    visible: { opacity: 1, y: 0, rotateX: 0, rotateY: 0, scale: 1 },
  }), []);

  return (
    <Section id="gallery" title={t.galleryTitle} kicker={t.galleryKicker}>
      <button className="gallery-link" type="button" onClick={() => {
        const w = window.open(INSTAGRAM, "_blank", "noopener,noreferrer");
        if (!w) window.location.href = INSTAGRAM;
      }}>
        <InstagramIcon /> {t.galleryLink}
      </button>
      <motion.div className="gallery-grid" variants={stagger}>
        {t.galleryItems.map(([title, text, image], index) => (
          <motion.a
            key={title}
            href={INSTAGRAM}
            target="_blank"
            rel="noreferrer"
            className="gallery-tile lift-card"
            variants={card3d}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{
              y: -10, rotateX: 6, rotateY: index % 2 ? 5 : -5, scale: 1.02,
              transition: { duration: 0.3 },
            }}
          >
            <WorkImage src={image} title={title} text={text} />
          </motion.a>
        ))}
      </motion.div>
    </Section>
  );
}

function Booking() {
  const { t } = useLang();
  const formReveal = useMemo(() => ({
    hidden: { opacity: 0, y: 30, scale: 0.97 },
    visible: { opacity: 1, y: 0, scale: 1 },
  }), []);

  return (
    <Section id="book" title={t.bookTitle} kicker={t.bookKicker}>
      <motion.div
        className="booking-scene"
        variants={formReveal}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="booking-layout">
          <motion.div
            className="booking-logo-wrap booking-logo-premium"
            animate={{ y: [0, -10, 0], rotateY: [-12, 12, -12], rotateX: [5, -4, 5] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.05, rotateY: -20, rotateX: 6, transition: { duration: 0.4 } }}
          >
            <div className="booking-logo-halo" />
            <motion.div className="booking-logo-orbit orbit-one" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} />
            <motion.div className="booking-logo-orbit orbit-two" animate={{ rotate: -360 }} transition={{ duration: 26, repeat: Infinity, ease: "linear" }} />
            <div className="booking-logo-shadow" />
            <Logo animated />
          </motion.div>

          <div className="booking-panel booking-panel-3d booking-panel-google">
            <div className="google-book-hero">
              <div className="google-book-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
              </div>
              <h3>{t.bookHeading}</h3>
              <p>{t.bookText}</p>
            </div>
            <a className="gcal-book-btn" href={GCAL} target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="19" height="19">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              {t.bookBtn}
            </a>
            <p className="google-book-note">{t.bookNote}</p>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}

function Contact() {
  const { t } = useLang();
  const stagger = useMemo(() => ({
    hidden: {},
    visible: { transition: { staggerChildren: 0.09 } },
  }), []);
  const card3d = useMemo(() => ({
    hidden: { opacity: 0, y: 32, rotateX: -10, rotateY: 3, scale: 0.95 },
    visible: { opacity: 1, y: 0, rotateX: 0, rotateY: 0, scale: 1 },
  }), []);

  const copyPhone = async () => {
    try { await navigator.clipboard.writeText(PHONE); }
    catch { window.location.href = PHONE_LINK; }
  };
  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(EMAIL); }
    catch { window.location.href = EMAIL_LINK; }
  };

  return (
    <Section id="contact" title={t.contactTitle} kicker={t.contactKicker}>
      <div className="contact-actions">
        <a className="gcal-contact-btn" href={GCAL} target="_blank" rel="noreferrer">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="19" height="19">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
          </svg>
          {t.scheduleBtn}
        </a>
      </div>
      <div className="contact-socials">
        <button type="button" onClick={() => {
          const w = window.open(INSTAGRAM, "_blank", "noopener,noreferrer");
          if (!w) window.location.href = INSTAGRAM;
        }}>
          <InstagramIcon /> Instagram
        </button>
        <button type="button" onClick={() => {
          const w = window.open(TIKTOK, "_blank", "noopener,noreferrer");
          if (!w) window.location.href = TIKTOK;
        }}>
          <TikTokIcon /> TikTok
        </button>
      </div>
      <motion.div className="contact-grid" variants={stagger}>
        <motion.button type="button" className="lift-card contact-button" variants={card3d} whileHover={{ y: -6, rotateX: 4, transition: { duration: 0.3 } }} onClick={copyPhone}>
          <Phone size={20} /> {PHONE}
        </motion.button>
        <motion.button type="button" className="lift-card contact-button" variants={card3d} whileHover={{ y: -6, rotateX: 4, transition: { duration: 0.3 } }} onClick={copyEmail}>
          <Mail size={20} /> {EMAIL}
        </motion.button>
        <motion.button type="button" className="lift-card contact-button" variants={card3d} whileHover={{ y: -6, rotateX: 4, transition: { duration: 0.3 } }} onClick={() => {
          const w = window.open(MAPS, "_blank", "noopener,noreferrer");
          if (!w) window.location.href = MAPS;
        }}>
          <MapPin size={20} /> 49 Rue Lemieux #1, Gatineau, QC J8Z 1G7
        </motion.button>
      </motion.div>
    </Section>
  );
}

export default function App() {
  const [lang, setLang] = useState("fr");
  const t = lang === "en" ? en : fr;

  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <LangContext.Provider value={{ t, lang, setLang }}>
      <main>
        <Header />
        <Hero />
        <Services />
        <Prices />
        <About />
        <Policies />
        <Gallery />
        <Booking />
        <Contact />
        <footer>
          <div className="footer-socials">
            <SocialLink href={INSTAGRAM} label="Instagram"><InstagramIcon /></SocialLink>
            <SocialLink href={TIKTOK} label="TikTok"><TikTokIcon /></SocialLink>
          </div>
          <p>{t.footerText} <span>HMZDevelop</span></p>
        </footer>
      </main>
    </LangContext.Provider>
  );
}
