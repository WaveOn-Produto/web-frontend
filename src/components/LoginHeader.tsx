"use client";

import Link from "next/link";

export default function LoginHeader() {
  return (
    <header className="login-header-nav">
      <Link href="/" aria-label="Ir para a Home.">
        <div className="login-logo">
          <img
            src="\images\id-visual\WaveOn-claro.svg"
            alt="WaveOn Logo"
            className="login-logo-img"
          />
        </div>
      </Link>
    </header>
  );
}