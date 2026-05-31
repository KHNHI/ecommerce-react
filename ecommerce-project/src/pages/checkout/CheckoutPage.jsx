import axios from 'axios'
import { useState, useEffect } from 'react'
import { FormatMoney } from '../../utils/money'
import './CheckoutPage.css'
import './checkout-header.css'
import { OrderSummary } from './OrderSummary'
import { PaymentSummary } from './PaymentSummary'
export function CheckoutPage({ cart, loadCart }) {
    const [deliveryOptions, setDeliveryOptions] = useState([])
    const [paymentSummary, setPaymentSummary] = useState(null)
    useEffect(() => {
        const fetchCheckoutData = async()=>{
            let response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
            setDeliveryOptions(response.data)
        
            response = await axios.get('/api/payment-summary')
            setPaymentSummary(response.data)
        }
        fetchCheckoutData()
    }, [cart])

    return (
        <>
            <title>Checkout</title>

            <div className="checkout-header">
                <div className="header-content">
                    <div className="checkout-header-left-section">
                        <a href="/" className="checkout-logo-link">
                            <span className="checkout-logo-text">Nhi<span className="checkout-logo-accent">Store</span></span>
                        </a>
                    </div>

                    <div className="checkout-header-middle-section">
                        Checkout (<a className="return-to-home-link" href="/">
                            {cart.reduce((sum, item) => sum + item.quantity, 0)} items
                        </a>)
                    </div>

                    <div className="checkout-header-right-section">
                        <img src="images/icons/checkout-lock-icon.png" />
                    </div>
                </div>
            </div>

            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <OrderSummary deliveryOptions={deliveryOptions} cart={cart} loadCart={loadCart} />
                    <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
                </div>
            </div>
        </>
    )
}