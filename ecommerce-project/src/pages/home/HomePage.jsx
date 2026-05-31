import axios from 'axios'
import { useEffect, useState } from 'react'
import './HomePage.css'
import { Header } from '../../components/Header'
import { ProductsGrid } from './ProductsGrid'

const PRICE_FILTERS = [
    { value: 'all', label: 'All Prices' },
    { value: 'under-20', label: 'Under $20' },
    { value: '20-50', label: '$20 – $50' },
    { value: '50-100', label: '$50 – $100' },
    { value: 'over-100', label: 'Over $100' },
]

export function HomePage({ cart, loadCart }) {
    const [products, setProducts] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [sortBy, setSortBy] = useState('default')
    const [priceFilter, setPriceFilter] = useState('all')

    useEffect(() => {
        const fetchProducts = async () => {
            const params = searchQuery ? { search: searchQuery } : {}
            const response = await axios.get('/api/products', { params })
            setProducts(response.data)
        }
        fetchProducts()
    }, [searchQuery])

    const displayProducts = (() => {
        let filtered = [...products]

        if (priceFilter !== 'all') {
            filtered = filtered.filter((p) => {
                const price = p.priceCents / 100
                if (priceFilter === 'under-20') return price < 20
                if (priceFilter === '20-50') return price >= 20 && price < 50
                if (priceFilter === '50-100') return price >= 50 && price < 100
                if (priceFilter === 'over-100') return price >= 100
                return true
            })
        }

        if (sortBy === 'price-asc') filtered.sort((a, b) => a.priceCents - b.priceCents)
        else if (sortBy === 'price-desc') filtered.sort((a, b) => b.priceCents - a.priceCents)
        else if (sortBy === 'rating') filtered.sort((a, b) => b.rating.stars - a.rating.stars)

        return filtered
    })()

    return (
        <>
            <title>NhiStore</title>
            <Header cart={cart} onSearch={setSearchQuery} />

            <div className="home-page">
                <div className="filter-bar">
                    <div className="filter-left">
                        {PRICE_FILTERS.map((f) => (
                            <button
                                key={f.value}
                                className={`filter-chip ${priceFilter === f.value ? 'active' : ''}`}
                                onClick={() => setPriceFilter(f.value)}
                            >
                                {f.label}
                            </button>
                        ))}
                    </div>

                    <div className="filter-right">
                        <span className="results-count">{displayProducts.length} products</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="default">Sort: Default</option>
                            <option value="price-asc">Price: Low → High</option>
                            <option value="price-desc">Price: High → Low</option>
                            <option value="rating">Top Rated</option>
                        </select>
                    </div>
                </div>

                {!searchQuery && priceFilter === 'all' && (
                    <div className="hero-banner">
                        <div className="hero-content">
                            <p className="hero-eyebrow">Welcome to my little shop</p>
                            <h1 className="hero-title">
                                Handpicked finds,<br />
                                <em>just for you.</em>
                            </h1>
                            <p className="hero-sub">Fresh drops every week — browse, discover, enjoy ✨</p>
                        </div>
                        <div className="hero-deco" aria-hidden="true">
                            <div className="deco-ring deco-ring-1"></div>
                            <div className="deco-ring deco-ring-2"></div>
                            <div className="deco-dot-grid"></div>
                        </div>
                    </div>
                )}

                {displayProducts.length === 0 ? (
                    <div className="no-results">
                        <p className="no-results-emoji">🔍</p>
                        <p>No products found for <strong>"{searchQuery}"</strong></p>
                        <button className="no-results-clear button-secondary" onClick={() => { setSearchQuery(''); setPriceFilter('all'); }}>
                            Clear search
                        </button>
                    </div>
                ) : (
                    <ProductsGrid products={displayProducts} loadCart={loadCart} />
                )}
            </div>
        </>
    )
}
