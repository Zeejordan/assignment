'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useStore } from '@/components/store-provider';
import { highlightMatch } from '@/lib/products';

export function ProductCard({ product, searchTerm }) {
  const { addToCart, wishlist, toggleWishlist } = useStore();
  const isWishlisted = wishlist.includes(product.id);

  return (
    <article className="product-card">
      <div className="product-card__media">
        <button
          type="button"
          className={`icon-button ${isWishlisted ? 'is-active' : ''}`}
          style={{ position: 'absolute', top: 12, right: 12, zIndex: 2 }}
          onClick={() => toggleWishlist(product.id)}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {isWishlisted ? '♥' : '♡'}
        </button>
        <Link href={`/product/${product.id}`}>
          <Image
            src={product.thumbnail}
            alt={product.title}
            width={320}
            height={320}
            className="product-card__image"
          />
        </Link>
      </div>

      <div className="product-card__body">
        <div className="product-card__meta">
          <span className="category-badge">{product.category}</span>
          <span className="rating-badge">★ {product.rating.toFixed(1)}</span>
        </div>

        <Link href={`/product/${product.id}`}>
          <h3 className="product-card__title result-highlight">
            {highlightMatch(product.title, searchTerm)}
          </h3>
        </Link>

        <p className="product-card__desc result-highlight">
          {highlightMatch(product.description, searchTerm)}
        </p>

        <div className="price-row">
          <div>
            <div className="price-tag">${product.price.toFixed(2)}</div>
            <div className="helper-copy">{product.brand || 'Independent label'}</div>
          </div>
          <button
            type="button"
            className="primary-button"
            onClick={() =>
              addToCart({
                id: product.id,
                title: product.title,
                price: product.price,
                thumbnail: product.thumbnail,
                category: product.category
              })
            }
          >
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}
