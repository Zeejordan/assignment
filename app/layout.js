import './globals.css';
import { SiteHeader } from '@/components/site-header';
import { StoreProvider } from '@/components/store-provider';

export const metadata = {
  title: 'Northstar Market',
  description: 'Demo e-commerce storefront built with Next.js and local product data.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <div className="site-shell">
            <SiteHeader />
            <main className="page-shell">{children}</main>
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
