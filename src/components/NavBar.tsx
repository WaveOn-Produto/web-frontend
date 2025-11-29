"use client";

import Link from "next/link";
import { useAuthContext } from "@/contexts/AuthContext";
import { FaCalendarAlt, FaUser } from "react-icons/fa";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { MdAdminPanelSettings } from "react-icons/md";

interface NavBarProps {
  showNavLinks?: boolean;
}

export default function NavBar({ showNavLinks = true }: NavBarProps) {
  const { isAuthenticated, logout, user } = useAuthContext();

  const handleLogout = () => {
    logout();
  };

  const getHeaderClass = () => {
    let classes = "header";
    if (isAuthenticated) classes += " logged";
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
              alt="Logo WaveOn"
              className="logo-img"
            />
          )}
        </div>
      </Link>

      {showNavLinks && (
        <nav className="nav-links">
          {isAuthenticated ? (
            <>
              {user?.role === 'ADMIN' && (
                <Link href="/admin" className="nav-link admin-link" title="Painel Admin">
                  <MdAdminPanelSettings />
                  <span>Painel Admin</span>
                </Link>
              )}
              <Link href="/agendamentos" className="nav-link" title="Meus Agendamentos">
                <FaCalendarAlt />
                <span>Agendamentos</span>
              </Link>
              <Link href="/perfil" className="nav-link" title="Meu Perfil">
                <FaUser />
                <span>Perfil</span>
              </Link>
              <button onClick={handleLogout} className="logout-btn" title="Sair">
                <RiLogoutBoxRLine />
                <span>Sair</span>
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
