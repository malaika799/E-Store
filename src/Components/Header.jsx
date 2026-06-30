"use client"
import React, { useState } from 'react';
import Container from './Container';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiShoppingCart, FiSearch, FiHeart, FiMenu, FiX } from "react-icons/fi";
import styles from '@/styles/header.module.css';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className={`${styles.header} py-3 px-1 shadow`}>
      <Container className="flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center">
            <span className='text-pink-500 font-bold text-4xl'>E-Store<b className='text-black'>.</b></span>
          </div>
        </Link>

        {/* Search Bar */}
        <SearchBar />

        {/* Desktop Nav */}
        <div className="hidden md:block">
          <NavBar />
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </Container>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t px-4 py-3">
          <ul className="flex flex-col gap-3 font-semibold">
            <li><Link href="/" onClick={() => setMobileOpen(false)} className="block py-1 hover:text-pink-500">Home</Link></li>
            <li><Link href="/store" onClick={() => setMobileOpen(false)} className="block py-1 hover:text-pink-500">Store</Link></li>
            <li><Link href="/cart" onClick={() => setMobileOpen(false)} className="block py-1 hover:text-pink-500">Cart</Link></li>
            <li><Link href="/wishlist" onClick={() => setMobileOpen(false)} className="block py-1 hover:text-pink-500">Wishlist</Link></li>
          </ul>
        </div>
      )}
    </header>
  )
}

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/store?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className={`${styles.searchBar} flex items-center`}>
      <input
        type="text"
        placeholder="Search for products..."
        className={styles.searchInput}
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <button type="submit" className={styles.searchButton}>
        <FiSearch size={18} />
      </button>
    </form>
  );
};

const NavBar = () => {
  const { cartCount, wishlistItems } = useCart();

  return (
    <nav className="flex items-center gap-5">
      <ul className="flex items-center gap-3 font-semibold">
        <li className={styles.navLink}><Link href="/">Home</Link></li>
        <li className={styles.navLink}><Link href="/store">Store</Link></li>
      </ul>

      <div className="flex items-center gap-4">
        {/* Wishlist Icon */}
        <Link href="/wishlist">
          <div className="relative">
            <FiHeart color='black' size={22} />
            {wishlistItems.length > 0 && (
              <span className={`${styles.cartBadge} absolute top-[-15px] right-[-20px] bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center`}>
                {wishlistItems.length}
              </span>
            )}
          </div>
        </Link>

        {/* Cart Icon */}
        <Link href="/cart">
          <div className="relative">
            <FiShoppingCart color='black' size={24} />
            {cartCount > 0 && (
              <span className={`${styles.cartBadge} absolute top-[-15px] right-[-20px] bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center`}>
                {cartCount}
              </span>
            )}
          </div>
        </Link>
      </div>
    </nav>
  )
}
