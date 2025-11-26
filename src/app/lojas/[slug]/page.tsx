import { notFound } from 'next/navigation';
import { STORES } from '@/data/stores';
import NavBar from "@/components/NavBar";
import StoreEditButtons from '@/components/StoreEditButtons';

import "@/styles/app-css/lojas.css";

function StarDisplay({ count, size = '1rem' }: { count: number, size?: string }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
     stars.push(i <= Math.ceil(count) ? '★' : '☆');
  }
  return <div style={{ fontSize: size, color: '#FACC15' }}>{stars.join('')}</div>;
}

type PageProps = {
  params: {
    slug: string;
  };
};

export default async function LojaPage({ params }: PageProps) {
  const { slug } = params; 
  const store = STORES.find(s => s.slug === slug);

  if (!store) {
    notFound();
  }

  // Comentarios fakes para testes
  const comments = [
    { id: 1, name: "Sofia Figueiredo", avatar: "https://placehold.co/50x50/E2D9C8/A4907C?text=SF", rating: 5 },
    { id: 2, name: "Maria Silva", avatar: "https://placehold.co/50x50/E2D9C8/A4907C?text=MS", rating: 5 },
  ];

  return (
    <div className="store-page-container">
      <NavBar />

      <header 
        className="store-hero" 
        style={{ backgroundImage: `url(${store.image})` }} >
      
        <StoreEditButtons />

        <div className="store-hero__content">
          <h1 className="store-hero__title">{store.name}</h1>
          <p className="store-hero__category">{store.categoryLabel}</p>
        </div>
        
        {store.owner && (
          <div className="store-hero__owner">
            by <span style={{textDecoration: 'underline'}}>{store.owner}</span>
          </div>
        )}
      </header>

      <section className="store-rating-section">
        <h2 className="store-rating__title">Reviews e Comentários</h2>
        <div className="store-rating__score">{store.rating}</div>
        <div className="store-rating__stars">
           <StarDisplay count={store.rating} size="2.5rem" />
        </div>
        <a href="#" className="store-rating__link">
          ver mais ({store.reviewsCount} reviews)
        </a>
      </section>

      <section className="store-comments-grid">
        {comments.map((comment) => (
          <div key={comment.id} className="comment-card">
            <img src={comment.avatar} alt={comment.name} className="comment-avatar" />
            <div className="comment-info">
              <h4>{comment.name}</h4>
              <StarDisplay count={comment.rating} size="1rem" />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}