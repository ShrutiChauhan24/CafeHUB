import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // 🔥 Sync to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // ✅ ADD TO CART LOGIC
  const addToCart = (item) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);

      if (existing) {
        // increase quantity
        return prev.map((i) =>
          i.id === item.id
            ? { ...i, qty: i.qty + 1 }
            : i
        );
      } else {
        // add new item
        return [
          ...prev,
          {
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            qty: 1,
          },
        ];
      }
    });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        isCartOpen,
        setIsCartOpen,
        setCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);