import { notFound } from 'next/navigation';
import { allProductDetails, allProductSummaries } from '@/data/product';
import ProductCarousel from '@/components/ProductCarousel';
import NavBar from "@/components/NavBar";
import ProductGallery from '@/components/ProductGallery';
import "@/styles/app-css/produtos.css";

function formatPrice(price: number) {
  return price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}
function RatingStars({ rating, reviews }: { rating: number; reviews: number }) {
  const stars = '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
  return (
    <div className="prod-rating">
      <div className="prod-rating__stars" style={{ color: '#facc15' }}>
        {stars}
      </div>
      <span className="prod-rating__text">
        {rating.toFixed(1)} | {reviews} reviews
      </span>
    </div>
  );
}

type PageProps = {
  params: {
    id: string;
  };
};

export default async function ProdutoPage({ params }: PageProps) {
  const { id } = await params;
  const product = allProductDetails.find(p => p.id === id);

  if (!product) {
    notFound();
  }

  const relatedProducts = allProductSummaries.filter(
    p => p.seal === product.seal && p.id !== product.id
  );

  return (
    <>
      <NavBar /> 

      <div className="prod-page-container">
        <main className="prod-page-main-content">

          <ProductGallery 
            images={product.images} 
            seal={product.seal} 
            productName={product.name} 
          />

          <section className="prod-info">
            <div className="prod-info__header">
              <h1 className="prod-info__title">{product.name}</h1>
    
            </div>

            <div className="prod-info__meta">
              <RatingStars rating={product.rating} reviews={product.reviews} />
              <span className="prod-info__divider"></span>
              <span className="prod-info__tag">{product.availability}</span>
              <span className="prod-info__divider"></span>
              <span className="prod-info__stock">{product.stockCount} disponíveis</span>
            </div>

            <div className="prod-info__price">
              {formatPrice(product.price)}
            </div>

            <div className="prod-info__description">
              <h3>Descrição</h3>
              <p>{product.description}</p>
            </div>

            <div className="prod-info__actions">
            </div>
          </section>
        </main>

        {relatedProducts.length > 0 && (
          <ProductCarousel
            title="Da mesma loja"
            items={relatedProducts}
          />
        )}
      </div>
    </>
  );
}