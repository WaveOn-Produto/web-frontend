"use client";

import React, { useState } from "react";
import Link from "next/link";
import LoginHeader from "@/components/LoginHeader";
import CarModal, { CarData } from "@/components/CarModal";
import AddressModal, { AddressData } from "@/components/AddressModal";
import "@/styles/app-css/cadastro.css";
import apiClient from "@/services/api";
import { User } from "@/types/auth";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaMapMarkerAlt, FaQuestionCircle } from "react-icons/fa";

const RegisterPage: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    cellphone: "",
    carro: "",
    endereco: "",
  });

  const [isCarModalOpen, setIsCarModalOpen] = useState(false);
  const [carsList, setCarsList] = useState<CarData[]>([]);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [addressList, setAddressList] = useState<AddressData[]>([]);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    cellphone: "",
    carro: "",
    endereco: "",
  });

  const [success, setSuccess] = useState("");
  const [serverError, setServerError] = useState("");

  function validate() {
    const newErrors = { name: "", email: "", password: "", cellphone: "", carro: "", endereco: "" };
    let valid = true;

    if (!form.name) {
      newErrors.name = "Informe o Nome Completo.";
      valid = false;
    }

    if (!form.email) {
      newErrors.email = "Informe o e-mail.";
      valid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) {
        newErrors.email = "E-mail inválido.";
        valid = false;
      }
    }

    if (!form.password) {
      newErrors.password = "Informe a senha.";
      valid = false;
    } else if (form.password.length < 6) {
      newErrors.password = "A senha deve ter pelo menos 6 caracteres.";
      valid = false;
    }

    if (!form.cellphone) {
      newErrors.cellphone = "Informe o celular.";
      valid = false;
    }

    if (!form.carne) {
      newErrors.carne = "Selecione o tipo de carnê.";
      valid = false;
    }

    if (!form.endereco) {
      newErrors.endereco = "Selecione o endereço.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  }

  const handleSaveCar = (car: CarData) => {
    setCarsList((prev) => [...prev, car]);
    console.log("Carro salvo:", car);
  };

  const handleSaveAddress = (address: AddressData) => {
    setAddressList((prev) => [...prev, address]);
    console.log("Endereço salvo:", address);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSuccess("");
    setServerError("");

    if (!validate()) return;

    try {
      const response = await apiClient.post<User>("/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
        cellphone: form.cellphone,
        carne: form.carne,
        endereco: form.endereco,
      });

      setSuccess("Conta criada com sucesso! Redirecionando para login...");

      // Redireciona para login após 2 segundos
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Erro ao criar conta.";
      if (Array.isArray(errorMessage)) {
        setServerError(errorMessage.join(", "));
      } else {
        setServerError(errorMessage);
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <LoginHeader />
      
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 80px)',
        paddingTop: '9rem',
        paddingBottom: '2rem',
        paddingLeft: '1rem',
        paddingRight: '1rem'
      }}>
        <div className="cadastro-form">
            <h1 className="cadastro-title">Criar conta</h1>
            
            {serverError && <p className="form-error">{serverError}</p>}
            {success && <p className="form-success">{success}</p>}
            
            <form className="space-y-3" onSubmit={handleSubmit}>
              {/* Nome */}
              <div className="input-group">
                <label className="input-label" htmlFor="name">Nome</label>
                <div className="input-wrapper">
                  <FaUser className="input-icon" />
                  <input
                    id="name"
                    type="text"
                    placeholder="Digite seu nome completo"
                    className={`cadastro-input ${errors.name ? "input-error" : ""}`}
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>
                {errors.name && <span className="input-hint error">{errors.name}</span>}
              </div>

              {/* Email */}
              <div className="input-group">
                <label className="input-label" htmlFor="email">Email</label>
                <div className="input-wrapper">
                  <FaEnvelope className="input-icon" />
                  <input
                    id="email"
                    type="email"
                    placeholder="Digite seu e-mail"
                    className={`cadastro-input ${errors.email ? "input-error" : ""}`}
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
                {errors.email && <span className="input-hint error">{errors.email}</span>}
              </div>

              {/* Senha */}
              <div className="input-group">
                <label className="input-label" htmlFor="password">Senha</label>
                <div className="input-wrapper">
                  <FaLock className="input-icon" />
                  <input
                    id="password"
                    type="password"
                    placeholder="Digite sua senha"
                    className={`cadastro-input ${errors.password ? "input-error" : ""}`}
                    value={form.password}
                    onChange={handleChange}
                  />
                </div>
                {errors.password && <span className="input-hint error">{errors.password}</span>}
              </div>

              {/* Celular */}
              <div className="input-group">
                <label className="input-label" htmlFor="cellphone">Celular</label>
                <div className="input-wrapper">
                  <FaPhone className="input-icon" />
                  <input
                    id="cellphone"
                    type="tel"
                    placeholder="Digite seu celular"
                    className={`cadastro-input ${errors.cellphone ? "input-error" : ""}`}
                    value={form.cellphone}
                    onChange={handleChange}
                  />
                </div>
                {errors.cellphone && <span className="input-hint error">{errors.cellphone}</span>}
              </div>

              {/* Carros e Endereços lado a lado */}
              <div className="side-by-side-fields">
                {/* Carros */}
                <div className="input-group half-width">
                  <label className="input-label" htmlFor="carro">Carros</label>
                  <div className="select-wrapper">
                    <select
                      id="carro"
                      value={form.carro}
                      onChange={handleChange}
                      className={`cadastro-select ${errors.carro ? "input-error" : ""}`}
                    >
                      <option value="">Selecionar</option>
                      {carsList.map((car, index) => (
                        <option key={index} value={`${car.brand}-${car.model}`}>
                          {car.name} - {car.plate}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button type="button" className="add-button" onClick={() => setIsCarModalOpen(true)}>
                    <img src="/images/icons/VectorAdd.svg" alt="Adicionar" />
                  </button>
                  {errors.carro && <span className="input-hint error">{errors.carro}</span>}
                </div>

                {/* Endereços */}
                <div className="input-group half-width">
                  <label className="input-label" htmlFor="endereco">Endereços</label>
                  <div className="select-wrapper">
                    <select
                      id="endereco"
                      value={form.endereco}
                      onChange={handleChange}
                      className={`cadastro-select ${errors.endereco ? "input-error" : ""}`}
                    >
                      <option value="">Selecionar</option>
                      {addressList.map((address, index) => (
                        <option key={index} value={`${address.endereco}-${address.numero}`}>
                          {address.endereco}, {address.numero} - {address.bairro}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button type="button" className="add-button" onClick={() => setIsAddressModalOpen(true)}>
                    <img src="/images/icons/VectorAdd.svg" alt="Adicionar" />
                  </button>
                  {errors.endereco && <span className="input-hint error">{errors.endereco}</span>}
                </div>
              </div>

              {/* Botões */}
              <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '24px'}}>
                <button type="submit" className="cadastro-btn-primary">
                  Cadastrar
                </button>
                <Link href="/" className="cadastro-btn-secondary">
                  Voltar
                </Link>
              </div>
            </form>
          </div>
      </div>

      {/* Modal de Carros */}
      <CarModal
        isOpen={isCarModalOpen}
        onClose={() => setIsCarModalOpen(false)}
        onSave={handleSaveCar}
      />

      {/* Modal de Endereços */}
      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        onSave={handleSaveAddress}
      />
    </div>
  );
};

export default RegisterPage;