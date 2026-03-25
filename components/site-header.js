'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@/components/icons';
import { useStore } from '@/components/store-provider';

export function SiteHeader() {
  const pathname = usePathname();
  const { itemCount, wishlist } = useStore();

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="brand-lockup brand-panel">
          <span className="brand-badge">
            <Icon name="sparkles" />
            Curated Essentials
          </span>
          <div className="brand-main">
            <span className="brand-mark">Northstar Market</span>
            <span className="brand-copy">Curated local storefront built with Next.js</span>
          </div>
        </Link>

        <div className="header-utility">
          <div className="header-note">
            <span className="header-note__dot" />
            Fresh finds for everyday shopping
          </div>
          <nav className="header-actions" aria-label="Primary">
            <Link
              href="/"
              className={`nav-pill ${pathname === '/' ? 'is-current' : ''}`}
              aria-current={pathname === '/' ? 'page' : undefined}
            >
              <Icon name="grid" />
              <span>Shop</span>
            </Link>
            <Link
              href="/cart"
              className={`nav-pill ${pathname === '/cart' ? 'is-current' : ''}`}
              aria-current={pathname === '/cart' ? 'page' : undefined}
            >
              <Icon name="bag" />
              <span>Cart</span>
              <strong className="nav-count">{itemCount}</strong>
            </Link>
            <Link
              href="/wishlist"
              className={`nav-pill ${pathname === '/wishlist' ? 'is-current' : 'nav-pill--static'}`}
              aria-current={pathname === '/wishlist' ? 'page' : undefined}
            >
              <Icon name="heart" />
              <span>Wishlist</span>
              <strong className="nav-count">{wishlist.length}</strong>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
