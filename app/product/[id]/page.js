import { notFound } from 'next/navigation';
import { ProductDetailView } from '@/components/product-detail-view';
import { getProductById, getProducts, getRelatedProducts } from '@/lib/products';

export function generateStaticParams() {
  return getProducts().map((product) => ({
    id: String(product.id)
  }));
}
// new changes to track on github destop
export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const product = getProductById(Number(id));

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product);

  return <ProductDetailView product={product} relatedProducts={relatedProducts} />;
}
