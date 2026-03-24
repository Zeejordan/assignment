import productData from '@/dummyApi.json';

export function getProducts() {
  return productData.products;
}

export function getProductById(id) {
  return getProducts().find((product) => product.id === id);
}

export function getCategories(products) {
  return [...new Set(products.map((product) => product.category))].sort((a, b) =>
    a.localeCompare(b)
  );
}

export function getPriceBounds(products) {
  const prices = products.map((product) => Math.round(product.price));

  return {
    min: Math.min(...prices),
    max: Math.max(...prices)
  };
}

export function filterProducts(products, filters) {
  const search = filters.search.toLowerCase();

  return products.filter((product) => {
    const matchesSearch =
      search.length === 0 ||
      [
        product.title,
        product.description,
        product.category,
        product.brand || '',
        ...(product.tags || [])
      ]
        .join(' ')
        .toLowerCase()
        .includes(search);

    const matchesCategory =
      filters.category === 'all' || product.category === filters.category;
    const matchesRating = product.rating >= filters.rating;
    const matchesPrice = Math.round(product.price) <= filters.priceLimit;

    return matchesSearch && matchesCategory && matchesRating && matchesPrice;
  });
}

export function sortProducts(products, sortBy) {
  const clone = [...products];

  switch (sortBy) {
    case 'price-asc':
      return clone.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return clone.sort((a, b) => b.price - a.price);
    case 'rating-desc':
      return clone.sort((a, b) => b.rating - a.rating);
    default:
      return clone.sort((a, b) => a.id - b.id);
  }
}

export function getRelatedProducts(product) {
  return getProducts()
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 4);
}

export function highlightMatch(text, searchTerm) {
  if (!searchTerm) {
    return text;
  }

  const escapedTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = text.split(new RegExp(`(${escapedTerm})`, 'ig'));

  return parts.map((part, index) =>
    part.toLowerCase() === searchTerm.toLowerCase() ? <mark key={`${part}-${index}`}>{part}</mark> : part
  );
}
