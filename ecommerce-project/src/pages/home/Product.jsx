import { useState } from 'react'
import { Link } from 'react-router'
import axios from 'axios'
import { FormatMoney } from '../../utils/money'

export function Product({ product, loadCart }) {
    const [quantity, setQuantity] = useState(1)
    const [added, setAdded] = useState(false)

    const addToCart = async () => {
        await axios.post('/api/cart-items', {
            productId: product.id,
            quantity
        })
        await loadCart()
        setAdded(true)
        setTimeout(() => setAdded(false), 2200)
    }

    return (
        <div className="product-container">
            <Link to={`/products/${product.id}`} className="product-image-link">
                <div className="product-image-container">
                    <img
                        className="product-image"
                        data-testid="product-image"
                        src={product.image}
                        alt={product.name}
                    />
                </div>
            </Link>

            <div className="product-body">
                <Link to={`/products/${product.id}`} className="product-name-link">
                    <div className="product-name limit-text-to-2-lines">
                        {product.name}
                    </div>
                </Link>

                <div className="product-rating-container">
                    <img
                        className="product-rating-stars"
                        data-testid="product-rating-stars"
                        src={`images/ratings/rating-${product.rating.stars * 10}.png`}
                    />
                    <div className="product-rating-count link-primary">
                        {product.rating.count}
                    </div>
                </div>

                <div className="product-price">
                    {FormatMoney(product.priceCents)}
                </div>

                <div className="product-quantity-container">
                    <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                            <option key={n} value={n}>{n}</option>
                        ))}
                    </select>
                </div>

                <div className="product-spacer"></div>

                <div className={`added-to-cart ${added ? 'visible' : ''}`}>
                    <img src="images/icons/checkmark.png" />
                    Added to cart!
                </div>

                <button
                    className="add-to-cart-button button-primary"
                    data-testid="add-to-cart-button"
                    onClick={addToCart}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    )
}
