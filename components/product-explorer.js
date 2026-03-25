'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Icon } from '@/components/icons';
import { ProductCard } from '@/components/product-card';
import { ProductFilters } from '@/components/product-filters';
import { filterProducts, sortProducts } from '@/lib/products';

export function ProductExplorer({ products, categories, priceBounds }) {
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRating, setSelectedRating] = useState(0);
  const [sortBy, setSortBy] = useState('featured');
  const [priceLimit, setPriceLimit] = useState(priceBounds.max);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(searchInput.trim());
    }, 300);

    return () => window.clearTimeout(timer);
  }, [searchInput]);

  const filteredProducts = useMemo(() => {
    return sortProducts(
      filterProducts(products, {
        search: debouncedSearch,
        category: selectedCategory,
        rating: selectedRating,
        priceLimit
      }),
      sortBy
    );
  }, [debouncedSearch, priceLimit, products, selectedCategory, selectedRating, sortBy]);

  const activeFilterCount = [
    selectedCategory !== 'all',
    selectedRating > 0,
    priceLimit < priceBounds.max,
    debouncedSearch.length > 0
  ].filter(Boolean).length;

  const resetFilters = () => {
    setSearchInput('');
    setDebouncedSearch('');
    setSelectedCategory('all');
    setSelectedRating(0);
    setSortBy('featured');
    setPriceLimit(priceBounds.max);
  };

  return (
    <>
      <section className="hero">
        <div className="hero-card">
          <p className="eyebrow">Smart Product Listing</p>
          <h1 className="hero-title">Design-forward commerce for your assignment review.</h1>
          <p className="hero-copy">
            This Next.js storefront uses your local product API file to deliver category and rating
            filters, a price slider, debounced search with matched-text highlighting, and persistent
            cart and wishlist behavior.
          </p>
          <div className="hero-actions">
            <a href="#catalog" className="primary-button">
              <Icon name="sparkles" />
              Explore products
            </a>
            <Link href="/cart" className="secondary-button">
              <Icon name="bag" />
              Open cart
            </Link>
          </div>
        </div>

        <div className="hero-stats">
          <article className="metric-card">
            <p className="eyebrow">Catalog</p>
            <p className="metric-value">{products.length}</p>
            <p className="helper-copy">Products</p>
          </article>
          <article className="metric-card">
            <p className="eyebrow">Categories</p>
            <p className="metric-value">{categories.length}</p>
            <p className="helper-copy">Multi-filtered shopping across the catalog.</p>
          </article>
        </div>
      </section>

      <section id="catalog" className="storefront-layout">
        <ProductFilters
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          selectedRating={selectedRating}
          onSelectRating={setSelectedRating}
          priceBounds={priceBounds}
          priceLimit={priceLimit}
          onChangePriceLimit={setPriceLimit}
          onReset={resetFilters}
        />

        <div>
          <div className="panel">
            <div className="toolbar">
              <div style={{ flex: '1 1 320px' }}>
                <label className="sr-only" htmlFor="product-search">
                  Search products
                </label>
                <div className="input-wrap">
                  <Icon name="search" />
                  <input
                    id="product-search"
                    className="search-input"
                    type="search"
                    value={searchInput}
                    onChange={(event) => setSearchInput(event.target.value)}
                    placeholder="Search by title, category, brand, or tags"
                  />
                </div>
              </div>
              <div style={{ width: '220px', maxWidth: '100%' }}>
                <label className="sr-only" htmlFor="sort-products">
                  Sort products
                </label>
                <div className="input-wrap">
                  <Icon name="sort" />
                  <select
                    id="sort-products"
                    className="sort-select"
                    value={sortBy}
                    onChange={(event) => setSortBy(event.target.value)}
                  >
                    <option value="featured">Featured</option>
                    <option value="price-asc">Price: low to high</option>
                    <option value="price-desc">Price: high to low</option>
                    <option value="rating-desc">Rating</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="toolbar-meta">
              <div>
                <h2 className="section-title">Product collection</h2>
                <p className="panel-copy">
                  {filteredProducts.length} result{filteredProducts.length === 1 ? '' : 's'}
                  {activeFilterCount > 0
                    ? ` with ${activeFilterCount} active filter${activeFilterCount === 1 ? '' : 's'}`
                    : ''}
                </p>
              </div>
              {activeFilterCount > 0 ? (
                <div className="active-filters">
                  {debouncedSearch ? <span className="filter-pill">Search: {debouncedSearch}</span> : null}
                  {selectedCategory !== 'all' ? (
                    <span className="filter-pill">Category: {selectedCategory}</span>
                  ) : null}
                  {selectedRating > 0 ? (
                    <span className="filter-pill">Rating: {selectedRating}+</span>
                  ) : null}
                  {priceLimit < priceBounds.max ? (
                    <span className="filter-pill">Up to ${priceLimit}</span>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="products-grid" style={{ marginTop: 18 }}>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} searchTerm={debouncedSearch} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p className="eyebrow">No Results Found</p>
              <h2 className="section-title">No products match the current filters.</h2>
              <p className="subtle-copy">
                Adjust the search query, widen the price range, or reset the active filters to
                explore the full catalog again.
              </p>
              <button type="button" className="primary-button" onClick={resetFilters}>
                <Icon name="filter" />
                Reset filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
