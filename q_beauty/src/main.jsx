// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import App from './App';              // Hero iniziale
import HomePage from './Home';        // <-- se il file è HomePage.jsx, usa: './HomePage'
import Articolo1 from './articoli/Articolo1';
import Siero from './prodotti/Siero';
import Olio from './prodotti/Olio';
import Spray from './prodotti/Spray';
import SetPage from './Set';
import ScrollToTop from './components/ScrollToTop';
import CookieBanner from './components/CookieBanner';
import PrivacyPolicy from './PrivacyPolicy';

import './index.css';
import './i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <CookieBanner />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<HomePage />} />

        {/* redirect per chi arriva su /Home (maiuscolo) */}
        <Route path="/Home" element={<Navigate to="/home" replace />} />

        <Route path="/prodotti/Siero" element={<Siero />} />
        <Route path="/prodotti/Olio" element={<Olio />} />
        <Route path="/prodotti/Spray" element={<Spray />} />
        <Route path="/articoli" element={<Articolo1 />} />
        <Route path="/set" element={<SetPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />

        {/* catch-all: qualunque altra rotta → home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
