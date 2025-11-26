"use client";

import { useState, KeyboardEvent } from "react";
import { FiSearch } from "react-icons/fi";
import "@/styles/components-css/search-bar.css";

type SearchBarProps = {
  placeholder?: string;
  onSearch?: (term: string) => void;
};

export default function SearchBar({
  placeholder = "Procurar por...",
  onSearch,
}: SearchBarProps) {
  const [term, setTerm] = useState("");

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      onSearch?.(term.trim());
    }
  }

  return (
    <section className="search-section">
      <form className="search-bar" onSubmit={(e) => e.preventDefault()}>
        <input
          className="search-bar__input"
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
        />
        <button type="button" className="search-bar__icon-btn">
          <FiSearch className="search-bar__icon" />
        </button>
      </form>
    </section>
  );
}
