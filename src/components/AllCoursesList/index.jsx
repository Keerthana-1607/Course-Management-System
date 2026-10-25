import { useEffect, useState } from 'react'
import './index.css'
import CourseItem from '../CourseItem'
import { useSearchParams } from 'react-router-dom'
import { apiFetch, getUserType,getAccessToken } from '../../api'



const AllCoursesList =()=>{
    const[showSlider,setShowSlider] = useState(false)
    const[courseName,setCourseName] = useState('')
    const[price,setPrice] = useState('')
    const[courseImage,setCourseImage] = useState('')
    const[rating,setRating] = useState('')
    const[coursesList,setCoursesList] = useState([])

    const[searchParams] = useSearchParams()
    const search = searchParams.get('search') || ''

    const user=getUserType()
    console.log(user)

    useEffect(()=>{
        // console.log("Access token:", getAccessToken())
        const getCourses= async()=>{
            const url = `http://127.0.0.1:8001/api/courses/?search=${search}`
            const response = await fetch(url)
            const responseData = await response.json()
            console.log(responseData)
            const formattedData = responseData.map(course=>({
                courseId:course.course_id,
                courseName:course.course_name,
                price:course.price,
                rating:course.rating,
                courseImage:course.course_image
            }))
             setCoursesList(formattedData)

        }
        getCourses()
    },[search])

    const handleAddCourse =async(e)=>{
        e.preventDefault()
        const url = '/api/courses/'
        const response = await apiFetch(url,{
            method:"POST",
            body:JSON.stringify({
                course_name:courseName,
                price,
                course_image:courseImage,
                rating
            })
        })
        console.log(response)
    }

    
    return(
        <div className='courses-page'>
            {user === 'instructor' && 
                <button className="add-course-btn" 
                onClick={() =>setShowSlider(true)}>+ Add Course</button>}

            <ul className='course-list'>
                {coursesList.map(eachCourse=>(
                    <CourseItem courseDetails={eachCourse} 
                   key={eachCourse.courseId}/>
                ))}

            </ul>

            {/* Show Slider  */}
            
            {showSlider && (
                <div className="slider-overlay">

                    <div className="course-slider">

                        <div className="slider-header">
                            <h2>Add Course</h2>

                            <button
                                className="close-btn"
                                onClick={() => setShowSlider(false)}
                            >
                                ×
                            </button>
                        </div>


                        <div className="form-group">
                            <label>Course Name</label>

                            <input
                                type="text"
                                placeholder="Enter course name"
                                value={courseName}
                                onChange={e =>setCourseName(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Price</label>

                            <input
                                type="number"
                                placeholder="Enter price"
                                max={10}
                                value={price}
                                onChange={e=>setPrice(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Image URL</label>

                            <input
                                type="text"
                                placeholder="Enter Image URL"
                                value={courseImage}
                                onChange={e=>setCourseImage(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Rating</label>

                            <input
                                type="number"
                                placeholder="Enter Rating"
                                value={rating}
                                onChange={e =>setRating(e.target.value)}
                            />
                        </div>


                        <button className="save-course-btn" onClick={handleAddCourse}>
                            Add Course
                        </button>

                    </div>

                </div>
            )}
        </div>

    )
}
export default AllCoursesList