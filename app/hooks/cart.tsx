'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { type ICart } from '@/app/interfaces/ICart';
import type ICartItem from '@/app/interfaces/IProductCart';

interface CartContextData {
  cart?: ICart;
  cartLength: number;
  checkIfEmptyCart: (tempCart?: ICart | undefined) => boolean;
  updateCart: (currentCart: ICart) => void;
  deleteCartItem: (cart_id: number) => { success: boolean; error?: string };
  updateCartItemAmount: (
    itemId: number,
    amount: number,
  ) => { success: boolean; error?: string };
  addCartItem: (item: ICartItem) => { success: boolean; error?: string };
  getProductCart: (id: number) => ICartItem | undefined;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

interface ICartProvider {
  children: React.ReactNode;
}

const storeName = `Ecommerce`;

export const CartProvider: React.FC<ICartProvider> = ({ children }) => {
  const [cart, setCart] = useState<ICart>();

  const createCart = useCallback(() => {
    const newCart: ICart = {
      sub_total: 0,
      cart_items: [],
    };

    localStorage.setItem(`${storeName}.cart`, JSON.stringify(newCart));
    setCart(newCart);
  }, []);

  const updateCart = useCallback((currentCart: ICart) => {
    localStorage.setItem(`${storeName}.cart`, JSON.stringify(currentCart));

    setCart(currentCart);
  }, []);

  const recalculateCart = useCallback((currentCart: ICart) => {
    const subtotal = currentCart.cart_items.reduce((acc, item) => {
      return acc + item.value;
    }, 0);

    const updatedCart: ICart = {
      sub_total: subtotal,

      cart_items: [...currentCart.cart_items],
    };

    return updatedCart;
  }, []);

  const checkIfEmptyCart = useCallback(
    (tempCart: ICart | undefined = cart) => {
      if (!tempCart) return true;

      return tempCart.cart_items.length <= 0;
    },
    [cart],
  );

  const deleteCartItem = useCallback(
    (cart_id: number) => {
      if (!cart)
        return {
          success: false,
          error: 'There was a problem processing your cart. Try again later.',
        };

      const checkExistItem = cart?.cart_items.find(x => x.id === cart_id);

      if (checkExistItem)
        return {
          success: false,
          error: 'Unable to find item in cart, please try again later.',
        };

      const newCart = recalculateCart({
        ...cart,
        cart_items: cart?.cart_items.filter(x => x.stock.id !== cart_id),
      });

      updateCart(newCart);

      return { success: true };
    },
    [cart, recalculateCart, updateCart],
  );

  const updateCartItemAmount = useCallback(
    (itemId: number, amount: number) => {
      if (!cart)
        return {
          success: false,
          error:
            'Houve um problema ao processar seu carrinho. Tente novamente mais tarde.',
        };

      const checkExistItem = cart?.cart_items.find(x => x.stock.id === itemId);

      if (!checkExistItem)
        return {
          success: false,
          error:
            'Não foi possível encontrar o item no carrinho, tente novamente mais tarde.',
        };

      const newCart = recalculateCart({
        ...cart,
        cart_items: cart?.cart_items.map(item => {
          if (item.stock.id !== itemId) return item;

          return {
            ...item,
            amount,
            // spot_value: amount * item.stock.spot_value,
            value: amount * item.stock.value,
          };
        }),
      });

      updateCart(newCart);

      return { success: true };
    },
    [cart, recalculateCart, updateCart],
  );

  const addCartItem = useCallback(
    (item: ICartItem) => {
      if (!cart)
        return {
          success: false,
          error:
            'Houve um problema ao processar seu carrinho. Tente novamente mais tarde.',
        };

      const checkExistItem = cart?.cart_items.find(
        x => x.stock.id === item.stock.id,
      );

      if (checkExistItem)
        return {
          success: false,
          error: 'Este item já existe no seu carrinho.',
        };

      const newCart = recalculateCart({
        ...cart,
        cart_items: [...cart?.cart_items, item],
      });

      updateCart(newCart);

      return { success: true };
    },
    [cart, recalculateCart, updateCart],
  );

  const getProductCart = useCallback(
    (id: number) => {
      const findProduct = cart?.cart_items.find(item => item.stock.id === id);

      return findProduct;
    },
    [cart?.cart_items],
  );

  useEffect(() => {
    const localStorageCart = localStorage.getItem(`${storeName}.cart`);

    if (localStorageCart) {
      const currentCartParsed: ICart = JSON.parse(localStorageCart);

      if (currentCartParsed) setCart(currentCartParsed);
    } else {
      createCart();
    }
  }, [createCart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartLength: cart?.cart_items.length ?? 0,
        deleteCartItem,
        updateCart,
        updateCartItemAmount,
        addCartItem,
        checkIfEmptyCart,
        getProductCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
}
