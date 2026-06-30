"use client"
import Container from '@/components/Container'
import React from 'react'

export default function error() {
    return (
        <Container>
            <h1 className='text-center text-red-500 my-3'>
                Something went wrong!!
            </h1>
        </Container>
    )
}