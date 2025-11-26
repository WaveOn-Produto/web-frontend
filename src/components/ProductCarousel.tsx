"use client";

import useEmblaCarousel from "embla-carousel-react";
import ProductCard, { Product } from "@/components/ProductCard";
import Link from "next/link";
import type { ProductCategory } from "@/data/product";
import { CATEGORY_TO_SLUG } from "@/data/product";

type ProductCarouselProps = {
  title?: string;
  category?: ProductCategory;
  items: Product[];
};

export default function ProductCarousel({
  title = "Produtos",
  category,
  items,
}: ProductCarouselProps) {
  const [emblaRef] = useEmblaCarousel({
    loop: false,
    align: "start",
    dragFree: true,
  });

  const categorySlug = category ? CATEGORY_TO_SLUG[category] : null;

  return (
    <section className="home-block">
      <header className="home-block__header">
        <h2 className="home-block__title">
          <span className="home-block__title-main">{title}</span>

          {category && categorySlug && (
            <>
              <span className="home-block__title-em">em</span>
              {/* CLICAR EM “Mercado” → /ver_mais/mercado */}
              <Link
                href={`/ver_mais/${categorySlug}`}
                className="home-block__title-category"
              >
                {category}
              </Link>
            </>
          )}
        </h2>

        {/* BOTÃO “ver mais” → /ver_mais/mercado */}
        <Link
          href={categorySlug ? `/ver_mais/${categorySlug}` : "/ver_mais"}
          className="home-block__action"
        >
          ver mais
        </Link>
      </header>

      <div className="home-prod__viewport" ref={emblaRef}>
        <div className="home-prod__container">
          {items.map((product) => (
            <div key={product.id} className="home-prod__slide">
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
