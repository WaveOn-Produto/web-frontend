"use client";

import React, { useState } from "react";
import Link from "next/link";
import "@/styles/app-css/finalizacao.css";

const FinalizacaoPage: React.FC = () => {
  const [showPaymentCards, setShowPaymentCards] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [selectedDate, setSelectedDate] = useState("15/12/2025");
  const [selectedTime, setSelectedTime] = useState("15:00");
  const [selectedPayment, setSelectedPayment] = useState("");

  const handleContinueInfo = () => {
    setShowPaymentCards(true);
  };

  return (
    <div className="finalizacao-page">
      {/* Header */}
      <header className="finalizacao-header">
        <Link href="/" className="logo">
          <img
            src="/images/id-visual/WaveOn-claro.svg"
            alt="WaveOn Logo"
            className="logo-img"
          />
        </Link>
        <div className="header-actions">
          <button className="icon-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="7" r="4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="sair-button">Sair</button>
        </div>
      </header>

      <div className={`finalizacao-container ${showPaymentCards ? 'multiple-cards' : 'single-card'}`}>
        {/* Card 1: Verificar Informações */}
        <div className={`card ${showPaymentCards ? 'first-card' : ''}`}>
          <h2 className="card-title">Verificar Informações</h2>
          
          <div className="info-section">
            <label className="info-label">Endereços</label>
            <select 
              className="info-select"
              value={selectedAddress}
              onChange={(e) => setSelectedAddress(e.target.value)}
            >
              <option value="">Selecionar</option>
              <option value="rua1">Rua Exemplo, 123 - Bairro</option>
            </select>
          </div>

          <div className="info-section">
            <label className="info-label">Veículo</label>
            <select 
              className="info-select"
              value={selectedVehicle}
              onChange={(e) => setSelectedVehicle(e.target.value)}
            >
              <option value="">Selecionar</option>
              <option value="carro1">Fiat Uno - ABC1234</option>
            </select>
          </div>

          <div className="info-row">
            <div className="info-section">
              <label className="info-label">Data</label>
              <input 
                type="text" 
                className="info-input"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            <div className="info-section">
              <label className="info-label">Hora</label>
              <input 
                type="text" 
                className="info-input"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              />
            </div>
          </div>

          <div className="info-section">
            <label className="info-label">Nome</label>
            <p className="info-text">João Pereira Silva</p>
          </div>

          <div className="info-section">
            <label className="info-label">Email</label>
            <p className="info-text">joaopereira@gmail.com</p>
          </div>

          <div className="info-section">
            <label className="info-label">Celular</label>
            <p className="info-text">(61)99999-2525</p>
          </div>

          <button className="continuar-button" onClick={handleContinueInfo}>
            Continuar
          </button>
        </div>

        {/* Card 2: Selecionar método de pagamento */}
        {showPaymentCards && (
          <div className="card new-card">
            <h2 className="card-title">Selecionar método de pagamento</h2>
            
            <div 
              className={`payment-option ${selectedPayment === 'pix' ? 'selected' : ''}`}
              onClick={() => setSelectedPayment('pix')}
            >
              <div className="payment-icon pix-icon">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <rect width="40" height="40" rx="8" fill="#32BCAD"/>
                  <path d="M28 16l-4 4 4 4M12 16l4 4-4 4M16 12l8 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="payment-info">
                <h3 className="payment-title">PIX</h3>
                <p className="payment-subtitle">Pague com Pix</p>
                <p className="payment-description">Pagamento Rápido por QRCODE</p>
              </div>
            </div>

            <div 
              className={`payment-option ${selectedPayment === 'cartao' ? 'selected' : ''}`}
              onClick={() => setSelectedPayment('cartao')}
            >
              <div className="payment-icon card-icon">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <rect width="40" height="40" rx="8" fill="#555555"/>
                  <rect x="8" y="12" width="24" height="16" rx="2" stroke="white" strokeWidth="2"/>
                  <line x1="8" y1="16" x2="32" y2="16" stroke="white" strokeWidth="2"/>
                </svg>
              </div>
              <div className="payment-info">
                <h3 className="payment-title">Cartão</h3>
                <p className="payment-subtitle">Cartão de crédito</p>
                <p className="payment-description">Pague usando seu cartão</p>
              </div>
            </div>

            <button className="continuar-button">
              Continuar
            </button>
          </div>
        )}

        {/* Card 3: Finalizar Agendamento */}
        {showPaymentCards && (
          <div className="card new-card">
            <h2 className="card-title">Finalizar Agendamento</h2>
            
            <div className="summary-section">
              <p className="summary-label">Lavagem Completa</p>
              <p className="summary-quantity">1x</p>
            </div>

            <div className="total-section">
              <p className="total-label">Total</p>
              <p className="total-value">R$50</p>
            </div>

            <div className="checklist-section">
              <p className="checklist-text">Para melhor atendê-los, pedimos que confirme os seguintes itens:</p>
              <div className="checklist-item">
                <input type="checkbox" id="torneira" />
                <label htmlFor="torneira">Torneira de fácil acesso</label>
              </div>
              <div className="checklist-item">
                <input type="checkbox" id="tomada" />
                <label htmlFor="tomada">Tomada de fácil acesso</label>
              </div>
            </div>

            <button className="continuar-button">
              Continuar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinalizacaoPage;
