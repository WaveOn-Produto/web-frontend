"use client";

import React, { useState } from "react";
import "@/styles/components-css/cardform.css";

interface CardFormProps {
  onSubmit: (data: { token: string }) => void;
  onCancel: () => void;
}

const CardForm: React.FC<CardFormProps> = ({ onSubmit, onCancel }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [holderName, setHolderName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mock token
    const fakeToken = `TOKEN_${Date.now()}`;

    onSubmit({ token: fakeToken });
  };

  return (
    <div className="cardform-overlay">
      <div className="cardform-container">
        <h2 className="cardform-title">Informações do Cartão</h2>

        <form onSubmit={handleSubmit} className="cardform-form">

          <label className="cardform-label">Número do Cartão</label>
          <input
            className="cardform-input"
            type="text"
            maxLength={16}
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
          />

          <label className="cardform-label">Nome do Titular</label>
          <input
            className="cardform-input"
            type="text"
            value={holderName}
            onChange={(e) => setHolderName(e.target.value)}
            required
          />

          <div className="cardform-row">
            <div>
              <label className="cardform-label">Validade</label>
              <input
                className="cardform-input"
                type="text"
                placeholder="MM/AA"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="cardform-label">CVV</label>
              <input
                className="cardform-input"
                type="password"
                maxLength={4}
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="cardform-buttons">
            <button type="button" onClick={onCancel} className="cancelar-btn">
              Cancelar
            </button>
            <button type="submit" className="confirmar-btn">
              Confirmar Cartão
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CardForm;

