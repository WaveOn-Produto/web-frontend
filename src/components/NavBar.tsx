"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaStore, FaShoppingBag  } from "react-icons/fa";
import { RiAccountCircleFill, RiLogoutBoxRLine } from "react-icons/ri";

interface NavBarProps {
  showNavLinks?: boolean;
}

export default function NavBar({ showNavLinks = true }: NavBarProps) {
  const [logado, setLogado] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = typeof window !== "undefined"
        ? localStorage.getItem("token")
        : null;
      setLogado(!!token);
    };

    checkLoginStatus();

    window.addEventListener("storage", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setLogado(false);
    window.dispatchEvent(new Event("storage"));
    window.location.href = "/";
  };

  const getHeaderClass = () => {
    let classes = "header";
    if (logado) classes += " logged";
    if (!showNavLinks) classes += " logo-only";
    return classes;
  };

  return (
    <header className={getHeaderClass()}>
      <Link href="/" aria-label="Ir para a Home.">
        <div className="logo">
          {!showNavLinks ? (
            <span className="logo-text">WaveOn</span>
          ) : (
            <img
              src="/images/id-visual/WaveOn.svg"
              alt="Logo Stock.io"
              className="logo-img"
            />
          )}
        </div>
      </Link>

      {showNavLinks && (
        <nav className="nav-links">
          {logado ? (
            <>
              <Link href="/ver_mais" className="bag-icon" title="Ver Mais Produtos.">
                <FaShoppingBag />
              </Link>
              <Link href="/lojas" className="store-icon" title="Ver Mais Lojas.">
                <FaStore />
              </Link>
              <Link href="/perfil" className="perfil-icon" title="Ver Perfil.">
                <RiAccountCircleFill />
              </Link>
              <button onClick={handleLogout} className="logout-btn" title="Deslogar">
                <RiLogoutBoxRLine />
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="login-btn">
                Login
              </Link>
              <Link href="/cadastro" className="cadastro-btn">
                Cadastre-se
              </Link>
            </>
          )}
        </nav>
      )}
    </header>
  );
}
