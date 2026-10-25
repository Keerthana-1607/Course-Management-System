
import './App.css'
import {Routes,Route} from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import About from './components/About'
import Layout from './components/Layout'
import AllCoursesList from './components/AllCoursesList'
import CourseDetails from './components/CourseDetails'
import Cart from './components/Cart'
import MyCourses from './components/MyCourses'
import Checkout from './components/Checkout'
// import Header from './components/Header'



const App=()=>{
  return(
    <>
    <Routes>
       {/* Pages WITHOUT Header */}
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      
      {/* Pages WITH Header */}
      <Route element={<Layout/>}>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/courses' element={<AllCoursesList/>}/>
        <Route path='/courses/:id' element={<CourseDetails/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/mycourses' element={<MyCourses/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
      </Route>
      
    </Routes>
      
      
    </>

  )
  
}
export default App 