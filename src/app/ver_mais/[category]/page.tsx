"use client";

import { use } from "react";
import ProductCatalog from "@/components/ProductCatalog";
import {
  allProductSummaries,
  SLUG_TO_CATEGORY,
  type ProductCategory,
} from "@/data/product";
import { CATEGORY_NAV } from "@/data/categoryNav";

type PageProps = {
  params: Promise<{
    category: string;
  }>;
};

export default function VerMaisCategoryPage({ params }: PageProps) {
  const { category } = use(params);
  const slug = category.toLowerCase();
  const categoria: ProductCategory | undefined = SLUG_TO_CATEGORY[slug];

  const baseProducts = allProductSummaries.filter(
    (product) => product.category === categoria
  );

  return (
    <ProductCatalog
      baseProducts={baseProducts}
      placeholder={
        categoria
          ? `Buscar em ${categoria}...`
          : "Buscar por nome, categoria..."
      }
      title={categoria ? `Produtos de ${categoria}` : "Categoria"}
      categoryNavItems={CATEGORY_NAV}
      activeCategorySlug={slug}
    />
  );
}
