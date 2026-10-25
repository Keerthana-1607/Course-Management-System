import { Link,useNavigate } from 'react-router-dom'
import './index.css'

const CourseItem = (props) => {

    const { courseDetails,image } = props
    const navigate = useNavigate()

    const {
        courseId,
        courseName,
        price,
        rating,
        courseImage,
        description
    } = courseDetails

    return (
        <Link to = {`/courses/${courseId}`} className='course-item-link'>
        <li className="course">
            <div className="course-Image">

                <img src={courseImage} alt={courseName}/>
               
            </div>

            <div className="course-content">

                <h2>{courseName}</h2>
               
            </div>

            <div className="course-bottom">

                <div>
                    <p className="course-price">
                        ₹{price}
                    </p>

                    <p className="course-rating">
                        {"★".repeat(Math.floor(rating))}
                        {"☆".repeat(5 - Math.floor(rating))}
                    </p>
                </div>

                <button className="view-course-btn" onClick={()=>navigate('/courses')}>
                    View Course
                </button>

            </div>

        </li>
        </Link>
    )
}

export default CourseItem