import React from 'react'
import Slider from './Slider'
import Container from '../Container';
import Link from 'next/link';
import styles from '@/styles/home/hero.module.css'

export default function HeroSection() {
    return (
        <Container>
            <section className={styles.hero}>
                {/* Text Section */}
                <div className={`${styles.textSection} text-gray-700`}>
                    <h1>
                        One stop solution <span className='text-pink-500'>E-Store</span>
                    </h1>
                    <p className="text-lg text-gray-500 mt-2">Discover the latest headphones, earphones, mobiles, tablets & more.</p>
                    <p className="text-gray-400 mb-6">Exclusive deals just for you!</p>
                    <div className="flex gap-3 flex-wrap">
                        <Link href="/store">
                            <button className={styles.ctaButton}>Shop Now</button>
                        </Link>
                        <Link href="/store?category=smartphones">
                            <button className={styles.ctaButtonOutline}>View Deals</button>
                        </Link>
                    </div>
                </div>

                {/* Image Slider Section */}
                <Slider />
            </section>
        </Container>
    );
}
