import React from 'react'
import Link from 'next/link'
import { FiFacebook, FiTwitter, FiInstagram, FiYoutube, FiMail, FiPhone, FiMapPin } from 'react-icons/fi'
import styles from '@/styles/footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Main Footer */}
      <div className="max-w-[1200px] mx-auto px-4 py-12">
        <div className={styles.grid}>

          {/* Brand Column */}
          <div>
            <span className="text-pink-500 font-bold text-3xl">E-Store<b className="text-white">.</b></span>
            <p className={`${styles.mutedText} mt-3 text-sm leading-relaxed`}>
              Your one-stop shop for electronics, fashion, beauty, and more. Quality products delivered to your doorstep.
            </p>
            <div className="flex gap-3 mt-5">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialBtn} title="Facebook">
                <FiFacebook size={18} />
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialBtn} title="Twitter / X">
                <FiTwitter size={18} />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialBtn} title="Instagram">
                <FiInstagram size={18} />
              </a>
              <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className={styles.socialBtn} title="YouTube">
                <FiYoutube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={styles.colTitle}>Quick Links</h3>
            <ul className="space-y-2 mt-2">
              <li><Link href="/" className={styles.footerLink}>→ Home</Link></li>
              <li><Link href="/store" className={styles.footerLink}>→ Store</Link></li>
              <li><Link href="/cart" className={styles.footerLink}>→ Cart</Link></li>
              <li><Link href="/wishlist" className={styles.footerLink}>→ Wishlist</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className={styles.colTitle}>Categories</h3>
            <ul className="space-y-2 mt-2">
              {['smartphones', 'laptops', 'fragrances', 'skincare', 'groceries', 'home-decoration'].map(cat => (
                <li key={cat}>
                  <Link href={`/store?category=${cat}`} className={styles.footerLink}>
                    → {cat.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div>
            <h3 className={styles.colTitle}>Contact Us</h3>
            <ul className="space-y-3 mt-2">
              <li className={`${styles.mutedText} flex items-start gap-2 text-sm`}>
                <FiMapPin size={16} className="mt-0.5 shrink-0 text-pink-400" />
                123 Main Street, Lahore, Pakistan
              </li>
              <li className={`${styles.mutedText} flex items-center gap-2 text-sm`}>
                <FiPhone size={16} className="shrink-0 text-pink-400" />
                +92 300 1234567
              </li>
              <li className={`${styles.mutedText} flex items-center gap-2 text-sm`}>
                <FiMail size={16} className="shrink-0 text-pink-400" />
                support@estore.com
              </li>
            </ul>

            {/* Newsletter */}
            <div className="mt-5">
              <p className="text-sm text-white font-medium mb-2">Newsletter</p>
              <div className="flex">
                <input type="email" placeholder="Your email" className={styles.newsletterInput} />
                <button className={styles.newsletterBtn}>Join</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className={styles.trustBar}>
        <div className="max-w-[1200px] mx-auto px-4 py-4 flex flex-wrap justify-center gap-6 text-xs">
          {['🔒 Secure Payments', '🚚 Free Shipping over $50', '↩️ Easy Returns', '⭐ 24/7 Support'].map(b => (
            <span key={b} className={`${styles.mutedText} font-medium`}>{b}</span>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <div className="max-w-[1200px] mx-auto px-4 py-3 flex flex-wrap justify-between items-center gap-2 text-xs">
          <span className={styles.bottomText}>© {new Date().getFullYear()} E-Store. All rights reserved.</span>
          <div className="flex gap-4">
            <Link href="/privacy" className={styles.bottomLink}>Privacy Policy</Link>
            <Link href="/terms" className={styles.bottomLink}>Terms of Service</Link>
            <Link href="/refund" className={styles.bottomLink}>Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
