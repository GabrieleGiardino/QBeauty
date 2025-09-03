import React from 'react';
import '../App.css';
import cremaImage from '../assets/crema_piedi.jpg';
import cremaUsoImage from '../assets/img_5511.JPG';

function Siero() {
  return (
    <main className="product-page">
      <h1 className="product-title">Crema piedi idratante</h1>

      <div className="product-card">
        <div className="product-image">
          <img src={cremaImage} alt="Crema Piedi Idratante" />
          <img
            src={cremaUsoImage}
            alt="Applicazione crema piedi"
            style={{ marginTop: '1rem', borderRadius: '10px', maxWidth: '100%' }}
          />
        </div>

        <div className="product-details">
          <p>
            Il terzo prodotto della linea <strong>Q.BEAUTY</strong> è la crema piedi idratante e cheratolitica con 10% di urea, perfetta per chiudere in bellezza il trattamento o per un’idratazione quotidiana del piede.
          </p>

          <ul>
            <li><strong>UREA:</strong> Azione idratante e cheratolitica che rallenta il processo di stratificazione cornea</li>
            <li><strong>GLICEROLO VEGETALE:</strong> Umettante in grado di prevenire la perdita di acqua transdermica</li>
            <li><strong>BURRO DI KARITÈ E CACAO:</strong> Emollienti e nutrienti</li>
            <li><strong>OLIO DI MANDORLE DOLCI:</strong> Emolliente, nutriente ed elasticizzante</li>
            <li><strong>OLIO DI CAMELINA:</strong> Emolliente, addolcente e antiossidante, ricco naturalmente di Vitamina E</li>
            <li><strong>AMIDO DI MAIS:</strong> Dona alla formula un tocco asciutto e setoso</li>
            <li><strong>MOLECOLA ANTI-ODORE:</strong> Neutralizza istantaneamente qualsiasi odore</li>
            <li><strong>ESTRATTO DI DATTERO:</strong> Azione protettiva, idratante, antinfiammatoria e antimicotica naturale</li>
            <li><strong>ESTRATTO DI AVENA:</strong> Lenitivo, addolcente e calmante</li>
            <li><strong>PROFUMO:</strong> Dolce e floreale, avvolgente e persistente</li>
          </ul>

          <p>
            <strong>Modalità d’impiego:</strong> Prelevare una piccola dose di crema, la quantità che sta sulla falangetta dell’indice è sufficiente per 2 piedi, e massaggiare fino al completo assorbimento.
            Per potenziare l’azione della crema e favorire l’azione cheratolitica ed idratante è consigliata l’applicazione quotidiana.
          </p>

          <ul>
            <li> L’applicazione della crema è consigliata sui piedi</li>
            <li> Formato da 100ml</li>
            <li> Prodotto Made in Italy 🇮🇹</li>
            <li> Cruelty Free 🐰 </li>
            <li> Vegan 🍃 </li>
            <li> +90% di ingredienti di origine naturale 🌿</li>
          </ul>
          <div style={{ marginTop: '2rem', fontSize: '1.3rem', lineHeight: '1.6' }}>
            <p><strong>💰 Prezzo:</strong> € 24,90</p>
            <p>🔹 <strong>-10%</strong> sul primo acquisto → <strong>€ 22,40</strong></p>
            <p>🔹 <strong>-15%</strong> FISSO per le P. IVA → <strong>€ 21,00  IVA incl.</strong></p>
          </div>
        </div>
      </div>

      <a href="/Home" className="cta-button" style={{ display: "inline-block", marginTop: "2rem" }}>
        ← Torna alla Home
      </a>
    </main>
  );
}

export default Siero;
