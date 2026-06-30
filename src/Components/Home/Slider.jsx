"use client"
import React, { useState, useEffect } from 'react'
import Image from "next/image"
import styles from '@/styles/home/hero.module.css'
const images = [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800', // headphones
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800', // watch
    'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800', // perfume
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800', // shoes
    'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800', // camera
    'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800', // sneakers
];

export default function Slider() {

  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
      const interval = setInterval(() => {
          setCurrentSlide(prev => (prev + 1) % images.length);
      }, 2000);

      return () => clearInterval(interval); // cleanup code /unmounting
  }, []);
  return (
    <div className={styles.imageSection}>
        <div className={styles.slider}>
            {images.map((image, index) => (
                <Image 
                    alt={"Slide" + index} 
                    key={"Slide" + index}
                    className={`${styles.slide} ${currentSlide == index && styles.active}`} 
                    src={image} 
                    fill 
                />
            ))}
        </div>
    </div>
  )
}
