'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/icons';
import { useStore } from '@/components/store-provider';

export function WishlistView({ products }) {
  const { wishlist, toggleWishlist, addToCart } = useStore();

  const wishlistProducts = wishlist
    .map((id) => products.find((product) => product.id === id))
    .filter(Boolean);

  if (wishlistProducts.length === 0) {
    return (
      <section className="empty-state" style={{ marginTop: 32 }}>
        <p className="eyebrow">Wishlist</p>
        <h1 className="cart-title">Your saved items will appear here.</h1>
        <p className="subtle-copy">
          Tap the heart icon on any product to save it. Wishlist data already persists across page
          refreshes in this app.
        </p>
        <Link href="/" className="primary-button">
          <Icon name="arrow-left" />
          Start shopping
        </Link>
      </section>
    );
  }

  return (
    <section className="cart-card" style={{ marginTop: 32 }}>
      <div className="toolbar">
        <div>
          <p className="eyebrow">Wishlist</p>
          <h1 className="cart-title">Your saved products</h1>
          <p className="panel-copy">
            Review wishlist items, remove them with the heart toggle, or send them directly to the
            cart.
          </p>
        </div>
        <Link href="/" className="secondary-button">
          <Icon name="grid" />
          Continue browsing
        </Link>
      </div>

      <div className="wishlist-grid">
        {wishlistProducts.map((product) => (
          <article key={product.id} className="wishlist-card">
            <Link href={`/product/${product.id}`} className="wishlist-media">
              <Image src={product.thumbnail} alt={product.title} width={240} height={240} />
            </Link>

            <div className="wishlist-body">
              <div className="wishlist-top">
                <span className="category-badge">{product.category}</span>
                <span className="rating-badge">
                  <Icon name="star" />
                  {product.rating.toFixed(1)}
                </span>
              </div>

              <div>
                <Link href={`/product/${product.id}`}>
                  <h2 className="product-card__title">{product.title}</h2>
                </Link>
                <p className="product-card__desc">{product.description}</p>
              </div>

              <div className="wishlist-footer">
                <div>
                  <div className="price-tag">${product.price.toFixed(2)}</div>
                  <div className="helper-copy">{product.brand || 'Independent label'}</div>
                </div>

                <div className="wishlist-actions">
                  <button
                    type="button"
                    className="secondary-button is-active"
                    onClick={() => toggleWishlist(product.id)}
                  >
                    <Icon name="heart-filled" />
                    Remove
                  </button>
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
                    <Icon name="bag" />
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
