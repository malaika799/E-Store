"use client"
import React, { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])
  const [wishlistItems, setWishlistItems] = useState([])

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('estore-cart')
      const savedWishlist = localStorage.getItem('estore-wishlist')
      if (savedCart) setCartItems(JSON.parse(savedCart))
      if (savedWishlist) setWishlistItems(JSON.parse(savedWishlist))
    } catch (e) {}
  }, [])

  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem('estore-cart', JSON.stringify(cartItems))
  }, [cartItems])

  useEffect(() => {
    localStorage.setItem('estore-wishlist', JSON.stringify(wishlistItems))
  }, [wishlistItems])

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      }
      return [...prev, { ...product, qty: 1 }]
    })
  }

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(i => i.id !== id))
  }

  const updateQty = (id, qty) => {
    if (qty < 1) { removeFromCart(id); return }
    setCartItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i))
  }

  const clearCart = () => setCartItems([])

  const toggleWishlist = (product) => {
    setWishlistItems(prev => {
      const exists = prev.find(i => i.id === product.id)
      if (exists) return prev.filter(i => i.id !== product.id)
      return [...prev, product]
    })
  }

  const isInWishlist = (id) => wishlistItems.some(i => i.id === id)

  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0)
  const cartTotal = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0)

  return (
    <CartContext.Provider value={{
      cartItems, addToCart, removeFromCart, updateQty, clearCart,
      wishlistItems, toggleWishlist, isInWishlist,
      cartCount, cartTotal
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
