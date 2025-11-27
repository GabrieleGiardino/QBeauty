import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import BlackFridayModal from "./BlackFridayModal";

const lastImage = "/img/last.jpg";

function App() {
  const [showBFModal, setShowBFModal] = useState(true);

  return (
    <div className="home">
      <main className="App">
        <header className="hero" role="banner">
          <div className="hero-container">
            <img
              src={lastImage}
              alt="Q.BEAUTY"
              className="hero-img"
            />

            <div className="cta-overlay">
              <Link to="/home" className="cta-button">
                Scopri i nostri prodotti →
              </Link>
            </div>
          </div>
        </header>
      </main>

      {/* POPUP BLACK FRIDAY */}
      <BlackFridayModal
        open={showBFModal}
        onClose={() => setShowBFModal(false)}
      />
    </div>
  );
}

export default App;
