"use client";

import React from "react";
import AdminSidebar from "@/components/AdminSidebar";
import "@/styles/app-css/admin.css";

export default function AdminDashboard() {
  const stats = [
    {
      title: "Agendamentos Hoje",
      value: "8",
      icon: "📅",
      color: "#3a94e7",
    },
    {
      title: "Pendentes",
      value: "12",
      icon: "⏰",
      color: "#f59e0b",
    },
    {
      title: "Concluídos (Mês)",
      value: "145",
      icon: "✅",
      color: "#10b981",
    },
    {
      title: "Receita (Mês)",
      value: "R$ 14.500",
      icon: "💰",
      color: "#8b5cf6",
    },
  ];

  const recentAppointments = [
    {
      id: 1,
      cliente: "João Silva",
      servico: "Lavagem completa",
      horario: "09:00",
      status: "SCHEDULED",
    },
    {
      id: 2,
      cliente: "Maria Santos",
      servico: "Lavagem simples",
      horario: "10:00",
      status: "SCHEDULED",
    },
    {
      id: 3,
      cliente: "Pedro Costa",
      servico: "Lavagem completa",
      horario: "14:00",
      status: "SCHEDULED",
    },
  ];

  return (
    <div className="admin-layout">
      <AdminSidebar />
      
      <main className="admin-content">
        <div className="admin-header">
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Visão geral do sistema</p>
        </div>

        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card" style={{ borderTopColor: stat.color }}>
              <div className="stat-icon" style={{ background: `${stat.color}20`, color: stat.color }}>
                {stat.icon}
              </div>
              <div className="stat-content">
                <p className="stat-label">{stat.title}</p>
                <h3 className="stat-value">{stat.value}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="dashboard-section">
          <h2 className="section-title">Agendamentos de Hoje</h2>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Serviço</th>
                  <th>Horário</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {recentAppointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td>{appointment.cliente}</td>
                    <td>{appointment.servico}</td>
                    <td>{appointment.horario}</td>
                    <td>
                      <span className="badge badge-scheduled">Agendado</span>
                    </td>
                    <td>
                      <button className="btn-icon">👁️</button>
                      <button className="btn-icon">✏️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
