import { useEffect, useState } from "react"
import { useParams,useNavigate,useOutletContext } from "react-router-dom"
import "./index.css"
import { apiFetch, getAccessToken } from "../../api"

const CourseDetails = () => {
    const [courseDetails, setCourseDetails] = useState({})
    const { id } = useParams()
    const {setCartCount}=useOutletContext()
    const[isAdded,setIsAdded]=useState(false)
    const [isPurchased, setIsPurchased] = useState(false)
    const navigate=useNavigate()
    console.log(id)

    const url = `http://127.0.0.1:8001/api/courses/${id}`

    useEffect(() => {
        const getCourseDetails = async () => {
            const response = await fetch(url)
            const responseData = await response.json()

            console.log(responseData)

            const formattedData = {
                id: responseData.course_id,
                courseName: responseData.course_name,
                courseImage: responseData.course_image,
                price:responseData.price,
                rating:responseData.rating,
                description:responseData.description
            }

            setCourseDetails(formattedData)
            const token = getAccessToken()

            // if (token) {
            //     const purchaseResponse = await apiFetch(
            //         `/api/payments/check-purchase/${id}/`
            //     )

            //     const purchaseData = await purchaseResponse.json()

            //     console.log("PURCHASE CHECK:", purchaseData)

            //     if (purchaseResponse.ok) {
            //         setIsPurchased(purchaseData.purchased)
            //     }
            // }

            if (token) {
                const purchaseResponse = await apiFetch(
                    `/api/payments/check-purchase/${id}/`
                )

                const purchaseData = await purchaseResponse.json()

                console.log("PURCHASE CHECK:", purchaseData)

                if (purchaseResponse.ok) {
                    setIsPurchased(purchaseData.purchased)
                }

                const cartResponse = await apiFetch('/api/cart/')
                const cartData = await cartResponse.json()

                console.log("CART CHECK:", cartData)

                if (cartResponse.ok) {
                    const alreadyAdded = cartData.items.some(
                        item => item.course === Number(id)
                    )

                    setIsAdded(alreadyAdded)
                }
            }
        }

        getCourseDetails()
    }, [id])

    const {
        courseName,
        courseImage,
        price,
        rating,
        description
    } = courseDetails


    const handleAddToCart=async()=>{
        if (isPurchased) {
            return
        }
        const token=getAccessToken()
        if (!token){
            navigate('/login')
            return
        }
        const response=await apiFetch('/api/cart/add/',{
            method:"POST",
            body:JSON.stringify({
                course_id:id
            })
        })
        const data=await response.json()
        console.log(data)

        if(response.ok){
            const cartResponse=await apiFetch('/api/cart/')
            const cartData= await cartResponse.json()
            setCartCount(cartData.total_items)
            setIsAdded(true)
        }

    }

    return (
        <div className="course-details-page">

            <div className="course-details-card">

                {/* Course Image */}

                <div className="course-details-image-container">
                    <img
                        className="course-details-image"
                        src={courseImage}
                        alt={courseName}
                    />
                </div>


                {/* Course Information */}

                <div className="course-details-content">

                    <h1>{courseName}</h1>

                    <div className="course-details-rating">
                        <span className="stars">
                            {"★".repeat(Math.floor(rating))}
                            {"☆".repeat(5 - Math.floor(rating))}
                        </span>

                        {/* <span className="rating-number">
                            {rating}
                        </span> */}
                    </div>

                    <p className="course-details-price">
                        ₹{price}
                    </p>

                    <hr />

                    <div className="course-description">
                        <h2>About this course</h2>

                        <p>{description}</p>
                    </div>


                    {/* Buttons */}

                    <div className="course-actions">

                        {isPurchased ? (
                            <button className="add-cart-btn" disabled>
                                Purchased
                            </button>
                        ) : (
                            <>
                                {isAdded ? (
                                    <button className="add-cart-btn" disabled>
                                        Added to Cart
                                    </button>
                                ) : (
                                    <button
                                        className="add-cart-btn"
                                        onClick={handleAddToCart}
                                    >
                                        Add to Cart
                                    </button>
                                )}

                                <button className="buy-now-btn" onClick={()=>navigate('/checkout')}>
                                    Buy Now
                                </button>
                            </>
                        )}

                    </div>

                </div>

            </div>

        </div>
    )
}

export default CourseDetails