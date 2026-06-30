import React from 'react'

export default function Container({ className, children }) {
    return (
        <div className={`max-w-[1200px] mx-auto px-4 w-full ${className}`}>
            {children}
        </div>
    )
}