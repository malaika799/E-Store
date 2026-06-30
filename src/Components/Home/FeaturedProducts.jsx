import React from 'react'
import Container from '../Container'
import ProductBox from '../ProductBox';


export default async function FeaturedProduct() {
   const response = await fetch('https://dummyjson.com/products?limit=5');
   const data = await response.json();
   console.log("data",data.products);
  return (
    <div className="p-3">
            <Container>
                <h1 className='text-center text-3xl font-bold'>Featured Products</h1>
                <div className='my-4 grid grid-cols-5 gap-3'>
                    {
                        data.products.map(
                            (prod) => {
                                return <ProductBox key={prod.id} product={prod} />
                            }
                        )
                    }
                </div>
            </Container>
        </div>
  )
}
