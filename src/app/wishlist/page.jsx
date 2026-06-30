"use client"
import React from 'react'
import Container from '@/Components/Container'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { FiHeart, FiShoppingCart, FiTrash2 } from 'react-icons/fi'

export default function WishlistPage() {
  const { wishlistItems, toggleWishlist, addToCart } = useCart()

  if (wishlistItems.length === 0) {
    return (
      <Container className="py-20 text-center">
        <FiHeart size={64} className="mx-auto text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-600 mb-2">Your wishlist is empty</h2>
        <p className="text-gray-400 mb-6">Save items you love to come back later.</p>
        <Link href="/store" className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition font-semibold">
          Browse Store
        </Link>
      </Container>
    )
  }

  return (
    <Container className="py-10">
      <h1 className="text-3xl font-bold mb-2">Wishlist</h1>
      <p className="text-gray-500 mb-8">{wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''} saved</p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {wishlistItems.map(item => (
          <div key={item.id} className="bg-white rounded-xl shadow p-4 flex flex-col">
            <Link href={`/store/product-details/${item.id}`}>
              <Image src={item.thumbnail} alt={item.title} width={200} height={200} className="w-full h-40 object-cover rounded-lg" />
            </Link>
            <div className="mt-3 flex-1">
              <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">{item.title}</h3>
              <p className="text-pink-500 font-bold mt-1">${item.price}</p>
            </div>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => { addToCart(item); toggleWishlist(item); }}
                className="flex-1 flex items-center justify-center gap-1 bg-pink-500 hover:bg-pink-600 text-white px-3 py-2 rounded-lg text-xs font-semibold transition"
              >
                <FiShoppingCart size={12} /> Add to Cart
              </button>
              <button
                onClick={() => toggleWishlist(item)}
                className="p-2 border border-gray-200 rounded-lg hover:bg-red-50 hover:border-red-200 transition"
              >
                <FiTrash2 size={14} className="text-red-400" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </Container>
  )
}
