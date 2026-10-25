import './index.css'

const MyCourseItem = ({ courses }) => {
    const {
        courseName,
        courseImage,
        price,
        rating
    } = courses

    return (
        <div className="my-course-item">

            <div className="my-course-image-container">
                <img
                    src={courseImage}
                    alt={courseName}
                    className="my-course-image"
                />
            </div>

            <div className="my-course-details">

                <h2 className="my-course-name">
                    {courseName}
                </h2>

                <p className="my-course-rating">
                    ★ {rating}
                </p>

                <p className="my-course-price">
                    ₹{price}
                </p>

                {/* <button className="continue-course-button">
                    Continue Course
                </button> */}

            </div>

        </div>
    )
}

export default MyCourseItem