import './index.css'
import { useNavigate,useSearchParams} from 'react-router-dom'
import { useState,useEffect,useRef } from 'react'
import { getAccessToken,clearTokens,getRefreshToken,apiFetch,getEmail,getUsername} from '../../api'


const Header = (props) => {
    const {cartCount} = props
    const[searchParams,setSearchParams] = useSearchParams()
    const navigate = useNavigate()
    const profileRef = useRef(null)

    const search = searchParams.get('search') || '';
    const token = getAccessToken()
    const username = getUsername()
    const email=getEmail()
    console.log("USERNAME",username)
    console.log("EMAIL",email)
    const [showProfile, setShowProfile] = useState(false)

    const handleSearch = (e) =>{
        const value = e.target.value 
        setSearchParams({
            search:value
        })
    }
    const handleSearchKeydown =(e)=>{
        if (e.key === 'Enter')
        {
            navigate(`/?search=${encodeURIComponent(searchInput)}`)
        }
    }
    const handleLogout = async() => {
        let refresh = getRefreshToken()
        console.log(refresh)
        if(refresh !== undefined){
            await apiFetch('/users/logout/',{
                method:"POST",
                body:JSON.stringify({refresh})

            })
        }

        clearTokens()
        navigate('/login',{replace:true})
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                profileRef.current &&
                !profileRef.current.contains(event.target)
            ) {
                setShowProfile(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])


    return (
        <header className="header">

            <div className="header-container">

                {/* Logo */}
                <div
                    className="logo"
                    onClick={() => navigate('/')}
                >
                    <div className="logo-icon">E</div>

                    <div>
                        <h2>EduTech</h2>
                        <span>Learn. Grow. Succeed.</span>
                    </div>
                </div>


                {/* Search */}
                <div className="search-container">

                    <span className="search-icon">⌕</span>

                    <input
                        type="search"
                        placeholder="Search for anything"
                        value={search}
                        onChange={handleSearch}
                        onKeyDown={handleSearchKeydown}
                    />

                </div>


                {/* Navigation */}
                <div className="navigation">

                    <button
                        className={location.pathname === '/' ? 'active' : ''}
                        onClick={() => navigate('/')}
                    >
                        Home
                    </button>

                    <button
                        className={location.pathname === '/about' ? 'active' : ''}
                        onClick={() => navigate('/about')}
                    >
                        About
                    </button>

                    <button
                        className={location.pathname === '/courses' ? 'active' : ''}
                        onClick={() => navigate('/courses')}
                    >
                        Courses
                    </button>

                    <button
                        className={location.pathname === '/mycourses' ? 'active' : ''}
                        onClick={() => navigate('/mycourses')}
                    >
                        My Courses
                    </button>
                    

                </div>

                {/* Cart icon  */}
                <div className="cart">
                    {/* <i className="bi bi-cart-plus cart-icon"></i> */}
                    <p className='cart-icon' onClick={()=>navigate('/cart')}>Cart</p>
                    {/* <span className="cart-count">{cartCount}</span> */}
                    {cartCount > 0 && (
                        <span className="cart-count">{cartCount}</span>
                    )}
                </div>

                {/* Authentication */}
                <div className="auth-section">

                    {token ? (
                        <div className="profile-container" ref={profileRef}>

                            <button
                                className="profile-circle"
                                onClick={() => setShowProfile(!showProfile)}
                            >
                                {username?.charAt(0).toUpperCase()}
                            </button>

                            {showProfile && (
                                <div className="profile-panel">

                                    <div className="profile-info">

                                        <div className="profile-panel-circle">
                                            {username?.charAt(0).toUpperCase()}
                                        </div>

                                        <div className="profile-user-details">
                                            <p className="profile-name">
                                                {username}
                                            </p>

                                            <p className="profile-email">
                                                {email}
                                            </p>
                                        </div>

                                    </div>

                                    <div className="profile-divider"></div>

                                    <button
                                        className="profile-logout-button"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>

                                </div>
                            )}

                        </div>
                    ) : (
                        <>
                            <button
                                className="login-button"
                                onClick={() => navigate('/login')}
                            >
                                Login
                            </button>

                            <button
                                className="signup-button"
                                onClick={() => navigate('register/')}
                            >
                                Sign Up
                            </button>
                        </>
                    )}

                </div>

            </div>

        </header>
    )
}

export default Header

