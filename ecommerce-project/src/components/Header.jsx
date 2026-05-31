import { useState } from 'react'
import { Link } from 'react-router'
import './header.css'

export function Header({ cart, onSearch = () => {} }) {
    const [inputValue, setInputValue] = useState('')

    let totalQuantity = 0
    cart.forEach((cartItem) => {
        totalQuantity += cartItem.quantity
    })

    const handleSearch = () => {
        onSearch(inputValue.trim())
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSearch()
    }

    return (
        <div className="header">
            <div className="left-section">
                <Link to="/" className="logo-link" onClick={() => onSearch('')}>
                    <span className="logo-text">
                        Nhi<span className="logo-accent">Store</span>
                    </span>
                </Link>
            </div>

            <div className="middle-section">
                <input
                    className="search-bar"
                    type="text"
                    placeholder="Search products..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button className="search-button" onClick={handleSearch}>
                    <img className="search-icon" src="images/icons/search-icon.png" />
                </button>
            </div>

            <div className="right-section">
                <Link to="/orders" className="orders-link header-link">
                    <span className="orders-text">Orders</span>
                </Link>

                <Link to="/checkout" className="cart-link header-link">
                    <img className="cart-icon" src="images/icons/cart-icon.png" />
                    <div className="cart-quantity">{totalQuantity}</div>
                    <div className="cart-text">Cart</div>
                </Link>
            </div>
        </div>
    )
}
