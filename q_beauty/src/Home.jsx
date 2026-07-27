import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import "./App.css";
import ContactForm from "./components/ContactForm";
import ScrollSequenceShowcase from "./components/ScrollSequenceShowcase";
import SiteNav from "./components/SiteNav";
import { QB_SHOP_URLS } from "./shopLinks";

const heroVideo = "/video/hero-qbeauty.mp4";
const heroPoster = "/video/hero-qbeauty-poster.jpg";
const founderImage = "/img/founder3.jpg";
const sprayImage = "/img/spray1.jpg";
const burroImage = "/img/burro_emoliente.jpg";
const cremaImage = "/img/crema_piedi.jpg";
const setImage = "/img/beauty_set.png";
const qbeautyBg = "/img/qbeauty.jpg";

const brandSignals = [
  {
    title: "Dal 2013 sul campo",
    text: "L'esperienza di Elena tra estetica e onicotecnica parte dal lavoro quotidiano in cabina e dal contatto diretto con il trattamento del piede.",
  },
  {
    title: "Dal 2020 in formazione",
    text: "Il percorso da Nail Educator ha trasformato il metodo Q.BEAUTY in una gestualita chiara, insegnabile e riconoscibile anche nei corsi.",
  },
  {
    title: "Oltre 1.000 corsiste",
    text: "Insieme alla NAE Academy, Elena ha gia accompagnato piu di mille corsiste in un percorso molto apprezzato da professioniste e centri.",
  },
];

const ritualSteps = [
  {
    step: "01",
    title: "Igienizza e prepara",
    text: "Lo spray apre il trattamento con una sensazione immediata di sicurezza, freschezza e pelle levigata.",
  },
  {
    step: "02",
    title: "Tratta e ammorbidisci",
    text: "Il burro e Kerato5 trasformano le zone critiche in un momento tecnico ad alto impatto visivo.",
  },
  {
    step: "03",
    title: "Chiudi e fidelizza",
    text: "La crema completa il rituale e lascia alla cliente un prodotto da continuare a casa con continuità.",
  },
];

const faqItems = [
  {
    question: "Cos'e Q.BEAUTY e a chi si rivolge?",
    answer:
      "Q.BEAUTY e una linea professionale per pedicure pensata per estetiste, onicotecniche e centri che vogliono alzare la percezione del trattamento in cabina e nella rivendita finale.",
  },
  {
    question: "Quali prodotti compongono il protocollo base Q.BEAUTY?",
    answer:
      "Il protocollo base ruota intorno a Spray Igienizzante, Burro Emolliente e Crema Cheratolitica, con KERATO5 come supporto intensivo per le zone piu difficili del piede.",
  },
  {
    question: "I prodotti Q.BEAUTY sono adatti solo al trattamento in cabina?",
    answer:
      "No. La linea nasce per lavorare bene in cabina ma include anche una forte componente domiciliare e retail, cosi la cliente puo continuare il rituale anche a casa.",
  },
  {
    question: "Dove posso acquistare i prodotti Q.BEAUTY?",
    answer:
      "Ogni presentazione prodotto sul sito rimanda direttamente allo shop ufficiale Q.BEAUTY, dove puoi vedere dettagli, disponibilita e acquisto del singolo articolo o del set completo.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const reviewStats = {
  total: 10,
  averageRating: "5.0",
  sourceLabel: "Recensioni pubblicate su qbeautyshop.it",
};

const featuredReviews = [
  {
    name: "Jessica",
    text: "Sono stata da Elena per il corso aestetic pedicure e in quell'occasione ho avuto modo di provare i prodotti della sua linea e me ne sono innamorata. I profumi sono favolosi e le miei clienti li adorano, fanno la differenza in una pedicure di alto livello.",
    date: "13 lug 2026",
  },
  {
    name: "Miriam",
    text: "Ho acquistato il Set Experience di Q-Beauty per i trattamenti in cabina e ne sono assolutamente entusiasta. E un vero e proprio trattamento professionale completo. Lo Spray igienizzante e freschissimo, la Crema cheratolitica ha fatto miracoli sui punti piu critici e il Burro emolliente lascia i piedi morbidissimi a lungo.",
    date: "21 mag 2026",
  },
  {
    name: "Martina",
    text: "I prodotti sono sensazionali, ormai le mie clienti li adorano. La crema e un'ottima alleata per la cura domiciliare di ragadi e screpolature; il burro permette una levigatura perfetta. E vogliamo parlare dello spray? Neutralizza ogni odore idratando la pelle nell'immediato.",
    date: "23 mar 2026",
  },
  {
    name: "Alessia",
    text: "Kerato5, il mai piu senza. Anche usato come semplice sciogli cuticole lascia senza parole. E il prodotto da avere assolutamente quando si lavora con pedicure con callosita e inspessimenti difficili da trattare.",
    date: "7 lug 2026",
  },
  {
    name: "Camilla",
    text: "Me ne sono innamorata gia all'arrivo quando ho aperto il pacco, per l'inebriante profumo, poi ho subito constatato le performance. La crema cheratolitica e il mio prodotto preferito e piace un sacco anche alle clienti che hanno notato le differenze.",
    date: "13 mag 2026",
  },
];

const featuredProducts = [
  {
    id: "01",
    name: "KERATO5",
    subtitle: "Cheratolitico forte 5 azioni in 1",
    href: "/prodotti/Kerato5",
    image: "https://cdn.qbeautyshop.it/kerato5/kerato5-1.jpg",
    alt: "KERATO5",
    description:
      "Gel cheratolitico forte pensato per salone e trattamento domiciliare. Lavora su cuticola, tessuto cheratinizzato, onicofosi, onicolisi e ragadi.",
    accent: "50 ml · Made in Italy · Formula con ingredienti di origine vegetale",
  },
  {
    id: "02",
    name: "Spray Igienizzante",
    subtitle: "Igienizza, deodora, leviga",
    href: "/prodotti/Spray",
    image: sprayImage,
    alt: "Spray Igienizzante",
    description:
      "Prodotto multiuso per piedi e mani: disinfetta, elimina gli odori all’istante, leviga e rinfresca. Perfetto all’apertura del trattamento e prima delle foto finali.",
    accent: "100 ml · Multiuso · 76% ingredienti di origine naturale",
  },
  {
    id: "03",
    name: "Burro Emolliente",
    subtitle: "Idrata, nutre, protegge",
    href: "/prodotti/Olio",
    image: burroImage,
    alt: "Burro Emolliente",
    description:
      "Burro ad alta emollienza che crea una barriera protettiva sull’epidermide, favorendo idratazione, elasticità e lucidatura del tessuto dopo la levigatura.",
    accent: "100 ml · Mani e piedi · Vegan e cruelty free",
  },
  {
    id: "04",
    name: "Crema Cheratolitica",
    subtitle: "Idrata, esfolia, lenisce",
    href: "/prodotti/Siero",
    image: cremaImage,
    alt: "Crema Idratante Cheratolitica",
    description:
      "Crema con 10% di urea per idratazione profonda ed esfoliazione quotidiana. Aiuta a prevenire ispessimenti, secchezza e cattivi odori con una texture leggera e confortevole.",
    accent: "100 ml · +90% ingredienti di origine naturale · Uso domiciliare ideale",
  },
];

function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [heroVideoReady, setHeroVideoReady] = useState(false);

  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="home">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <SiteNav />

      <section className="landing-hero" aria-label="Q.BEAUTY hero">
        <div className="hero-container">
          <video
            className={`hero-media hero-video${heroVideoReady ? " is-ready" : ""}`}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={heroPoster}
            onPlaying={() => setHeroVideoReady(true)}
            aria-hidden="true"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
          <div className="hero-shade" aria-hidden="true" />
        </div>

        <div className="landing-hero-grid">
          <div
            className="landing-hero-panel reveal-card"
            data-reveal
            style={{ "--reveal-delay": "40ms" }}
          >
            <div className="hero-copy-stack">
              <p className="hero-kicker">Q.BEAUTY PROFESSIONAL PEDICURE</p>
              <h1 className="hero-title">
                La pedicure si trasforma in progetto.
              </h1>
              <p className="hero-description">
                Formule professionali, immagine curata e un rituale pensato
                per dare piu spessore al trattamento gia dal primo sguardo.
              </p>

              <div className="hero-actions">
                <a href="#prodotti" className="cta-button">
                  Esplora la collezione
                </a>
                <a href={QB_SHOP_URLS.shop} className="hero-secondary-button">
                  Shop
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="App app-content">
        <section className="section-shell brand-story" id="brand">
          <div className="section-heading reveal-card" data-reveal>
            <p className="section-eyebrow">IL BRAND</p>
            <h2>Una linea nata sul campo, costruita per distinguersi.</h2>
            <p className="section-lead">
              Q.BEAUTY non e una semplice linea piedi: e un metodo di cabina,
              un'identita visiva precisa e una proposta coerente dal trattamento al consiglio finale.
            </p>
          </div>

          <div className="brand-story-grid">
            <button
              type="button"
              className="founder-stage-card reveal-card"
              onClick={() => setModalOpen(true)}
              data-reveal
              style={{ "--reveal-delay": "80ms" }}
            >
              <img src={founderImage} alt="Elena Santucci, fondatrice Q.BEAUTY" className="founder-photo" />
              <span className="founder-stage-label">Scopri la fondatrice</span>
            </button>

            <div className="brand-copy-card reveal-card" data-reveal style={{ "--reveal-delay": "180ms" }}>
              <p className="brand-copy">
                Sono{" "}
                <a
                  href="https://www.instagram.com/queenhelene_nails/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-gold-link"
                >
                  Elena Santucci
                </a>
                , onicotecnica ed estetista dal 2013, Nail Educator dal 2020.
                Dopo anni di lavoro in cabina, ricerca sul trattamento professionale
                e oltre mille corsiste formate insieme alla NAE Academy,
                nasce Q.BEAUTY: una linea pensata per dare alla pedicure
                una presenza piu autorevole, ordinata e riconoscibile.
              </p>

              <div className="signal-grid">
                {brandSignals.map((signal, index) => (
                  <article
                    key={signal.title}
                    className="signal-card reveal-card"
                    data-reveal
                    style={{ "--reveal-delay": `${220 + index * 90}ms` }}
                  >
                    <h3>{signal.title}</h3>
                    <p>{signal.text}</p>
                  </article>
                ))}
              </div>

              <button
                type="button"
                className="hero-secondary-button brand-open-btn"
                onClick={() => setModalOpen(true)}
              >
                Leggi la storia completa
              </button>
            </div>
          </div>
        </section>

        {modalOpen && (
          <div className="modal-overlay" onClick={() => setModalOpen(false)}>
            <div className="modal-content" onClick={(event) => event.stopPropagation()}>
              <img src={qbeautyBg} alt="QBeauty sfondo" className="modal-background" />
              <div className="modal-text">
                <h3>Chi sono</h3>
                <p>
                  Sono{" "}
                  <a
                    href="https://www.instagram.com/queenhelene_nails/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-gold-link"
                  >
                  Elena Santucci
                </a>
                , onicotecnica ed estetista dal 2013, Nail Educator dal 2020 con
                piu di mille corsiste formate insieme alla NAE Academy. Nonostante
                le mani siano la mia piu grande passione, tutto cio che riguarda la
                cura del piede e sempre stato parte fondamentale della mia carriera.
                Dopo anni di lavoro sul campo e mesi di ricerca e sviluppo nasce
                Q.BEAUTY: una linea dedicata alla pedicure professionale,
                pensata per rendere il trattamento piu leggibile, piu curato e piu memorabile.
              </p>
                <button onClick={() => setModalOpen(false)}>Chiudi</button>
              </div>
            </div>
          </div>
        )}

        <section className="section-shell ritual-band">
          <div className="section-heading reveal-card" data-reveal>
            <p className="section-eyebrow">IL RITUALE</p>
            <h2>Tre step, una percezione diversa del trattamento.</h2>
            <p className="section-lead">
              Nello shop ogni prodotto racconta la propria funzione; qui prende
              forma un percorso coerente, facile da spiegare e immediato da proporre in cabina.
            </p>
          </div>

          <div className="ritual-grid">
            {ritualSteps.map((item, index) => (
              <article
                key={item.step}
                className="ritual-card reveal-card"
                data-reveal
                style={{ "--reveal-delay": `${80 + index * 120}ms` }}
              >
                <span className="ritual-index">{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <ScrollSequenceShowcase />

        <section className="section-shell gallery" id="prodotti">
          <div className="section-heading reveal-card" data-reveal>
            <p className="section-eyebrow">COLLEZIONE</p>
            <h2>Descrizioni ufficiali, racconto piu curato.</h2>
            <p className="section-lead">
              Ogni card riprende il contenuto del sito ufficiale e lo accompagna
              con una lettura piu chiara, visiva e coerente con l'identita del brand.
            </p>
          </div>

          <div className="product-showcase">
            {featuredProducts.map((product, index) => (
              <Link
                key={product.name}
                to={product.href}
                className="product-showcase-card reveal-card"
                data-reveal
                style={{ "--reveal-delay": `${60 + index * 90}ms` }}
                aria-label={`Scopri il prodotto ${product.name}`}
                title={`Scopri il prodotto ${product.name}`}
              >
                <div className="product-showcase-media">
                  <img src={product.image} alt={product.alt} />
                  <span className="product-index-chip">{product.id}</span>
                </div>
                <div className="product-showcase-body">
                  <p className="product-overline">{product.subtitle}</p>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <span className="product-accent">{product.accent}</span>
                  <span className="product-link">Scopri prodotto</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="section-shell set-stage">
          <div className="set-stage-grid">
            <div className="set-visual reveal-card" data-reveal style={{ "--reveal-delay": "60ms" }}>
              <Link to="/set" aria-label="Apri la presentazione del Set Experience Q.BEAUTY">
                <img src={setImage} alt="Set Experience Q.BEAUTY" className="set-image" />
              </Link>
            </div>

            <div className="set-copy reveal-card" data-reveal style={{ "--reveal-delay": "170ms" }}>
              <p className="section-eyebrow">SET EXPERIENCE</p>
              <h2>Il protocollo completo in un’unica proposta.</h2>
              <p className="section-lead">
                Nello shop viene descritto in modo semplice: Spray igienizzante,
                Burro emolliente, Crema idratante cheratolitica. Qui prende
                la forma di un percorso ordinato, leggibile e pronto da raccontare.
              </p>

              <div className="set-step-row">
                <span>STEP 1</span>
                <p>Spray Igienizzante per preparare, deodorare e levigare il tessuto.</p>
              </div>
              <div className="set-step-row">
                <span>STEP 2</span>
                <p>Burro Emolliente per nutrire, proteggere e valorizzare il momento wow.</p>
              </div>
              <div className="set-step-row">
                <span>STEP 3</span>
                <p>Crema Cheratolitica per chiudere il rituale e continuare a casa.</p>
              </div>

              <div className="hero-actions">
                <Link to="/set" className="cta-button">
                  Apri il set
                </Link>
                <a href={QB_SHOP_URLS.set} className="hero-secondary-button">
                  Vai allo shop
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell review-proof-shell" id="recensioni">
          <div className="review-proof-grid">
            <article className="review-proof-intro reveal-card" data-reveal>
              <p className="section-eyebrow">RECENSIONI</p>
              <h2>Le professioniste che lo hanno provato lo raccontano cosi.</h2>
              <p className="section-lead">
                Una selezione di recensioni pubblicate sullo shop ufficiale
                Q.BEAUTY, utili per mostrare risultati percepiti, fidelizzazione
                cliente e valore reale in cabina.
              </p>

              <div className="review-stats-row">
                <div className="review-stat-card">
                  <strong>{reviewStats.averageRating}/5</strong>
                  <span>valutazione media</span>
                </div>
                <div className="review-stat-card">
                  <strong>{reviewStats.total}</strong>
                  <span>recensioni pubblicate</span>
                </div>
              </div>

              <p className="review-source-note">{reviewStats.sourceLabel}</p>

              <div className="hero-actions">
                <a href={QB_SHOP_URLS.shop} className="cta-button">
                  Vai allo shop
                </a>
              </div>
            </article>

            <div className="review-grid">
              {featuredReviews.map((review, index) => (
                <article
                  key={`${review.name}-${review.date}`}
                  className="review-card reveal-card"
                  data-reveal
                  style={{ "--reveal-delay": `${70 + index * 70}ms` }}
                >
                  <div className="review-card-head">
                    <div>
                      <h3>{review.name}</h3>
                      <span className="review-date">{review.date}</span>
                    </div>
                    <span className="review-stars" aria-label="5 su 5">
                      ★★★★★
                    </span>
                  </div>
                  <p>{review.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell contact-social-shell">
          <article
            id="faq"
            className="social-proof-card seo-faq-card reveal-card"
            data-reveal
            style={{ "--reveal-delay": "60ms" }}
          >
            <p className="section-eyebrow">FAQ SEO</p>
            <h2>Domande frequenti sulla linea Q.BEAUTY.</h2>
            <p className="section-lead">
              Una sezione utile per spiegare meglio il brand alle clienti e, allo stesso
              tempo, dare a Google contenuti piu chiari sul protocollo e sui prodotti.
            </p>

            <div className="faq-list">
              {faqItems.map((item) => (
                <details key={item.question} className="faq-item">
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>

            <div className="hero-actions">
              <a href={QB_SHOP_URLS.shop} className="cta-button">
                Vai allo shop
              </a>
            </div>

            <a
              href="https://www.instagram.com/q.beauty_pedicurexperience/"
              target="_blank"
              rel="noopener noreferrer"
              className="insta-btn"
            >
              <FaInstagram style={{ marginRight: "8px" }} />
              Segui anche Instagram
            </a>
          </article>

          <section
            id="contatti"
            className="contact-card reveal-card"
            data-reveal
            style={{ "--reveal-delay": "180ms" }}
          >
            <p className="section-eyebrow">CONTATTI</p>
            <h2>Richiedi informazioni o listino.</h2>
            <p className="section-lead">
              Se vuoi entrare nel mondo Q.BEAUTY come cliente, rivenditore o professionista,
              qui trovi un contatto diretto, ordinato e coerente con l'identita del brand.
            </p>
            <div className="form-card contact-form-shell">
              <ContactForm />
            </div>
          </section>
        </section>

        <footer className="site-footer">
          <p>
            © {new Date().getFullYear()} Tutti i diritti riservati – Realizzato da{" "}
            <a href="https://sortedbros.com" target="_blank" rel="noopener noreferrer">
              Sorted Bros
            </a>
          </p>
        </footer>
      </main>
    </div>
  );
}

export default HomePage;
