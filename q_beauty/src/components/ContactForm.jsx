import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./ContactForm.css";

// piccola utility per leggere i cookie senza dipendenze
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
  const [accepted, setAccepted] = useState(false);
  const [sending, setSending] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();

    // blocca se non hanno accettato la privacy
    if (!accepted) return;

    // invia solo se il consenso globale è "accepted"
    const consent = sessionStorage.getItem("q_consent") || getCookie("q_consent");
    if (consent !== "accepted") {
      alert("Per inviare il messaggio devi accettare i cookie/Privacy Policy.");
      return;
    }

    try {
      setSending(true);
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY } // v4 API
      );
      alert("Messaggio inviato con successo!");
      form.current.reset();
      setAccepted(false);
    } catch (err) {
      console.error(err);
      alert("Errore nell’invio. Riprova.");
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
        {/* Honeypot anti-bot (non compilare) */}
        <input type="text" name="company" tabIndex="-1" autoComplete="off" style={{ display: "none" }} />

        <input type="text" name="user_name" placeholder="Nome" required />
        <input type="email" name="user_email" placeholder="Email" required />
        <textarea name="message" placeholder="Il tuo messaggio" required />

        <label className="privacy-consent">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            required
          />
          <span>
            Ho letto e accetto la{" "}
            <a href="/privacy-policy" target="_blank" rel="noreferrer">Privacy Policy</a>.
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
