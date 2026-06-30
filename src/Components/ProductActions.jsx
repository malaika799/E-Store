"use client"
import React, { useState } from 'react'
import { useCart } from '@/context/CartContext'
import { FiShoppingCart, FiHeart, FiCheck } from 'react-icons/fi'
import styles from '@/styles/product-details/ProductDetails.module.css'

export default function ProductActions({ product }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart()
  const [added, setAdded] = useState(false)
  const inWishlist = isInWishlist(product.id)

  const handleAddToCart = () => {
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className={styles.actions}>
      <button
        onClick={handleAddToCart}
        className={`${styles.btnCart} flex items-center justify-center gap-2`}
        style={added ? { background: '#2f855a' } : {}}
      >
        {added ? <FiCheck size={16} /> : <FiShoppingCart size={16} />}
        {added ? 'Added to Cart!' : 'Add to Cart'}
      </button>
      <button
        onClick={() => toggleWishlist(product)}
        className={styles.btnWishlist}
        style={inWishlist ? { background: '#fff0f7', borderColor: '#ec4899' } : {}}
      >
        <FiHeart size={16} fill={inWishlist ? '#ec4899' : 'none'} />
        {inWishlist ? 'Wishlisted' : 'Wishlist'}
      </button>
    </div>
  )
}
