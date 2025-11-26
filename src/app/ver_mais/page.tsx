"use client";

import ProductCatalog from "@/components/ProductCatalog";
import { allProductSummaries } from "@/data/product";
import { CATEGORY_NAV } from "@/data/categoryNav";

export default function VerMaisPage() {
  return (
    <ProductCatalog
      baseProducts={allProductSummaries}
      placeholder="Buscar por nome, categoria..."
      title="Todos os produtos"
      categoryNavItems={CATEGORY_NAV}
      activeCategorySlug="all"
    />
  );
}
