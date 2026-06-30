"use client"
import React from 'react'
import Container from '@/Components/Container'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag } from 'react-icons/fi'

export default function CartPage() {
  const { cartItems, removeFromCart, updateQty, cartTotal, clearCart } = useCart()

  if (cartItems.length === 0) {
    return (
      <Container className="py-20 text-center">
        <FiShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-600 mb-2">Your cart is empty</h2>
        <p className="text-gray-400 mb-6">Looks like you haven't added anything yet.</p>
        <Link href="/store" className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition font-semibold">
          Browse Store
        </Link>
      </Container>
    )
  }

  return (
    <Container className="py-10">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1 space-y-4">
          {cartItems.map(item => (
            <div key={item.id} className="bg-white rounded-xl shadow p-4 flex gap-4 items-center">
              <Image src={item.thumbnail} alt={item.title} width={80} height={80} className="rounded-lg object-cover w-20 h-20" />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-800 text-sm truncate">{item.title}</h3>
                <p className="text-pink-500 font-bold mt-1">${item.price}</p>
              </div>

              {/* Qty Controls */}
              <div className="flex items-center gap-2 border rounded-lg px-2 py-1">
                <button onClick={() => updateQty(item.id, item.qty - 1)} className="p-1 hover:text-pink-500"><FiMinus size={14} /></button>
                <span className="w-6 text-center text-sm font-semibold">{item.qty}</span>
                <button onClick={() => updateQty(item.id, item.qty + 1)} className="p-1 hover:text-pink-500"><FiPlus size={14} /></button>
              </div>

              <p className="font-bold text-gray-800 w-16 text-right">${(item.price * item.qty).toFixed(2)}</p>

              <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 transition p-1">
                <FiTrash2 size={18} />
              </button>
            </div>
          ))}

          <button onClick={clearCart} className="text-sm text-red-400 hover:text-red-600 underline mt-2">
            Clear Cart
          </button>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-80">
          <div className="bg-white rounded-xl shadow p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span>${cartTotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Shipping</span><span className="text-green-600">Free</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Tax (10%)</span><span>${(cartTotal * 0.1).toFixed(2)}</span></div>
              <div className="border-t pt-3 flex justify-between font-bold text-base">
                <span>Total</span>
                <span>${(cartTotal * 1.1).toFixed(2)}</span>
              </div>
            </div>

            {/* Promo Code */}
            <div className="mt-4 flex gap-2">
              <input type="text" placeholder="Promo code" className="flex-1 border rounded-lg px-3 py-2 text-sm outline-none focus:border-pink-400" />
              <button className="bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg text-sm font-semibold transition">Apply</button>
            </div>

            <button className="w-full mt-5 bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-xl font-bold transition text-sm">
              Proceed to Checkout
            </button>

            <Link href="/store" className="block text-center text-sm text-pink-500 hover:underline mt-3">
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </Container>
  )
}
