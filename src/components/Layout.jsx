import { useState,useEffect } from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import { apiFetch } from '../api'


const Layout = () => {
    const[cartCount,setCartCount]=useState(0)
    useEffect(() => {
        const getCartCount = async () => {

            const response = await apiFetch('/api/cart/')
            const data = await response.json()

            console.log("Layout Cart:", data)

            setCartCount(data.total_items)
        }

        getCartCount()

    }, [])
    return (
        <>
            <Header cartCount={cartCount} setCartCount={setCartCount}/>
            <Outlet context={{ cartCount, setCartCount }}/>
        </>
    )
}

export default Layout