'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useStore } from '@/components/store-provider';

export function CartView() {
  const { cart, totalPrice, increaseQuantity, decreaseQuantity, removeFromCart } = useStore();

  if (cart.length === 0) {
    return (
      <section className="empty-state" style={{ marginTop: 32 }}>
        <p className="eyebrow">Empty Cart</p>
        <h1 className="cart-title">Your cart is waiting for products.</h1>
        <p className="subtle-copy">
          Browse the storefront, add products, and the total price will update automatically here.
        </p>
        <Link href="/" className="primary-button">
          Continue shopping
        </Link>
      </section>
    );
  }

  const subtotal = totalPrice;
  const shipping = subtotal > 150 ? 0 : 12;
  const total = subtotal + shipping;

  return (
    <section className="cart-layout">
      <div className="cart-card">
        <p className="eyebrow">Cart System</p>
        <h1 className="cart-title">Your selected items</h1>
        <p className="panel-copy">
          Quantities, removal, and pricing update in real time and persist across page refreshes.
        </p>

        <div className="cart-list" style={{ marginTop: 22 }}>
          {cart.map((item) => (
            <article key={item.id} className="cart-item">
              <div className="cart-item__image">
                <Image src={item.thumbnail} alt={item.title} width={120} height={120} />
              </div>
              <div style={{ display: 'grid', gap: 12 }}>
                <div className="cart-item__row">
                  <div>
                    <h2 style={{ margin: 0, fontSize: '1.1rem' }}>{item.title}</h2>
                    <p className="meta-copy" style={{ margin: '4px 0 0' }}>{item.category}</p>
                  </div>
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>

                <div className="cart-item__row">
                  <div className="qty-controls">
                    <button
                      type="button"
                      className="qty-button"
                      onClick={() => decreaseQuantity(item.id)}
                      aria-label={`Decrease quantity for ${item.title}`}
                    >
                      -
                    </button>
                    <strong>{item.quantity}</strong>
                    <button
                      type="button"
                      className="qty-button"
                      onClick={() => increaseQuantity(item.id)}
                      aria-label={`Increase quantity for ${item.title}`}
                    >
                      +
                    </button>
                  </div>
                  <strong className="price-tag">${(item.price * item.quantity).toFixed(2)}</strong>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <aside className="summary-card">
        <p className="eyebrow">Order Summary</p>
        <div className="summary-row"><span>Subtotal</span><strong>${subtotal.toFixed(2)}</strong></div>
        <div className="summary-row" style={{ marginTop: 12 }}>
          <span>Shipping</span>
          <strong>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</strong>
        </div>
        <div className="summary-row" style={{ marginTop: 18, paddingTop: 18, borderTop: '1px solid var(--line)' }}>
          <span>Total</span>
          <strong className="summary-total">${total.toFixed(2)}</strong>
        </div>
        <p className="subtle-copy" style={{ marginTop: 18 }}>
          Free shipping unlocks automatically above $150 to demonstrate derived pricing logic.
        </p>
        <Link href="/" className="primary-button" style={{ width: '100%', marginTop: 18 }}>
          Add more items
        </Link>
      </aside>
    </section>
  );
}
