import { ProductExplorer } from '@/components/product-explorer';
import { getCategories, getPriceBounds, getProducts } from '@/lib/products';

export default function HomePage() {
  const products = getProducts();
  const categories = getCategories(products);
  const priceBounds = getPriceBounds(products);

  return (
    <ProductExplorer
      products={products}
      categories={categories}
      priceBounds={priceBounds}
    />
  );
}
