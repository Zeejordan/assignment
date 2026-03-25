import { WishlistView } from '@/components/wishlist-view';
import { getProducts } from '@/lib/products';

export const metadata = {
  title: 'Wishlist | Northstar Market'
};

export default function WishlistPage() {
  const products = getProducts();

  return <WishlistView products={products} />;
}
