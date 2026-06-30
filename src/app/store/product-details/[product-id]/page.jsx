import React from 'react'
import styles from '@/styles/product-details/ProductDetails.module.css';
import Container from '@/Components/Container';
import Image from 'next/image';
import { getProducts } from '@/library';
import ProductActions from '@/Components/ProductActions';

export default async function ProductDetails({ params }) {
  const { 'product-id': productId } = await params;
  const product = await getProducts(productId);

  return (
    <Container>
      <div className={styles.pageWrapper}>
        <div className={styles.card}>
          {/* Left: Product Image */}
          <div className={styles.imageWrapper}>
            <Image
              src={product.thumbnail}
              alt={product.title}
              width={500}
              height={500}
              className={styles.productImage}
              priority
            />
            {product.discountPercentage > 0 && (
              <span className={styles.discountBadge}>
                -{Math.round(product.discountPercentage)}% OFF
              </span>
            )}
          </div>

          {/* Right: Product Details */}
          <div className={styles.details}>
            <p className={styles.category}>{product.category}</p>
            <h1 className={styles.title}>{product.title}</h1>
            <p className={styles.brand}>by {product.brand}</p>
            <p className={styles.description}>{product.description}</p>

            {/* Pricing */}
            <div className={styles.pricing}>
              <span className={styles.price}>${product.price}</span>
              {product.discountPercentage > 0 && (
                <span className={styles.originalPrice}>
                  ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                </span>
              )}
              {product.discountPercentage > 0 && (
                <span className={styles.saveBadge}>
                  Save {Math.round(product.discountPercentage)}%
                </span>
              )}
            </div>

            {/* Rating */}
            <div className={styles.ratingRow}>
              <span className={styles.stars}>{'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}</span>
              <span className={styles.ratingValue}>{product.rating} / 5</span>
              <span className={styles.stock}>
                {product.stock > 0 ? `✓ In Stock (${product.stock})` : '✗ Out of Stock'}
              </span>
            </div>

            {/* Specs */}
            <ul className={styles.specsList}>
              {product.model && <li><strong>Model:</strong> {product.model}</li>}
              {product.color && <li><strong>Color:</strong> {product.color}</li>}
              {product.weight && <li><strong>Weight:</strong> {product.weight}g</li>}
              {product.sku && <li><strong>SKU:</strong> {product.sku}</li>}
              {product.warrantyInformation && <li><strong>Warranty:</strong> {product.warrantyInformation}</li>}
              {product.shippingInformation && <li><strong>Shipping:</strong> {product.shippingInformation}</li>}
            </ul>

            {/* Client-side actions (Cart / Wishlist) */}
            <ProductActions product={product} />
          </div>
        </div>

        {/* Reviews */}
        {product.reviews && product.reviews.length > 0 && (
          <div className="mt-10 bg-white rounded-2xl shadow p-6 max-w-[1100px] mx-auto">
            <h2 className="text-xl font-bold mb-5 text-gray-800">Customer Reviews</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {product.reviews.map((review, i) => (
                <div key={i} className="border border-gray-100 rounded-xl p-4 bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold text-sm text-gray-800">{review.reviewerName}</span>
                    <span className="text-yellow-400 text-sm">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
                  </div>
                  <p className="text-sm text-gray-600">{review.comment}</p>
                  <p className="text-xs text-gray-400 mt-2">{new Date(review.date).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}
