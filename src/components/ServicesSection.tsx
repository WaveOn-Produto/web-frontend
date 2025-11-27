"use client";

import React from "react";
import Link from "next/link";

export default function ServicesSection() {
  const handleAgendamento = (servico: string, preco: string) => {
    // Aqui você pode verificar se o usuário está logado
    // Por enquanto, vamos direto para a página de agendamento
    return `/agendamento?servico=${encodeURIComponent(servico)}&preco=${encodeURIComponent(preco)}`;
  };

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
              <Link 
                href={handleAgendamento("Lavagem Simples", "50,00")}
                className="service-button"
              >
                Agendar
              </Link>
            </div>
          </div>
          
          <div className="service-card">
            <div className="service-image">
              <img src="/images/services/lavagem-completa.jpg" alt="Lavagem Completa" />
            </div>
            <div className="service-content">
              <h3 className="service-name">Lavagem Completa</h3>
              <p className="service-description">Interna + Externa + Pretinho</p>
              <div className="service-price">R$ 80,00</div>
              <Link 
                href={handleAgendamento("Lavagem Completa", "80,00")}
                className="service-button"
              >
                Agendar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}