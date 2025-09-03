// src/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram } from 'react-icons/fa';
import './App.css';
import ContactForm from './components/ContactForm';

// Import immagini da src/assets
import founderImage from './assets/founder3.jpg';
import sprayImage from './assets/spray1.jpg';
import burroImage from './assets/burro_emoliente.jpg';
import cremaImage from './assets/crema_piedi.jpg';
import setImage from './assets/beauty_set.png';
import qbeautyImage from './assets/qbeauty.jpg'; // <-- aggiunta

function HomePage() {
  const [loaded, setLoaded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="home">
      <main className="App">
        {/* Fondatrice */}
        <section className={`founder ${loaded ? 'visible' : ''}`}>
          <h2>La Fondatrice</h2>
          <div
            className="founder-photo-container"
            onClick={() => setModalOpen(true)}
          >
            <img
              src={founderImage}
              alt="La fondatrice"
              className="founder-photo"
            />
          </div>
        </section>

        {/* Modale descrizione fondatrice */}
        {modalOpen && (
          <div className="modal-overlay" onClick={() => setModalOpen(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <img src={qbeautyImage} alt="QBeauty sfondo" className="modal-background" /> {/* <-- modificata */}
              <div className="modal-text">
                <h3>Chi sono</h3>
                <p>
                  Sono{' '}
                  <a
                    href="https://www.instagram.com/queenhelene_nails/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#ffcc00', fontWeight: 'bold', textDecoration: 'underline' }}
                  >
                    Elena Santucci
                  </a>
                  , onicotecnica ed estetista dal 2013, Nail Educator dal 2020 con più di mille corsiste formate insieme alla NAE Academy.
                  Nonostante le mani siano la mia più grande passione, tutto ciò che riguarda la cura del piede è da sempre stato parte fondamentale della mia carriera.
                  Per questo motivo dopo anni di lavoro sul campo e mesi di ricerche nasce Q.Beauty, una linea dedicata alla pedicure professionale qualitativamente alta ed esteticamente d’impatto, per portare il trattamento Pedicure ad un altro livello.
                </p>
                <button onClick={() => setModalOpen(false)}>Chiudi</button>
              </div>
            </div>
          </div>
        )}

        {/* Prodotti */}
        <section className={`gallery ${loaded ? 'visible' : ''}`} id="prodotti">
          <h2>Prodotti</h2>
          <div className="products">
            <Link to="/prodotti/Spray">
              <img src={sprayImage} alt="Spray Igienizzante" />
            </Link>
            <Link to="/prodotti/Olio">
              <img src={burroImage} alt="Burro Emolliente" />
            </Link>
            <Link to="/prodotti/Siero">
              <img src={cremaImage} alt="Crema Piedi" />
            </Link>
          </div>
        </section>

        {/* Set */}
        <section className="set-section">
          <h2>Set</h2>
          <p>Scopri il nostro set esclusivo per un trattamento completo Q•BEAUTY.</p>
          <Link to="/set">
            <img src={setImage} alt="Set QBeauty" className="set-image" />
          </Link>
        </section>

        {/* Contatti Instagram */}
        <section className="contact">
          <h2>INSTAGRAM</h2>
          <p>Per rimanere aggiornato su tutte le novità e le ultime uscite, non dimenticarti di seguirci su Instagram</p>
          <a
            href="https://www.instagram.com/q.beauty_pedicurexperience/"
            target="_blank"
            rel="noopener noreferrer"
            className="insta-btn"
          >
            <FaInstagram style={{ marginRight: '8px' }} />
            Segui su Instagram
          </a>
        </section>

        {/* Form di contatto */}
        <section className={`contact-section ${loaded ? 'visible' : ''}`}>
          <div className="form-card">
            <ContactForm />
          </div>
        </section>

        {/* Footer aggiunto */}
        <footer className="site-footer">
          <p>
            © {new Date().getFullYear()} Tutti i diritti riservati – Realizzato da{' '}
            <a
              href="https://sorted-beryl.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#ffcc00', fontWeight: 'bold', textDecoration: 'underline' }}
            >
              Sorted
            </a>
          </p>
        </footer>
      </main>
    </div>
  );
}

export default HomePage;
