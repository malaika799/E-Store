"use client"
import Container from '@/Components/Container'
import React, { useState, useEffect, Suspense } from 'react'
import { getCategories, getProducts } from '@/library'
import ProductBox from '@/Components/ProductBox'
import { useSearchParams } from 'next/navigation'
import { FiFilter, FiX } from 'react-icons/fi'

export default function StorePage() {
  return (
    <Container className="py-6">
      <Suspense fallback={<Storeskeleton />}>
        <StoreContent />
      </Suspense>
    </Container>
  )
}

function StoreContent() {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('search') || ''
  const urlCategory = searchParams.get('category') || ''

  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(urlCategory)
  const [search, setSearch] = useState(searchQuery)
  const [sortBy, setSortBy] = useState('default')
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    getCategories().then(setCategories)
    getProducts().then(setProducts).finally(() => setLoading(false))
  }, [])

  // sync URL params
  useEffect(() => { setSearch(searchQuery) }, [searchQuery])
  useEffect(() => { setSelectedCategory(urlCategory) }, [urlCategory])

  let filtered = products
  if (selectedCategory) filtered = filtered.filter(p => p.category === selectedCategory)
  if (search) filtered = filtered.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    (p.description || '').toLowerCase().includes(search.toLowerCase())
  )
  if (sortBy === 'price-asc') filtered = [...filtered].sort((a, b) => a.price - b.price)
  if (sortBy === 'price-desc') filtered = [...filtered].sort((a, b) => b.price - a.price)
  if (sortBy === 'rating') filtered = [...filtered].sort((a, b) => b.rating - a.rating)

  return (
    <div className="flex gap-6">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:block w-56 shrink-0">
        <CategorySidebar categories={categories} selected={selectedCategory} onSelect={setSelectedCategory} />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="bg-black/40 flex-1" onClick={() => setSidebarOpen(false)} />
          <div className="w-64 bg-white p-4 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold">Categories</h3>
              <button onClick={() => setSidebarOpen(false)}><FiX /></button>
            </div>
            <CategorySidebar categories={categories} selected={selectedCategory} onSelect={(c) => { setSelectedCategory(c); setSidebarOpen(false) }} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap gap-3 items-center mb-5">
          <button onClick={() => setSidebarOpen(true)} className="md:hidden flex items-center gap-2 border px-3 py-2 rounded-lg text-sm">
            <FiFilter size={14} /> Filter
          </button>

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm outline-none focus:border-pink-400 flex-1 min-w-[180px] max-w-xs"
          />

          {selectedCategory && (
            <span className="flex items-center gap-1 bg-pink-100 text-pink-600 text-xs font-semibold px-3 py-1.5 rounded-full">
              {categories.find(c => c.slug === selectedCategory)?.name || selectedCategory}
              <button onClick={() => setSelectedCategory('')}><FiX size={12} /></button>
            </span>
          )}

          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm outline-none focus:border-pink-400 ml-auto"
          >
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>

          <p className="text-sm text-gray-500 w-full sm:w-auto">{filtered.length} products</p>
        </div>

        {loading ? (
          <StoreGridSkeleton />
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg">No products found.</p>
            <button onClick={() => { setSearch(''); setSelectedCategory('') }} className="mt-3 text-pink-500 hover:underline text-sm">
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filtered.map(d => <ProductBox key={"product-" + d.id} product={d} />)}
          </div>
        )}
      </div>
    </div>
  )
}

function CategorySidebar({ categories, selected, onSelect }) {
  return (
    <div>
      <h3 className="font-bold text-gray-800 mb-3 text-base">Categories</h3>
      <ul className="space-y-1">
        <li>
          <button
            onClick={() => onSelect('')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${!selected ? 'bg-pink-500 text-white font-semibold' : 'hover:bg-gray-100 text-gray-700'}`}
          >
            All Products
          </button>
        </li>
        {categories.map(cat => (
          <li key={cat.slug}>
            <button
              onClick={() => onSelect(cat.slug)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition capitalize ${selected === cat.slug ? 'bg-pink-500 text-white font-semibold' : 'hover:bg-gray-100 text-gray-700'}`}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

function StoreGridSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {Array(8).fill(0).map((_, i) => (
        <div key={i} className="bg-gray-100 rounded-xl h-64 animate-pulse" />
      ))}
    </div>
  )
}

function Storeskeleton() {
  return (
    <div className="flex gap-6">
      <div className="hidden md:block w-56 shrink-0 bg-gray-100 rounded-xl h-96 animate-pulse" />
      <StoreGridSkeleton />
    </div>
  )
}
