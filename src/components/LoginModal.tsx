import React from "react";
import Link from "next/link";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  if (!isOpen) return null;

  return (
    <div className="login-modal-overlay" onClick={onClose}>
      <div className="login-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          ×
        </button>
        
        <div className="modal-body">
          <h2 className="modal-title">Você não está logado(a)</h2>
          
          <div className="modal-buttons">
            <Link href="/login" className="modal-btn modal-btn-login">
              Login
            </Link>
            <Link href="/cadastro" className="modal-btn modal-btn-register">
              Cadastre-se
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}