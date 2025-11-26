import Link from 'next/link';
import type { Store } from '@/data/stores';

type StoreCardProps = {
  store: Store;
  variant?: 'carousel' | 'grid';
};

export default function StoreCard({ store, variant = 'carousel' }: StoreCardProps) {
  return (
    <Link
      href={`/lojas/${store.slug}`}
      className={`store-card store-card--${variant}`}
    >
      <div className="store-card-logo">
        <img src={store.logo} alt={store.name} />
      </div>
      <div className="store-card-name">{store.name}</div>
      <div className="store-card-category">{store.categoryLabel}</div>
    </Link>
  );
}
