"use client";

import React, { useState } from "react";
import Link from "next/link";
import "@/styles/app-css/cadastro.css";
import apiClient from "@/services/api";
import { User } from "@/types/auth";

const RegisterPage: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [success, setSuccess] = useState("");
  const [serverError, setServerError] = useState("");

  function validate() {
    const newErrors = { name: "", username: "", email: "", password: "", confirm: "" };
    let valid = true;

    if (!form.name) {
      newErrors.name = "Informe o Nome Completo.";
      valid = false;
    }

    if (!form.username) {
      newErrors.username = "Informe um Username.";
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
    } else if (form.password.length < 8) {
      newErrors.password = "A senha deve ter pelo menos 8 caracteres.";
      valid = false;
    } else if (!/[A-Z]/.test(form.password)) {
      newErrors.password = "A senha deve conter pelo menos uma letra maiúscula.";
      valid = false;
    } else if (!/[a-z]/.test(form.password)) {
      newErrors.password = "A senha deve conter pelo menos uma letra minúscula.";
      valid = false;
    } else if (!/[0-9]/.test(form.password)) {
      newErrors.password = "A senha deve conter pelo menos um número.";
      valid = false;
    }
    else if (!/[^A-Za-z0-9]/.test(form.password)) {
    newErrors.password = "A senha deve conter pelo menos um caractere especial.";
    valid = false;
    }


    if (form.confirm !== form.password) {
      newErrors.confirm = "As senhas não conferem.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSuccess("");
    setServerError("");

    if (!validate()) return;

    try {
      const response = await apiClient.post<User>("/users", {
        fullName: form.name,
        username: form.username,
        email: form.email,
        password: form.password,
      });
      setSuccess("Conta criada com sucesso! Redirecionando...");
      
      // Limpa o formulário
      setForm({
        name: "",
        username: "",
        email: "",
        password: "",
        confirm: "",
      });
      
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
    <main className="signup-root">
      <section className="signup-left">
        <form
          className="signup-panel"
          aria-describedby="signup-desc"
          onSubmit={handleSubmit}
          noValidate
        >
          <header className="signup-header">
            <h1 id="signup-title" className="signup-title">
              CRIE SUA CONTA
            </h1>
          </header>

          {serverError && <p className="form-error">{serverError}</p>}
          {success && <p className="form-success">{success}</p>}

          <label htmlFor="name" className="sr-only">
            Nome Completo
          </label>
          <input
            id="name"
            type="text"
            placeholder="Nome Completo"
            className={`signup-input ${errors.name ? "input-error" : ""}`}
            required
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && (
            <span className="input-hint error">{errors.name}</span>
          )}

          <label htmlFor="username" className="sr-only">
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="Username"
            className={`signup-input ${errors.username ? "input-error" : ""}`}
            required
            value={form.username}
            onChange={handleChange}
          />
          {errors.username && (
            <span className="input-hint error">{errors.username}</span>
          )}

          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            className={`signup-input ${errors.email ? "input-error" : ""}`}
            required
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && (
            <span className="input-hint error">{errors.email}</span>
          )}

          <label htmlFor="password" className="sr-only">
            Senha
          </label>
          <input
            id="password"
            type="password"
            placeholder="Senha"
            className={`signup-input ${errors.password ? "input-error" : ""}`}
            required
            value={form.password}
            onChange={handleChange}
          />
          {errors.password && (
            <span className="input-hint error">{errors.password}</span>
          )}

          <label htmlFor="confirm" className="sr-only">
            Confirmar Senha
          </label>
          <input
            id="confirm"
            type="password"
            placeholder="Confirmar Senha"
            className={`signup-input ${errors.confirm ? "input-error" : ""}`}
            required
            value={form.confirm}
            onChange={handleChange}
          />
          {errors.confirm && (
            <span className="input-hint error">{errors.confirm}</span>
          )}

          <button type="submit" className="signup-button">
            CRIAR CONTA
          </button>

          <p className="signup-login">
            Já possui uma conta?{" "}
            <Link href="/login" className="signup-link-cta">
              Login
            </Link>
          </p>
        </form>
      </section>

      <section className="signup-right">
        <div className="signup-figure">
          <a href="/">
            <img
              src="/images/id-visual/logo_escura.svg"
              alt="Stock.io"
              className="signup-logo"
            />
          </a>
          <img
            src="/images/id-visual/garoto-controle.svg"
            alt="Ilustração personagem"
            className="signup-image"
          />
        </div>
      </section>
    </main>
  );
};

export default RegisterPage;
