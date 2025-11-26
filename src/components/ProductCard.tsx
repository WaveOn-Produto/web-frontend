// src/components/ProductCard.tsx
import Link from 'next/link';
import type { ProductSummary } from '@/data/product';
import "@/styles/components-css/product-card.css";

export type StoreSeal = "cjr" | "moumer" | "nako" | string;
export type Availability = "DISPONÍVEL" | "INDISPONÍVEL";

export type Product = ProductSummary;

function imageSrc(image: string) {
  return `/images/produtos/${image}.svg`;
}

function sealSrc(seal: string) {
  return `/images/lojas/${seal}.svg`;
}

export default function ProductCard(props: Product) {
  const { id, name, price, unit, image, seal, availability } = props;

  return (
    <Link href={`/produtos/${id}`} className="product-card-link">
      <article className="card">
        <div className="thumb">
          <img src={imageSrc(image)} alt={name} />
          <img className="seal" src={sealSrc(seal)} alt={`Selo ${seal}`} />
        </div>
        <h3 className="title">{name}</h3>
        <p className="price">
          {price} {unit && <span className="unit">{unit}</span>}
        </p>
        <p
          className={`availability ${availability === "DISPONÍVEL" ? "ok" : "off"}`}
        >
          {availability}
        </p>
      </article>
    </Link>
  );
}
