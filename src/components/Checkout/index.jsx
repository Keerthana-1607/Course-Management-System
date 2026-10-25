import { useEffect, useState } from 'react'
import './index.css'
import { apiFetch } from '../../api'
import {useNavigate,useOutletContext } from 'react-router-dom'

const Checkout = () => {
    const navigate=useNavigate()
    const [cartItems, setCartItems] = useState([])
    const [paymentDetails, setPaymentDetails] = useState({
        subtotal: "0.00",
        gst: "0.00",
        amount: "0.00",
        orderId: ""
    })
    const [paymentSuccess, setPaymentSuccess] = useState(false)
    const [loading, setLoading] = useState(true)
    const {setCartCount}=useOutletContext()
    const getCartDetails = async () => {

        try {

            const response = await apiFetch('/api/cart')

            const responseData = await response.json()

            console.log("CART DETAILS:", responseData)

            if (!response.ok) {
                console.log(responseData)
                return
            }

            setCartItems(responseData.items)

        } catch (error) {

            console.log("Cart error:", error)

        }
    }

    const createPaymentOrder = async () => {

        try {

            const response = await apiFetch('/api/payments/create-order/', {
                method: 'POST'
            })

            const responseData = await response.json()

            console.log("PAYMENT ORDER:", responseData)

            if (!response.ok) {
                console.log(responseData)
                return
            }

            setPaymentDetails({
                subtotal: responseData.subtotal,
                gst: responseData.gst,
                amount: responseData.amount,
                orderId: responseData.order_id
            })

        } catch (error) {

            console.log("Payment order error:", error)

        } finally {

            setLoading(false)

        }
    }
    
    const completePayment = async () => {

        try {

            const response = await apiFetch('/api/payments/complete-payment/', {
                method: 'POST',
                body: JSON.stringify({
                    order_id: paymentDetails.orderId
                })
            })

            const responseData = await response.json()

            console.log("PAYMENT COMPLETION:", responseData)

            if (!response.ok) {
                console.log("Payment failed:", responseData)
                return
            }

            // console.log("Payment completed successfully")
            setPaymentSuccess(true)
            setCartCount(0)

        } catch (error) {

            console.log("Payment completion error:", error)

        }
    }
    useEffect(() => {

        createPaymentOrder()
        getCartDetails()

    }, [])

    const formatAmount = (amount) => {
        return Number(amount).toFixed(2)
    }

    if (paymentSuccess) {
        return (
            <div className="payment-success-page">

                <div className="payment-success-box">

                    <h1><span>✓</span> Payment Successful</h1>

                    <p>
                        Your purchase has been completed successfully.
                    </p>

                    <p>
                        Amount Paid: ₹{formatAmount(paymentDetails.amount)}
                    </p>

                    <p>
                        Order ID: {paymentDetails.orderId}
                    </p>
                    <button
                        className="my-courses-button"
                        onClick={() => navigate('/mycourses')}
                    >
                        Go to My Courses
                    </button>

                </div>

            </div>
        )
    }
    return (
        <div className="checkout-page">

            <div className="checkout-container">

                <h1 className="checkout-title">
                    Checkout
                </h1>

                <div className="checkout-content">

                    <div className="order-summary">

                        <h2>Order Summary</h2>

                        {cartItems.map(item => (
                            <div className="checkout-course-item" key={item.course}>

                                <img
                                    src={item.course_image}
                                    alt={item.course_name}
                                    className="checkout-course-image"
                                />

                                <div className="checkout-course-details">

                                    <h3>{item.course_name}</h3>

                                    <p>★ {item.rating}</p>

                                    <p>₹{formatAmount(item.price)}</p>

                                </div>

                            </div>
                        ))}

                    </div>


                    <div className="checkout-price">

                        <h2>Price Details</h2>

                        <div className="checkout-price-row">

                            <p>Base Amount</p>

                            <p>
                                ₹{paymentDetails.subtotal}
                            </p>

                        </div>


                        <div className="checkout-price-row">

                            <p>GST</p>

                            <p>₹{formatAmount(paymentDetails.gst)}</p>

                        </div>


                        <div className="checkout-total-row">

                            <h3>Total Amount</h3>

                            <h3>₹{formatAmount(paymentDetails.amount)}</h3>

                        </div>


                        <button
                            className="pay-button"
                            disabled={loading}
                            onClick={completePayment}
                        >
                            {loading
                                ? "Loading..."
                                : `Pay ₹${formatAmount(paymentDetails.amount)}`
                            }
                        </button>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Checkout