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
              <img src="/images/services/detalhada1.PNG" alt="Lavagem Simples" />
            </div>
            <div className="service-content">
              <h3 className="service-name">Lavagem Simples</h3>
              <p className="service-description">        
              • Externa<br/> • Interna <br/> • Aplicação Cera Líquida
              </p>
              <div className="service-price">A partir de R$ 80,00</div>
              <Link 
                href={handleAgendamento("Lavagem Simples", "80,00")}
                className="service-button"
              >
                Agendar
              </Link>
            </div>
          </div>
          
          <div className="service-card">
            <div className="service-image">
              <img src="/images/services/detalhada2.png" alt="Lavagem Completa" />
            </div>
            <div className="service-content">
              <h3 className="service-name">Lavagem Completa</h3>
              <p className="service-description">• Externa Detalhada<br/> • Interna Detalhada <br/> • Limpeza Detalhada dos Bancos <br/> • Revitalização de Plasticos</p>
              <div className="service-price">A partir de R$ 100,00</div>
              <Link 
                href={handleAgendamento("Lavagem Completa", "100,00")}
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