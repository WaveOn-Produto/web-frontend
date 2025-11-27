import React from "react";

export default function ServicesSection() {
  return (
    <section className="services-section">
      <div className="services-container">
        <h2 className="services-title">Serviços</h2>
        
        <div className="services-grid">
          <div className="service-card">
            <div className="service-image">
              <img src="/images/services/lavagem-simples.jpg" alt="Lavagem Simples" />
            </div>
            <div className="service-content">
              <h3 className="service-name">Lavagem Simples</h3>
              <p className="service-description">Externa + Aspiração interna</p>
              <div className="service-price">R$ 50,00</div>
              <button className="service-button">Agendar</button>
            </div>
          </div>
          
          <div className="service-card">
            <div className="service-image">
              <img src="/images/services/lavagem-completa.jpg" alt="Lavagem Completa" />
            </div>
            <div className="service-content">
              <h3 className="service-name">Lavagem Completa</h3>
              <p className="service-description">Interna + Externa + Pretinho</p>
              <div className="service-price">R$ 50,00</div>
              <button className="service-button">Agendar</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}