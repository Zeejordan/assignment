'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/icons';
import { useStore } from '@/components/store-provider';
import { ProductCard } from '@/components/product-card';

export function ProductDetailView({ product, relatedProducts }) {
  const [activeImage, setActiveImage] = useState(product.images[0] || product.thumbnail);
  const { addToCart, wishlist, toggleWishlist } = useStore();
  const isWishlisted = wishlist.includes(product.id);

  return (
    <>
      <section className="detail-layout">
        <div className="detail-gallery detail-card">
          <div className="gallery-main">
            <Image src={activeImage} alt={product.title} width={680} height={680} priority />
          </div>

          <div className="thumbnail-row">
            {product.images.map((image) => (
              <button
                key={image}
                type="button"
                className={`thumbnail-button ${activeImage === image ? 'is-active' : ''}`}
                onClick={() => setActiveImage(image)}
              >
                <Image src={image} alt={product.title} width={90} height={90} />
              </button>
            ))}
          </div>
        </div>

        <div className="detail-sidebar">
          <article className="detail-card">
            <p className="eyebrow">{product.category}</p>
            <h1 className="detail-title">{product.title}</h1>
            <div className="detail-meta">
              <span className="rating-badge"><Icon name="star" />{product.rating.toFixed(1)}</span>
              <span className="stock-badge"><Icon name="sparkles" />{product.availabilityStatus}</span>
            </div>
            <p className="detail-price">${product.price.toFixed(2)}</p>
            <p className="hero-copy">{product.description}</p>

            <div className="detail-actions">
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
              <button
                type="button"
                className={`secondary-button ${isWishlisted ? 'is-active' : ''}`}
                onClick={() => toggleWishlist(product.id)}
              >
                <Icon name={isWishlisted ? 'heart-filled' : 'heart'} />
                {isWishlisted ? 'Remove wishlist' : 'Save to wishlist'}
              </button>
            </div>
          </article>

          <article className="detail-card">
            <h2 className="section-title">Product info</h2>
            <div className="detail-facts">
              <div className="fact-row"><strong className="inline-label"><Icon name="tag" />Brand</strong><span>{product.brand || 'Independent label'}</span></div>
              <div className="fact-row"><strong className="inline-label"><Icon name="grid" />SKU</strong><span>{product.sku}</span></div>
              <div className="fact-row"><strong className="inline-label"><Icon name="truck" />Shipping</strong><span>{product.shippingInformation}</span></div>
              <div className="fact-row"><strong className="inline-label"><Icon name="shield" />Warranty</strong><span>{product.warrantyInformation}</span></div>
              <div className="fact-row"><strong className="inline-label"><Icon name="arrow-left" />Return policy</strong><span>{product.returnPolicy}</span></div>
            </div>
          </article>

          <article className="detail-card">
            <h2 className="section-title">Customer reviews</h2>
            <div className="review-list">
              {product.reviews.slice(0, 3).map((review) => (
                <div key={`${review.reviewerEmail}-${review.date}`} className="review-card">
                  <div className="review-card__top">
                    <strong>{review.reviewerName}</strong>
                    <span className="rating-badge"><Icon name="star" />{review.rating}</span>
                  </div>
                  <p className="clamped-text">{review.comment}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section style={{ paddingTop: 28 }}>
        <div className="toolbar">
          <div>
            <p className="eyebrow">Related Products</p>
            <h2 className="section-title">You may also like</h2>
          </div>
          <Link href="/" className="secondary-button">
            <Icon name="arrow-left" />
            Back to shop
          </Link>
        </div>
        <div className="related-grid">
          {relatedProducts.map((relatedProduct) => (
            <ProductCard key={relatedProduct.id} product={relatedProduct} searchTerm="" />
          ))}
        </div>
      </section>
    </>
  );
}
