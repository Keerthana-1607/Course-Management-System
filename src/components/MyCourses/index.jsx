import { apiFetch } from '../../api'
import MyCourseItem from '../MyCourseItem'
import './index.css'
import {useState,useEffect } from 'react'

const MyCourses=()=>{
    const[myCourses,setMyCourses] = useState([])

    const getPurchasedCourses=async()=>{
        const response=await apiFetch('/api/payments/my-courses/')
        const responseData=await response.json()
        console.log(responseData)
        const formattedData=responseData.map(course=>({
            courseId:course.course_id,
            courseName:course.course_name,
            courseImage:course.course_image,
            price:course.price,
            rating:course.rating,
            
        }))
        setMyCourses(formattedData)
    }
    useEffect(()=>{
        getPurchasedCourses()

    },[])

    return(
    <div className="my-courses-page">

        <h1 className="my-courses-title">
            My Courses
        </h1>

        {myCourses.length > 0 ? (
            <div className="my-courses-list">
                {myCourses.map(course => (
                    <MyCourseItem
                        courses={course}
                        key={course.courseId}
                    />
                ))}
            </div>
        ) : (
            <h2 className="no-courses">
                No Courses Purchased yet
            </h2>
        )}

    </div>
)
}
export default MyCourses