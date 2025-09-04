import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./ContactForm.css";

// utility semplice per leggere un cookie
function getCookie(name) {
  const cname = name + "=";
  const parts = document.cookie.split(";");
  for (let c of parts) {
    c = c.trim();
    if (c.indexOf(cname) === 0) return decodeURIComponent(c.substring(cname.length));
  }
  return "";
}

const ContactForm = () => {
  const form = useRef();

  // campi controllati (ci servono per valorizzare from_name / reply_to)
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [message, setMessage] = useState("");

  const [accepted, setAccepted] = useState(false);
  const [sending, setSending] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();

    // anti-bot honeypot: se "company" è compilato, esci silenziosamente
    const botTrap = form.current?.elements?.company?.value;
    if (botTrap) return;

    // blocca se non hanno accettato la privacy
    if (!accepted) return;

    // invia solo se il consenso globale è "accepted"
    const consent = sessionStorage.getItem("q_consent") || getCookie("q_consent");
    if (consent !== "accepted") {
      alert("Per inviare il messaggio devi accettare i cookie/Privacy Policy.");
      return;
    }

    // piccoli check sulle env (utile in dev)
    if (!import.meta.env.VITE_EMAILJS_PUBLIC_KEY ||
        !import.meta.env.VITE_EMAILJS_SERVICE_ID ||
        !import.meta.env.VITE_EMAILJS_TEMPLATE_ID) {
      console.warn("Config EmailJS mancante: controlla VITE_EMAILJS_* in .env.local");
    }

    try {
      setSending(true);

      // Nota: sendForm prende automaticamente **tutti i campi del form** (anche gli hidden)
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY } // v4
      );

      alert("Messaggio inviato con successo!");
      form.current.reset();
      setUserName("");
      setUserEmail("");
      setMessage("");
      setAccepted(false);
    } catch (err) {
      console.error("EmailJS error:", err);
      // molti errori utili sono in err.text
      alert(`Errore nell'invio: ${err?.text || err?.message || "verifica chiavi e campi del template"}`);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="contact-form-wrapper">
      <h2 className="contact-form-title">Scrivici un messaggio per saperne di più</h2>
      <p className="contact-form-subtitle">
        Hai domande o richieste? Compila il modulo e ti risponderemo al più presto.
      </p>

      <form ref={form} onSubmit={sendEmail} className="contact-form" aria-busy={sending}>

        {/* Honeypot anti-bot (NON compilare) */}
        <input type="text" name="company" tabIndex="-1" autoComplete="off" style={{ display: "none" }} />

        {/* Campi utente */}
        <input
          type="text"
          name="user_name"
          placeholder="Nome"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />

        <input
          type="email"
          name="user_email"
          placeholder="Email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          inputMode="email"
          autoComplete="email"
          required
        />

        <textarea
          name="message"
          placeholder="Il tuo messaggio"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />

        {/* Alias compatibili con molti template EmailJS */}
        <input type="hidden" name="from_name" value={userName} />
        <input type="hidden" name="reply_to" value={userEmail} />
        <input type="hidden" name="site_url" value={typeof window !== "undefined" ? window.location.href : ""} />

        <label className="privacy-consent">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            required
          />
          <span>
            Ho letto e accetto la{" "}
            <a href="/privacy-policy" target="_blank" rel="noreferrer">
              Privacy Policy
            </a>.
          </span>
        </label>

        <button type="submit" disabled={!accepted || sending}>
          {sending ? "Invio..." : "Invia"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
