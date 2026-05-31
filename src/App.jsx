import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Mail, MapPin, Menu, Phone, Scissors, Sparkles, X } from "lucide-react";

const BRAND = "Looking2FlyyByMKash";
const LOGO = "/images/logo.png";
const INSTAGRAM = "https://www.instagram.com/looking2flyy._.bymkash/";
const TIKTOK = "https://www.tiktok.com/@looking2flyybymkash";
const MAPS = "https://maps.app.goo.gl/HkJgV5TAzphz6q1U8";
const PHONE = "873-660-0144";
const PHONE_LINK = "tel:+18736600144";
const EMAIL = "Meaneatanganaowona@gmail.com";
const EMAIL_LINK = `mailto:${EMAIL}`;

const sections = [
  ["home", "Accueil"],
  ["services", "Services"],
  ["prices", "Prix"],
  ["about", "Studio"],
  ["policies", "Règles"],
  ["gallery", "Galerie"],
  ["book", "Book"],
  ["contact", "Contact"],
];

const prices = [
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
];

const services = [
  ["Locs / Dreads", "Retwist, interlock, micro locs, crochet, barrels et styles protecteurs pour locs.", "/images/work/locs-dreads.jpg"],
  ["Natural Hair", "Cornrows, twists, braids, barrels et starter locs sur cheveux naturels.", "/images/work/natural-hair.jpg"],
  ["Extensions", "Knotless braids, boho knotless, twists, loc extensions et cornrows.", "/images/work/extensions.jpg"],
];

const policies = [
  ["Wash your hair", "Hair must be washed before every appointment."],
  ["Cash only", "All payments are accepted in cash only."],
  ["2 people max", "You can bring a maximum of 2 people."],
  ["Cancellation", "Cancel at least 24 hours in advance."],
  ["$15 deposit", "Non-refundable deposit required."],
  ["Confirmation", "Contact by message to confirm your appointment."],
];

const galleryItems = [
  ["Loc Retwist", "Clean parts and fresh finish", "/images/work/loc-retwist.jpg"],
  ["Cornrows", "Natural protective styling", "/images/work/cornrows.jpg"],
  ["Knotless Braids", "Soft, neat extension work", "/images/work/knotless-braids.jpg"],
  ["Two Strand Twist", "Defined natural texture", "/images/work/two-strand.jpg"],
  ["Barrels", "Polished loc styling", "/images/work/barrels.jpg"],
  ["Starter Locs", "Fresh foundation work", "/images/work/starter-locs.jpg"],
];

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

const openExternal = (url) => {
  const opened = window.open(url, "_blank", "noopener,noreferrer");
  if (!opened) {
    window.location.href = url;
  }
};

const reveal = {
  hidden: { opacity: 0, y: 34, rotateX: -8 },
  visible: { opacity: 1, y: 0, rotateX: 0 },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
    },
  },
};

const card3d = {
  hidden: { opacity: 0, y: 28, rotateX: -12, rotateY: 4, scale: 0.96 },
  visible: { opacity: 1, y: 0, rotateX: 0, rotateY: 0, scale: 1 },
};

const formReveal = {
  hidden: { opacity: 0, y: 26, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

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
  const go = (id) => {
    scrollTo(id);
    setOpen(false);
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        <button className="brand-mark" onClick={() => go("home")} aria-label="Retour a l'accueil">
          <Logo />
          <span>{BRAND}</span>
        </button>

        <nav className="desktop-nav" aria-label="Navigation principale">
          {sections.map(([id, label]) => (
            <button key={id} onClick={() => go(id)}>{label}</button>
          ))}
        </nav>

        <div className="header-actions">
          <SocialLink href={INSTAGRAM} label="Instagram"><InstagramIcon /></SocialLink>
          <SocialLink href={TIKTOK} label="TikTok"><TikTokIcon /></SocialLink>
          <button className="book-pill" onClick={() => go("book")}>Book</button>
          <button className="menu-button" onClick={() => setOpen((value) => !value)} aria-label="Menu">
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="mobile-nav" aria-label="Navigation mobile">
          {sections.map(([id, label]) => (
            <button key={id} onClick={() => go(id)}>{label}</button>
          ))}
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="texture" />
      <div className="hero-grid">
        <motion.div className="hero-copy" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }}>
          <p className="eyebrow"><Sparkles size={16} /> Premium Hair Studio - Gatineau</p>
          <h1>Clean Locs, Braids<br /><span>Made To Last</span></h1>
          <p className="hero-text">Private appointments in Gatineau for locs, natural hair and extension styles with a polished finish.</p>
          <div className="hero-buttons">
            <button className="primary-button" onClick={() => scrollTo("book")}><CalendarDays size={19} /> Book Now</button>
            <button className="secondary-button" onClick={() => scrollTo("prices")}><Scissors size={19} /> Voir les prix</button>
          </div>
        </motion.div>

        <motion.div className="hero-art" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.1 }}>
          <motion.div className="logo-orbit" animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }} />
          <motion.div className="hero-logo-card" animate={{ y: [0, -14, 0], rotateY: [-10, 12, -10], rotateX: [5, -4, 5] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} whileHover={{ scale: 1.04, rotateY: -18 }}>
            <Logo animated />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Section({ id, title, kicker, children, pink = false }) {
  return (
    <motion.section
      id={id}
      className={`section ${pink ? "section-pink" : ""}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      variants={reveal}
      transition={{ duration: 0.7, ease: "easeOut" }}
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
  return (
    <Section id="services" title="Services" kicker="Clean parts. Sharp finish. Flyy result.">
      <motion.div className="service-grid" variants={stagger}>
        {services.map(([title, text, image], index) => (
          <motion.article
            key={title}
            className="service-card lift-card"
            variants={card3d}
            transition={{ duration: 0.62, ease: "easeOut" }}
            whileHover={{ y: -12, rotateX: 7, rotateY: index % 2 ? 7 : -7, scale: 1.02 }}
          >
            <WorkImage src={image} title={title} className="service-work-image" />
            <h3>{title}</h3>
            <p>{text}</p>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  );
}

function Prices() {
  return (
    <Section id="prices" title="Prices" kicker="Simple, clear, appointment-ready.">
      <motion.div className="price-grid" variants={stagger}>
        {prices.map(([title, items]) => (
          <motion.article
            className="price-card lift-card"
            key={title}
            variants={card3d}
            transition={{ duration: 0.62, ease: "easeOut" }}
            whileHover={{ y: -10, rotateX: 6, rotateY: -4, scale: 1.015 }}
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
      <motion.div className="note-card lift-card" variants={card3d} whileHover={{ rotateX: 5, y: -6 }}>+$15 design - +$10 blow dry</motion.div>
    </Section>
  );
}

function About() {
  return (
    <Section id="about" title="Studio" kicker="Professional, private, polished.">
      <motion.div className="studio-scene" variants={card3d} transition={{ duration: 0.72, ease: "easeOut" }} whileHover="hover">
        <motion.div className="studio-art" animate={{ y: [0, -12, 0], rotateY: [-12, 13, -12], rotateX: [5, -4, 5] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}>
          <motion.div className="studio-orbit" animate={{ rotate: 360 }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }} />
          <div className="studio-glow" />
          <Logo animated />
        </motion.div>
        <motion.div className="about-panel studio-panel lift-card" variants={{ hover: { rotateY: -5, rotateX: 4, y: -8 } }} transition={{ duration: 0.45, ease: "easeOut" }}>
          <p>Looking2FlyyByMKash est un service hair premium a Gatineau, pense pour des resultats propres, styles et une experience de rendez-vous confortable.</p>
          <motion.a className="map-button studio-map-card" href={MAPS} target="_blank" rel="noreferrer" whileHover={{ y: -4, rotateX: 5, scale: 1.015 }} whileTap={{ scale: 0.98 }}>
            <span className="map-pin-scene"><MapPin size={22} /><i /></span>
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
  return (
    <Section id="policies" title="Policies" kicker="À lire avant de réserver.">
      <motion.div className="policy-grid" variants={stagger}>
        {policies.map(([title, text], index) => (
          <motion.article
            key={title}
            className="policy-card lift-card"
            variants={card3d}
            transition={{ duration: 0.58, ease: "easeOut" }}
            whileHover={{ y: -9, rotateX: 7, rotateY: index % 2 ? -5 : 5, scale: 1.018 }}
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
  return (
    <Section id="gallery" title="Recent Work" kicker="Un apercu du style.">
      <button className="gallery-link" type="button" onClick={() => openExternal(INSTAGRAM)}><InstagramIcon /> View more work on Instagram</button>
      <motion.div className="gallery-grid" variants={stagger}>
        {galleryItems.map(([title, text, image], index) => (
          <motion.a
            key={title}
            href={INSTAGRAM}
            target="_blank"
            rel="noreferrer"
            className="gallery-tile lift-card"
            variants={card3d}
            transition={{ duration: 0.58, ease: "easeOut" }}
            whileHover={{ y: -12, rotateX: 8, rotateY: index % 2 ? 6 : -6, scale: 1.025 }}
          >
            <WorkImage src={image} title={title} text={text} />
          </motion.a>
        ))}
      </motion.div>
    </Section>
  );
}

function Booking() {
  const [form, setForm] = useState({ service: "Simple retwist", date: "", time: "10:00 AM", name: "", phone: "" });
  const [phoneStatus, setPhoneStatus] = useState("");
  const [mailStatus, setMailStatus] = useState("");
  const msg = useMemo(() => `Hi, I would like to book ${form.service} on ${form.date || "my preferred date"} at ${form.time}. My name is ${form.name || "Client"}. My phone number is ${form.phone || "my phone number"}.`, [form]);
  const mail = `mailto:${EMAIL}?subject=${encodeURIComponent("Booking request")}&body=${encodeURIComponent(msg)}`;
  const servicesList = ["Simple retwist", "Interlock retwist", "Micro locs retwist", "Crochet retwist", "Cornrows", "Braids", "Knotless braids", "Locs extension"];
  const openMail = () => {
    setMailStatus("Opening your email app...");
    window.location.href = mail;
  };
  const copyPhone = async () => {
    try {
      await navigator.clipboard.writeText(PHONE);
      setPhoneStatus(`Phone copied: ${PHONE}`);
    } catch {
      setPhoneStatus(`Phone: ${PHONE}`);
    }
  };

  return (
    <Section id="book" title="Book Now" kicker="Prepare ton message de reservation.">
      <motion.div
        className="booking-scene"
        variants={formReveal}
        transition={{ duration: 0.65, ease: "easeOut" }}
        whileHover="hover"
      >
        <div className="booking-layout">
          <motion.div
            className="booking-logo-wrap booking-logo-premium"
            animate={{ y: [0, -12, 0], rotateY: [-14, 14, -14], rotateX: [6, -5, 6] }}
            transition={{ duration: 7.2, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.055, rotateY: -24, rotateX: 8 }}
          >
            <div className="booking-logo-halo" />
            <motion.div className="booking-logo-orbit orbit-one" animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }} />
            <motion.div className="booking-logo-orbit orbit-two" animate={{ rotate: -360 }} transition={{ duration: 24, repeat: Infinity, ease: "linear" }} />
            <div className="booking-logo-shadow" />
            <Logo animated />
          </motion.div>

          <div className="booking-panel booking-panel-3d">
            <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} aria-label="Service">
              {servicesList.map((item) => <option key={item}>{item}</option>)}
            </select>
            <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} aria-label="Date" />
            <select value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} aria-label="Time">
              {["10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM", "6:00 PM"].map((item) => <option key={item}>{item}</option>)}
            </select>
            <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <p className="booking-message">{msg}</p>
            <button className="primary-button" type="button" onClick={openMail}><Mail size={19} /> Send Email</button>
            <button className="secondary-button" type="button" onClick={copyPhone}><Phone size={19} /> Copy Phone</button>
            {(phoneStatus || mailStatus) && <p className="phone-status">{phoneStatus || mailStatus}</p>}
          </div>
        </div>
      </motion.div>
    </Section>
  );
}

function Contact() {
  const copyContactPhone = async () => {
    try {
      await navigator.clipboard.writeText(PHONE);
    } catch {
      window.location.href = PHONE_LINK;
    }
  };
  const copyContactEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      window.location.href = EMAIL_LINK;
    }
  };

  return (
    <Section id="contact" title="Contact" kicker="Reservation et informations.">
      <div className="contact-socials">
        <button type="button" onClick={() => openExternal(INSTAGRAM)}><InstagramIcon /> Instagram</button>
        <button type="button" onClick={() => openExternal(TIKTOK)}><TikTokIcon /> TikTok</button>
      </div>
      <motion.div className="contact-grid" variants={stagger}>
        <motion.button type="button" className="lift-card contact-button" variants={card3d} whileHover={{ y: -8, rotateX: 6 }} onClick={copyContactPhone}><Phone size={21} /> {PHONE}</motion.button>
        <motion.button type="button" className="lift-card contact-button" variants={card3d} whileHover={{ y: -8, rotateX: 6 }} onClick={copyContactEmail}><Mail size={21} /> {EMAIL}</motion.button>
        <motion.button type="button" className="lift-card contact-button" variants={card3d} whileHover={{ y: -8, rotateX: 6 }} onClick={() => openExternal(MAPS)}><MapPin size={21} /> 49 Rue Lemieux #1, Gatineau, QC J8Z 1G7</motion.button>
      </motion.div>
    </Section>
  );
}

export default function App() {
  return (
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
        <p>Designed by <span>HMZDevelop</span></p>
      </footer>
    </main>
  );
}
