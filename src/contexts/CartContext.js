import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext({});
export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [wishListCount, setWishListCount] = useState(0);

  useEffect(() => {
    const jsonToApi = localStorage.getItem("cartItems");
    const wishListLocal = localStorage.getItem("wishList");
    const wish = JSON.parse(wishListLocal);

    if (jsonToApi) {
      const cartItems = JSON.parse(jsonToApi);
      const totalCount = Object.values(cartItems).reduce(
        (acc, qty) => acc + qty,
        0
      );
      setCartCount(totalCount);
    }
    if (wish) {
      setWishListCount(wish.length);
    }
  }, []);

  return (
    <CartContext.Provider
      value={{ cartCount, setCartCount, wishListCount, setWishListCount }}
    >
      {children}
    </CartContext.Provider>
  );
};
