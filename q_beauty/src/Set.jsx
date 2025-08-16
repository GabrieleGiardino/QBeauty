// src/Set.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './App.css'; // Stili globali
import beautySetImage from './assets/beauty_set.png'; // Import corretto immagine

function SetPage() {
  return (
    <div className="product-page">
      <h1 className="product-title">Set Q•BEAUTY</h1>

      <div className="product-card">
        <div className="product-image">
          <img src={beautySetImage} alt="Set completo" />
        </div>

        <div className="product-details">
          <p>
            Il nostro set esclusivo Q•BEAUTY include:
          </p>
          <ul>
            <li>Spray Igienizzante</li>
            <li>Burro Emolliente</li>
            <li>Crema Piedi Idratante</li>
          </ul>
          <p>
            Offri alla tua clientela un servizio pedicure completo firmato Q•BEAUTY
          </p>
          <div style={{ marginTop: '2rem', fontSize: '1.3rem', lineHeight: '1.6' }}>
            <p>
              <strong>💰 Prezzo dedicato ai PRIVATI:</strong>{' '}
              <del style={{ color: '#ccc', marginRight: '8px' }}>€ 67,70</del>
              <span style={{ fontWeight: 'bold' }}>€ 60,00</span>
            </p>
            <p>
              <strong>💰 Prezzo dedicato a P.IVA:</strong>{' '}
              <del style={{ color: '#ccc', marginRight: '8px' }}>€ 67,70</del>
              <span style={{ fontWeight: 'bold' }}>€ 54,00</span>
            </p>
          </div>

          <Link to="/home" className="cta-button" style={{ marginTop: '1.5rem', display: 'inline-block' }}>
            ← Torna ai Prodotti
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SetPage;
