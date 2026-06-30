"use client"
import styles from "@/styles/home/productbox.module.css";
import Image from 'next/image';
import Link from 'next/link';
import { FiHeart, FiShoppingCart } from 'react-icons/fi';
import { useCart } from '@/context/CartContext';

export default function ProductBox({ product }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const inWishlist = isInWishlist(product.id);

  return (
    <div className={`${styles.card} bg-white p-4 m-1 rounded-lg shadow relative`}>
      {/* Wishlist Button */}
      <button
        onClick={() => toggleWishlist(product)}
        className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center shadow transition-colors duration-200"
        style={{ background: inWishlist ? '#ec4899' : '#f0f0f0' }}
        title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <FiHeart size={14} color={inWishlist ? '#fff' : '#999'} fill={inWishlist ? '#fff' : 'none'} />
      </button>

      <Link href={"/store/product-details/" + product.id}>
        <Image
          width={300}
          height={150}
          src={product.thumbnail}
          alt={product.title}
          className={`${styles.productImage} w-full h-48 object-cover rounded-md`}
        />
      </Link>

      <div className="mt-4">
        <h3 className="text-sm min-h-[42px] font-semibold text-gray-800 line-clamp-2">{product.title}</h3>
        <div className="flex items-center gap-1 mt-1">
          <span className="text-yellow-400 text-xs">{'★'.repeat(Math.round(product.rating || 0))}</span>
          <span className="text-gray-400 text-xs">({product.rating})</span>
        </div>
        <p className="text-gray-900 font-bold mt-1">$ {product.price}</p>

        <button
          onClick={() => addToCart(product)}
          className="mt-3 w-full flex items-center justify-center gap-2 bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition duration-300 text-sm font-semibold"
        >
          <FiShoppingCart size={14} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
