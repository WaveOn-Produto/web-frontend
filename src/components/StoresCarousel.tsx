"use client";

import { useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import { STORES, type StoreCategory } from "@/data/stores";
import StoreCard from "./StoreCard";
import "@/styles/components-css/store-carousel.css";
import type { ReactNode } from "react";
import {
  FaShoppingCart,
  FaClinicMedical,
  FaSmile,
  FaTshirt,
  FaLaptop,
  FaGamepad,
  FaRobot,
  FaEllipsisH,
} from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";

const CATEGORIES: { value: StoreCategory; label: string; icon?: ReactNode }[] = [
  { value: "mercado", label: "Mercado", icon: <FaShoppingCart /> },
  { value: "farmacia", label: "Farmácia", icon: <FaClinicMedical /> },
  { value: "beleza", label: "Beleza", icon: <FaSmile /> },
  { value: "moda", label: "Moda", icon: <FaTshirt /> },
  { value: "eletronicos", label: "Eletrônicos", icon: <FaLaptop /> },
  { value: "jogos", label: "Jogos", icon: <FaGamepad /> },
  { value: "brinquedos", label: "Brinquedos", icon: <FaRobot /> },
  { value: "casa", label: "Casa", icon: <FaHouse /> },
  { value: "outros", label: "Outros", icon: <FaEllipsisH /> },
];

export default function StoresCarousel() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<StoreCategory[]>([]);
  const [emblaRef] = useEmblaCarousel({
    loop: false,
    align: "start",
    dragFree: true,
  });

  const filteredStores = useMemo(() => {
    if (selectedCategories.length === 0) return STORES;
    return STORES.filter((store) => selectedCategories.includes(store.category));
  }, [selectedCategories]);

  function toggleCategory(category: StoreCategory) {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  }

  return (
    <section className="stores">
      <div className="stores-header">
        <h2 className="stores-title">Lojas</h2>

        {/* bloco de ações: filtros + ver mais */}
        <div className="stores-header-actions">
          <div className={`stores-filter ${isFilterOpen ? "is-open" : ""}`}>
            <button
              type="button"
              className="stores-filter-toggle"
              onClick={() => setIsFilterOpen((open) => !open)}
            >
              <span>filtros</span>
              <span className="stores-filter-chevron">
                {isFilterOpen ? "▲" : "▼"}
              </span>
            </button>

            {isFilterOpen && (
              <div className="stores-filter-panel">
                <div className="stores-filter-panel-header">
                  <span>filtros</span>
                  <button
                    type="button"
                    className="stores-filter-close"
                    onClick={() => setIsFilterOpen(false)}
                  >
                    ✕
                  </button>
                </div>

                <ul className="stores-filter-list">
                  {CATEGORIES.map((cat) => {
                    const checked = selectedCategories.includes(cat.value);
                    return (
                      <li key={cat.value} className="stores-filter-item">
                        <button
                          type="button"
                          className={`stores-filter-chip ${checked ? "is-checked" : ""}`}
                          onClick={() => toggleCategory(cat.value)}
                        >
                          <span className="stores-filter-checkbox">
                            {checked && "✔"}
                          </span>
                          <span className="stores-filter-label">
                            {cat.label}{" "}
                            {cat.icon && (
                              <span className="stores-filter-icon">{cat.icon}</span>
                            )}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>

          {/* usa o mesmo estilo do "ver mais" das outras seções, se quiser */}
          <Link href="/lojas" className="home-block__action">
            ver mais
          </Link>
        </div>
      </div>

      <div className="stores-carousel__viewport" ref={emblaRef}>
        <div className="stores-carousel__container">
          {filteredStores.map((store) => (
            <div key={store.id} className="stores-carousel__slide">
              <StoreCard store={store} variant="carousel" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
