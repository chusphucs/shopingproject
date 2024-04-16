import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext({});
export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const jsonToApi = localStorage.getItem("cartItems");
    if (jsonToApi) {
      const cartItems = JSON.parse(jsonToApi);
      const totalCount = Object.values(cartItems).reduce(
        (acc, qty) => acc + qty,
        0
      );
      setCartCount(totalCount);
    }
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, setCartCount }}>
      {children}
    </CartContext.Provider>
  );
};
