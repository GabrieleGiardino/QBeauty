// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App'; // Solo hero iniziale
import HomePage from './Home'; // Pagina principale con contenuti
import Articolo1 from './articoli/Articolo1';
import Siero from './prodotti/Siero';
import Olio from './prodotti/Olio';
import Spray from './prodotti/Spray';
import SetPage from './Set'; // ✅ Aggiunto per la pagina del Set
import ScrollToTop from './components/ScrollToTop'; // ⬅️ nuovo

import './index.css';
import './i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop /> {/* ⬅️ qui si attiva lo scroll all’inizio */}
      <Routes>
        <Route path="/" element={<App />} /> {/* Hero iniziale */}
        <Route path="/home" element={<HomePage />} /> {/* Pagina con contenuti */}
        <Route path="/prodotti/Siero" element={<Siero />} />
        <Route path="/prodotti/Olio" element={<Olio />} />
        <Route path="/prodotti/Spray" element={<Spray />} />
        <Route path="/articoli" element={<Articolo1 />} />
        <Route path="/set" element={<SetPage />} /> {/* ✅ Nuova pagina Set */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
