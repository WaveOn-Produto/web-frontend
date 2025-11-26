"use client"; 

import { useEffect, useState } from "react";

export default function StoreEditButtons() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token); 
    };

    checkLoginStatus();

    window.addEventListener("storage", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="store-edit-buttons">
      <button
        className="edit-btn"
        title="Editar Loja"
        onClick={() => alert("Editar Loja: funcionalidade não implementada ainda")}
      >
        ✎
      </button>
      <button
        className="add-btn"
        title="Adicionar Produto"
        onClick={() => alert("Adicionar Produto: funcionalidade não implementada ainda")}
      >
        +
      </button>
    </div>
  );
}