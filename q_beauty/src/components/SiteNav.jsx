import React from "react";
import { QB_SHOP_URLS } from "../shopLinks";

function SiteNav({ productMode = false }) {
  const brandHref = productMode ? "/#prodotti" : "/";

  return (
    <header className="site-nav-shell">
      <nav className="site-nav" aria-label="Navigazione principale">
        <a href={brandHref} className="site-nav-brand">
          <img
            src="/qbeauty-wordmark.jpg"
            alt="Q.BEAUTY"
            className="site-nav-brand-mark"
          />
        </a>

        <div className="site-nav-links">
          {productMode ? (
            <>
              <a href="/#recensioni" className="site-nav-link">
                Recensioni
              </a>
              <a href="/#prodotti" className="site-nav-link">
                Prodotti
              </a>
              <a href={QB_SHOP_URLS.shop} className="site-nav-link">
                Shop
              </a>
              <a href="/#contatti" className="site-nav-link">
                Contatti
              </a>
              <a href="/#faq" className="site-nav-link">
                FAQ
              </a>
            </>
          ) : (
            <>
              <a href="/#brand" className="site-nav-link site-nav-link-brand">
                Brand
              </a>
              <a href="/#recensioni" className="site-nav-link">
                Recensioni
              </a>
              <a href="/#prodotti" className="site-nav-link">
                Prodotti
              </a>
              <a href={QB_SHOP_URLS.shop} className="site-nav-link">
                Shop
              </a>
              <a href="/#faq" className="site-nav-link">
                FAQ
              </a>
              <a href="/#contatti" className="site-nav-link">
                Contatti
              </a>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default SiteNav;
