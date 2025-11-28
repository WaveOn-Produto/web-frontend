"use client";

import React, { useState } from "react";
import Link from "next/link";
import "@/styles/app-css/agendamentos.css";

interface Agendamento {
  id: number;
  servico: string;
  data: string;
  hora: string;
  endereco: string;
  veiculo: string;
  status: "agendado" | "em_andamento" | "concluido" | "cancelado";
  valor: number;
}

const AgendamentosPage: React.FC = () => {
  const [agendamentos] = useState<Agendamento[]>([
    {
      id: 1,
      servico: "Lavagem Completa",
      data: "15/12/2025",
      hora: "15:00",
      endereco: "Rua Exemplo, 123 - Bairro",
      veiculo: "Fiat Uno - ABC1234",
      status: "agendado",
      valor: 50
    },
    {
      id: 2,
      servico: "Lavagem Simples",
      data: "10/12/2025",
      hora: "10:00",
      endereco: "Av. Principal, 456 - Centro",
      veiculo: "Honda Civic - XYZ5678",
      status: "concluido",
      valor: 35
    },
    {
      id: 3,
      servico: "Lavagem Premium",
      data: "20/12/2025",
      hora: "14:00",
      endereco: "Rua das Flores, 789 - Jardim",
      veiculo: "Toyota Corolla - DEF9012",
      status: "agendado",
      valor: 80
    }
  ]);

  const getStatusLabel = (status: string) => {
    const labels: { [key: string]: string } = {
      agendado: "Agendado",
      em_andamento: "Em Andamento",
      concluido: "Concluído",
      cancelado: "Cancelado"
    };
    return labels[status] || status;
  };

  const getStatusClass = (status: string) => {
    return `status-badge status-${status}`;
  };

  return (
    <div className="agendamentos-page">
      {/* Header */}
      <header className="agendamentos-header">
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

      <div className="agendamentos-container">
        <div className="page-header">
          <h1 className="page-title">Meus Agendamentos</h1>
          <p className="page-subtitle">Acompanhe todos os seus serviços agendados</p>
        </div>

        <div className="agendamentos-grid">
          {agendamentos.map((agendamento) => (
            <div key={agendamento.id} className="agendamento-card">
              <div className="card-header">
                <h3 className="servico-titulo">{agendamento.servico}</h3>
                <span className={getStatusClass(agendamento.status)}>
                  {getStatusLabel(agendamento.status)}
                </span>
              </div>

              <div className="card-body">
                <div className="info-row">
                  <div className="info-item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="info-icon">
                      <rect x="3" y="4" width="18" height="18" rx="2" stroke="#3A94E7" strokeWidth="2"/>
                      <line x1="16" y1="2" x2="16" y2="6" stroke="#3A94E7" strokeWidth="2" strokeLinecap="round"/>
                      <line x1="8" y1="2" x2="8" y2="6" stroke="#3A94E7" strokeWidth="2" strokeLinecap="round"/>
                      <line x1="3" y1="10" x2="21" y2="10" stroke="#3A94E7" strokeWidth="2"/>
                    </svg>
                    <div className="info-content">
                      <span className="info-label">Data e Hora</span>
                      <span className="info-value">{agendamento.data} às {agendamento.hora}</span>
                    </div>
                  </div>
                </div>

                <div className="info-row">
                  <div className="info-item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="info-icon">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="#3A94E7" strokeWidth="2"/>
                      <circle cx="12" cy="10" r="3" stroke="#3A94E7" strokeWidth="2"/>
                    </svg>
                    <div className="info-content">
                      <span className="info-label">Endereço</span>
                      <span className="info-value">{agendamento.endereco}</span>
                    </div>
                  </div>
                </div>

                <div className="info-row">
                  <div className="info-item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="info-icon">
                      <path d="M5 17h14M5 17l1.5-5h11L19 17M5 17c-1.657 0-3-1.343-3-3v-1h20v1c0 1.657-1.343 3-3 3M8 12V7c0-2.209 1.791-4 4-4s4 1.791 4 4v5" stroke="#3A94E7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <div className="info-content">
                      <span className="info-label">Veículo</span>
                      <span className="info-value">{agendamento.veiculo}</span>
                    </div>
                  </div>
                </div>

                <div className="card-footer">
                  <div className="valor-total">
                    <span className="valor-label">Valor:</span>
                    <span className="valor-value">R$ {agendamento.valor.toFixed(2)}</span>
                  </div>
                  
                  <div className="card-actions">
                    {agendamento.status === "agendado" && (
                      <>
                        <button className="btn-secondary">Reagendar</button>
                        <button className="btn-danger">Cancelar</button>
                      </>
                    )}
                    {agendamento.status === "concluido" && (
                      <button className="btn-primary">Agendar Novamente</button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {agendamentos.length === 0 && (
          <div className="empty-state">
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="4" width="18" height="18" rx="2" stroke="#CCCCCC" strokeWidth="2"/>
              <line x1="16" y1="2" x2="16" y2="6" stroke="#CCCCCC" strokeWidth="2" strokeLinecap="round"/>
              <line x1="8" y1="2" x2="8" y2="6" stroke="#CCCCCC" strokeWidth="2" strokeLinecap="round"/>
              <line x1="3" y1="10" x2="21" y2="10" stroke="#CCCCCC" strokeWidth="2"/>
            </svg>
            <h2 className="empty-title">Nenhum agendamento encontrado</h2>
            <p className="empty-text">Você ainda não possui agendamentos. Que tal fazer o primeiro?</p>
            <Link href="/agendamento" className="btn-primary">
              Fazer Agendamento
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgendamentosPage;
