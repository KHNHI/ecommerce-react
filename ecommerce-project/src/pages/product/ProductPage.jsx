import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router'
import axios from 'axios'
import { FormatMoney } from '../../utils/money'
import { Header } from '../../components/Header'
import './ProductPage.css'

export function ProductPage({ cart, loadCart }) {
    const { productId } = useParams()
    const [product, setProduct] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [added, setAdded] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`/api/products/${productId}`)
                setProduct(response.data)
            } finally {
                setLoading(false)
            }
        }
        fetchProduct()
    }, [productId])

    const addToCart = async () => {
        await axios.post('/api/cart-items', { productId, quantity })
        await loadCart()
        setAdded(true)
        setTimeout(() => setAdded(false), 2200)
    }

    if (loading) {
        return (
            <>
                <Header cart={cart} />
                <div className="product-page-loading">
                    <div className="loading-spinner"></div>
                </div>
            </>
        )
    }

    if (!product) {
        return (
            <>
                <Header cart={cart} />
                <div className="product-page-error">
                    <p>Product not found.</p>
                    <Link to="/" className="back-link button-secondary">← Back to shop</Link>
                </div>
            </>
        )
    }

    const starsImg = `images/ratings/rating-${product.rating.stars * 10}.png`

    return (
        <>
            <title>{product.name} — NhiStore</title>
            <Header cart={cart} />

            <div className="product-page">
                <div className="product-page-inner">
                    <Link to="/" className="back-link">
                        ← Back to shop
                    </Link>

                    <div className="product-detail-grid">
                        {/* Left: Image */}
                        <div className="detail-image-panel">
                            <div className="detail-image-container">
                                <img
                                    className="detail-image"
                                    src={product.image}
                                    alt={product.name}
                                />
                            </div>
                        </div>

                        {/* Right: Info */}
                        <div className="detail-info-panel">
                            <h1 className="detail-name">{product.name}</h1>

                            <div className="detail-rating">
                                <img
                                    className="detail-rating-stars"
                                    src={starsImg}
                                    alt={`${product.rating.stars} stars`}
                                />
                                <span className="detail-rating-count">
                                    {product.rating.count} reviews
                                </span>
                            </div>

                            <div className="detail-price">
                                {FormatMoney(product.priceCents)}
                            </div>

                            <div className="detail-divider"></div>

                            <div className="detail-qty-row">
                                <label className="detail-qty-label">Quantity</label>
                                <select
                                    className="detail-qty-select"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                >
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                                        <option key={n} value={n}>{n}</option>
                                    ))}
                                </select>
                            </div>

                            <div className={`detail-added ${added ? 'visible' : ''}`}>
                                <img src="images/icons/checkmark.png" alt="" />
                                Added to cart!
                            </div>

                            <button
                                className="detail-add-btn button-primary"
                                onClick={addToCart}
                            >
                                Add to Cart
                            </button>

                            <Link to="/checkout" className="detail-checkout-link button-secondary">
                                View Cart & Checkout
                            </Link>

                            {product.description && (
                                <div className="detail-description">
                                    <h2 className="detail-description-title">About this product</h2>
                                    <p className="detail-description-text">{product.description}</p>
                                </div>
                            )}

                            {product.keywords && product.keywords.length > 0 && (
                                <div className="detail-tags">
                                    <span className="detail-tags-label">Tags:</span>
                                    {product.keywords.map((kw) => (
                                        <span key={kw} className="detail-tag">{kw}</span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
