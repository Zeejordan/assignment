'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStore } from '@/components/store-provider';

export function SiteHeader() {
  const pathname = usePathname();
  const { itemCount, wishlist } = useStore();

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="brand-lockup">
          <span className="brand-mark">Northstar Market</span>
          <span className="brand-copy">Curated demo storefront with local product data</span>
        </Link>

        <nav className="header-actions" aria-label="Primary">
          <Link href="/" className="nav-pill" aria-current={pathname === '/' ? 'page' : undefined}>
            Shop
          </Link>
          <Link
            href="/cart"
            className="nav-pill"
            aria-current={pathname === '/cart' ? 'page' : undefined}
          >
            Cart <strong>{itemCount}</strong>
          </Link>
          <span className="nav-pill" aria-label={`${wishlist.length} wishlist items`}>
            Wishlist <strong>{wishlist.length}</strong>
          </span>
        </nav>
      </div>
    </header>
  );
}
