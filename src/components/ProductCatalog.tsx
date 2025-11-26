"use client";

import { useState } from "react";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import SearchBar from "@/components/SearchBar";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";
import "@/styles/components-css/product-catalog.css";
import type { ProductSummary } from "@/data/product";
import type { CategoryNavItem } from "@/data/categoryNav";
import { FiHome } from "react-icons/fi";

function normalize(str: string) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

type ProductCatalogProps = {
  baseProducts: ProductSummary[];
  placeholder?: string;
  title?: string;
  categoryNavItems?: CategoryNavItem[];
  activeCategorySlug?: string;
};

export default function ProductCatalog({
  baseProducts,
  placeholder = "Buscar por nome, categoria...",
  title,
  categoryNavItems,
  activeCategorySlug,
}: ProductCatalogProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState(baseProducts);
  const [loading, setLoading] = useState(false);

  const productsPerPage = 15;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const startIndex = (currentPage - 1) * productsPerPage;
  const visibleProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  function handleSearch(term: string) {
    const trimmed = term.trim();

    if (!trimmed) {
      setFilteredProducts(baseProducts);
      setCurrentPage(1);
      return;
    }

    const normalizedTerm = normalize(trimmed);

    const result = baseProducts.filter((p: any) => {
      const name = normalize(p.name);
      const categoryStr = normalize(p.category ?? "");
      const seal = normalize(p.seal ?? "");

      return (
        name.includes(normalizedTerm) ||
        categoryStr.includes(normalizedTerm) ||
        seal.includes(normalizedTerm)
      );
    });

    setFilteredProducts(result);
    setCurrentPage(1);
  }

  return (
    <div className="home-root">
      <NavBar />

      <main>
        <div className="catalog-header">
          <div className="catalog-header-left">
            {/* Botão Home minimalista */}
            <Link href="/" className="catalog-home-btn">
              <FiHome className="catalog-home-icon" />
              <span>Home</span>
            </Link>

            {title && <h1 className="catalog-title">{title}</h1>}

            {categoryNavItems && categoryNavItems.length > 0 && (
              <nav className="catalog-cats">
                {categoryNavItems.map((item) => (
                  <Link
                    key={item.slug}
                    href={item.href}
                    className={
                      "catalog-cat-chip" +
                      (item.slug === activeCategorySlug ? " active" : "")
                    }
                  >
                    {item.icon && (
                      <span className="catalog-cat-icon">{item.icon}</span>
                    )}
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>
            )}
          </div>

          <SearchBar placeholder={placeholder} onSearch={handleSearch} />
        </div>

        {loading && <p style={{ textAlign: "center" }}>Carregando...</p>}

        <section className="catalog">
          {visibleProducts.length > 0 ? (
            visibleProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))
          ) : (
            <p style={{ textAlign: "center", marginTop: "2rem" }}>
              Nenhum produto encontrado.
            </p>
          )}
        </section>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </main>
    </div>
  );
}
