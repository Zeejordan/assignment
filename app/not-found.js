import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="not-found">
      <p className="eyebrow">404</p>
      <h1>Product not found.</h1>
      <p>The item you requested is not available in this demo catalog.</p>
      <Link href="/" className="primary-button">
        Return to storefront
      </Link>
    </section>
  );
}
