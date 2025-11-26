import "@/styles/app-css/home.css";
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import ProductCarousel from "@/components/ProductCarousel";
import CategoryCarousel from "@/components/CategoryCarousel";
import StoresCarousel from "@/components/StoresCarousel";
import { allProductSummaries } from "@/data/product";
import type { ProductCategory } from "@/data/product";

export default function HomePage() {
  const produtos = allProductSummaries;

  const categorias: ProductCategory[] = Array.from(
    new Set(produtos.map((p) => p.category))
  );

  return (
    <main className="home-root">
      <NavBar />
      <Hero
        lines={["Do CAOS à organização", "em alguns cliques."]}
        imageSrc="/images/id-visual/garoto-celular.svg"
        imageAlt="Personagem com celular"
      />

      <CategoryCarousel />

      {categorias.map((cat) => {
        const produtosDaCategoria = produtos.filter(
          (p) => p.category === cat
        );

        return (
          <section key={cat} className="home-produtos">
            <ProductCarousel
              title={cat}
              category={cat}
              items={produtosDaCategoria}
            />
          </section>
        );
      })}

      <section className="store-carousel">
        <StoresCarousel />
      </section>
    </main>
  );
}
