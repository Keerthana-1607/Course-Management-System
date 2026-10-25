import { useEffect, useState } from 'react'
import './index.css'
import { apiFetch } from '../../api'
import CartItem from '../CartItem'
import { useNavigate } from 'react-router-dom'


const Cart = () => {

    const [cart, setCart] = useState({
        totalItems: 0,
        totalPrice: "0.00",
        items: []
    })
    const navigate= useNavigate()

    console.log("CART:", cart)


    const getCartDetails = async () => {

        const response = await apiFetch('/api/cart')

        console.log(response)

        const responseData = await response.json()

        console.log(responseData)


        const formattedData = {

            totalItems: responseData.total_items,

            totalPrice: responseData.total_price,

            items: responseData.items.map(i => ({

                course: i.course,

                courseName: i.course_name,

                courseImage: i.course_image,

                rating: i.rating,

                price: i.price

            }))
        }

        setCart(formattedData)
    }


    useEffect(() => {

        getCartDetails()

    }, [])


    return (

        <div className="cart-page">

            {/* LEFT SIDE */}

            <div className="cart-container">

                <div className="cart-header">

                    <div className="cart-title-section">

                        <h2>Course Cart</h2>

                        {
                            cart.totalItems === 1
                                ?
                                <span>
                                    {cart.totalItems} Course in Cart
                                </span>
                                :
                                <span>
                                    {cart.totalItems} Courses in Cart
                                </span>
                        }

                    </div>

                </div>


                <div className="cart-items">

                   {cart.items.length === 0 ? (
                        <p className='cart-empty'>Your cart is empty ....</p>
                    ) : (
                        cart.items.map((item) => (
                            <CartItem
                                key={item.course}
                                courseItem={item}
                                getCartDetails={getCartDetails}
                            />
                        ))
                    )}

                </div>

            </div>


            {/* RIGHT SIDE */}

            <div className="price-details">

                <h2>Price Details</h2>


                <div className="price-row">

                    <p>Base Amount</p>

                    <p>₹{cart.totalPrice}</p>

                </div>


                <div className="price-row">

                    <p>GST</p>

                    <p>7%</p>

                </div>


                <div className="total-row">

                    <h3>Total Amount</h3>

                    <h3>
                        ₹{+cart.totalPrice * 7 / 100 + +cart.totalPrice}
                    </h3>

                </div>


                <button className="checkout-button" 
                    disabled={cart.items.length === 0}
                    onClick={()=>navigate('/checkout')}>
                    Checkout
                </button>

            </div>

        </div>
    )
}


export default Cart