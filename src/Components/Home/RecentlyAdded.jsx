"use client"

import React, { useState, useEffect } from 'react'
import Container from '../Container'
import ProductBox from '../ProductBox';

export default function RecentlyAdded() {
  const [products, setProduct] = useState([]);

  useEffect(() => {
      const getProducts = async () => {
          const response = await fetch('https://dummyjson.com/products?limit=10');
          const data = await response.json();
          setProduct(data.products);
      }
      getProducts();
  }, [])

  return (
    <div className="bg-gray-100 p-3">
        <Container>
            <h1 className='text-center text-3xl font-bold'>Recently Added Products</h1>
            <div className="grid grid-cols-5 gap-4 mt-4">
                {products.map((product) => (
                    <ProductBox key={product.id} product={product} />
                ))}
            </div>
        </Container>
    </div>
  )
}