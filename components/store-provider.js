'use client';

import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';

const StoreContext = createContext(null);

const initialState = {
  cart: [],
  wishlist: []
};

function storeReducer(state, action) {
  switch (action.type) {
    case 'HYDRATE':
      return {
        cart: action.payload.cart || [],
        wishlist: action.payload.wishlist || []
      };
    case 'ADD_TO_CART': {
      const exists = state.cart.find((item) => item.id === action.payload.id);

      if (exists) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }

      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }]
      };
    }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload)
      };
    case 'INCREASE_QTY':
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
        )
      };
    case 'DECREASE_QTY':
      return {
        ...state,
        cart: state.cart
          .map((item) =>
            item.id === action.payload ? { ...item, quantity: item.quantity - 1 } : item
          )
          .filter((item) => item.quantity > 0)
      };
    case 'TOGGLE_WISHLIST': {
      const exists = state.wishlist.includes(action.payload);

      return {
        ...state,
        wishlist: exists
          ? state.wishlist.filter((id) => id !== action.payload)
          : [...state.wishlist, action.payload]
      };
    }
    default:
      return state;
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(storeReducer, initialState);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('northstar-market');

      if (saved) {
        dispatch({
          type: 'HYDRATE',
          payload: JSON.parse(saved)
        });
      }
    } catch {
      // Ignore malformed client storage and fall back to defaults.
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('northstar-market', JSON.stringify(state));
  }, [state]);

  const value = useMemo(() => {
    const itemCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = state.cart.reduce((sum, item) => sum + item.quantity * item.price, 0);

    return {
      cart: state.cart,
      wishlist: state.wishlist,
      itemCount,
      totalPrice,
      addToCart: (product) =>
        dispatch({
          type: 'ADD_TO_CART',
          payload: product
        }),
      removeFromCart: (id) =>
        dispatch({
          type: 'REMOVE_FROM_CART',
          payload: id
        }),
      increaseQuantity: (id) =>
        dispatch({
          type: 'INCREASE_QTY',
          payload: id
        }),
      decreaseQuantity: (id) =>
        dispatch({
          type: 'DECREASE_QTY',
          payload: id
        }),
      toggleWishlist: (id) =>
        dispatch({
          type: 'TOGGLE_WISHLIST',
          payload: id
        })
    };
  }, [state]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error('useStore must be used within StoreProvider');
  }

  return context;
}
