"use client";

import React, { useState } from "react";
import Link from "next/link";
import LoginHeader from "@/components/LoginHeader";
import "@/styles/app-css/login.css";
import apiClient from "@/services/api";
import { LoginResponse } from "@/types/auth";
import { FaEnvelope, FaLock } from "react-icons/fa";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState("");

  function validate() {
    const newErrors = { email: "", password: "" };
    let valid = true;

    if (!email) {
      newErrors.email = "Informe o e-mail.";
      valid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        newErrors.email = "E-mail inválido.";
        valid = false;
      }
    }
    if (!password) {
      newErrors.password = "Informe a senha.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError("");
    setSuccess("");

    if (!validate()) return;
    
    try {
      const response = await apiClient.post<LoginResponse>("/auth/login", {
        email,
        password,
      });
      
      // Armazena o token JWT no localStorage
      if (response.data.access_token) {
        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        window.dispatchEvent(new Event("storage"));
      }
      
      setSuccess("Login realizado com sucesso! Redirecionando...");
      
      // Redireciona para a home após 1 segundo
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Erro ao realizar login.";
      if (error.response?.status === 401) {
        setServerError("Email ou senha incorretos.");
      } else {
        setServerError(errorMessage);
      }
    }
  }

  return (
    <>
      <LoginHeader />
      <main className="login-root">
        <section className="login-illustration">
      </section>

      <section className="login-card" aria-labelledby="login-title">
        <form
          className="login-form"
          aria-describedby="login-description"
          onSubmit={handleSubmit}
          noValidate
        >
          <header className="login-header">
            <h1 id="login-title" className="login-title">
              Login
            </h1>
          </header>

          {serverError && <p className="form-error">{serverError}</p>}
          {success && <p className="form-success">{success}</p>}

          <div className="input-group">
            <label className="input-label" htmlFor="email">E-mail</label>
            <div className="input-wrapper">
              <FaEnvelope className="input-icon" />
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Digite seu e-mail"
                autoComplete="email"
                className={`login-input ${errors.email ? "input-error" : ""}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {errors.email && (
              <span className="input-hint error">{errors.email}</span>
            )}
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="password">Senha</label>
            <div className="input-wrapper">
              <FaLock className="input-icon" />
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Digite sua senha"
                autoComplete="current-password"
                className={`login-input ${errors.password ? "input-error" : ""}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {errors.password && (
              <span className="input-hint error">{errors.password}</span>
            )}
          </div>

          <div className="login-buttons">
            <button type="submit" className="login-button login-button-primary">
              Entrar
            </button>
            <Link href="/" className="login-button login-button-secondary">
              Voltar
            </Link>
          </div>
        </form>
      </section>
    </main>
    </>
  );
};

export default LoginPage;
