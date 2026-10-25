import { apiFetch } from '../../api'
import './index.css'
import { useOutletContext } from 'react-router-dom'

const CartItem = ({courseItem,getCartDetails}) => {

    const {courseName, courseImage, rating, price,course} = courseItem
    const { setCartCount } = useOutletContext()
    const removeItem=async()=>{
        const response=await apiFetch(`/api/cart/item/${course}/`,{
            method:"DELETE",

        })
        const data = await response.json()

        console.log("Delete response:", data)
        
        if (response.ok) {

            const cartResponse = await apiFetch('/api/cart/')
            const cartData = await cartResponse.json()

            console.log("Latest cart:", cartData)

            setCartCount(cartData.total_items)
            getCartDetails()
        }
        
    }
    return (
        <div className="cart-item">

            <img
                className="cart-item-image"
                src={courseImage}
                alt={courseName}
            />

            <div className="cart-item-info">
                <h3>{courseName}</h3>
                <p>⭐ {rating}</p>
            </div>

            <div className="cart-item-actions">
                <button onClick={removeItem}>Remove</button>
                <p>₹{price}</p>
            </div>

        </div>
    )
}

export default CartItem