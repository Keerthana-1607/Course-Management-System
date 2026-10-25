
import { useState } from 'react'
import './index.css'
import {useNavigate,Navigate} from 'react-router-dom'
import { apiFetch,saveTokens,getAccessToken, saveUser } from '../../api'

const Login = () => {
    const[username,setUsername] = useState('')
    const[password,setPassword] = useState('')
    const[errorMsg,setErrorMsg] =useState(false)
    const[showSubmitErrorMsg,setShowSubmitErrorMsg] = useState(false)
    const navigate = useNavigate()

    const onSubmitSuccess = (tokens) =>{
        saveTokens(tokens)
        saveUser(tokens)
        navigate('/',{replace:true})
    }
    const onSubmitFailure = (message)=>{
        setShowSubmitErrorMsg(true)
        setErrorMsg(message)

    }
    const handleLogin=async(e)=>{
        e.preventDefault()

        const response = await apiFetch('/users/login/',{
            method:"POST",
            body:JSON.stringify({username,password})
        })
        console.log(response)
        const data = await response.json()
        console.log("Data",data)
        if(response.ok === true){
            onSubmitSuccess({
                access:data.access,
                refresh:data.refresh,
                user_type:data.user_type,
                firstname:data.firstname,
                lastname:data.lastname,
                email:data.email,
                username:data.username
            })
        }
        else{
            onSubmitFailure(data.detail ?? 'Login failed. Please try again.')
        }
        
    }

    // if(getAccessToken() !== undefined){
    //     <Navigate to='/' />

    // }
    return (
        <div className="login-page">

            <div className="login-card">

                <div className="login-header">
                    <div className="login-icon">
                        🎓
                    </div>

                    <h1>Welcome Back!</h1>

                    <p>Login to continue your learning journey</p>
                </div>

                <form onSubmit={handleLogin}>

                    <div className="form-group">
                        <label>USERNAME</label>

                        <input
                            type="text"
                            placeholder="Enter your email"
                            value={username}
                            onChange={e =>setUsername(e.target.value)}
                            autoComplete="off"
                        />
                    </div>

                    <div className="form-group">
                        <div className="password-label">
                            <label>Password</label>
                            <a href="#">Forgot password?</a>
                        </div>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={e =>setPassword(e.target.value)}
                            autoComplete="off"
                        />
                    </div>

                    <button
                        type="submit"
                        className="login-btn"
                        
                    >
                        Login
                    </button>
                    {showSubmitErrorMsg && <p className='error-msg'>*{errorMsg}</p>}
                    {/* {errorMsg && <p className='error-msg'>Invalid Username or Password</p>} */}


                </form>

                <div className="register-link">
                    <p>
                        Don't have an account?
                        <span onClick={()=>navigate('/register')}> Create account</span>
                    </p>
                </div>

            </div>

        </div>
    )
}

export default Login

