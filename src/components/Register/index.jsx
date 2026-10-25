
import { useState } from 'react'
import './index.css'
import { useNavigate } from 'react-router-dom'

const getErrorMsg=(data)=>{
    if(data.detail !== undefined){
        return data.detail
    }
    let field = Object.keys(data)[0] // get key name from data {data is error object with key and array}
    if(field === undefined){
        return 'Registration failed. Please try again.'
    }

    let value = data[field][0]
    return `${field}:${value}`
}

const Register = () => {
    const[firstname,setFirstname] = useState('')
    const[lastname,setLastname] = useState('')
    const[username,setUsername] = useState('')
    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')
    const[confirmPassword,setConfirmPassword] =useState('')
    const[userType,setAccountType] = useState('student')

    const[showErrorMsg,setShowErrorMsg] = useState(false)
    const[errorMsg,setErrorMsg] = useState('')
    const navigate = useNavigate()

    // submit success 
    const onSubmitSuccess = ()=>{
        navigate('/login')
    }
    // submit failure
    const onSubmitFailure = message =>{
        setShowErrorMsg(true)
        setErrorMsg(message)

    }
    const handleRegister=async(e)=>{
        e.preventDefault()
        if(password !== confirmPassword){
            onSubmitFailure("passwords do not match")
            return
        }
        const url = 'http://127.0.0.1:8001/users/register/'
        const response = await fetch(url,{
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                first_name:firstname,
                last_name:lastname,
                username,
                email,
                password,
                user_type:userType
            })
        })
        const responseData=await response.json()
        console.log(response)
        console.log(responseData)
        if(response.ok === true){
            onSubmitSuccess()
        }
        else{
            onSubmitFailure(getErrorMsg(responseData))
        }
        
    }
    return (
        <div className="register-page">

            <div className="register-card">

                <div className="register-header">
                    <h1>Create your account</h1>
                    <p>Register to start learning with EduTech</p>
                </div>

                <form onSubmit={handleRegister} autoComplete="off">

                    <div className="name-row">

                        <div className="form-group">
                            <label>First Name <span className='required-field'>*</span></label>
                            <input
                                type="text"
                                placeholder="Enter first name"
                                value={firstname}
                                onChange={e => setFirstname(e.target.value)}
                                autoComplete="off"
                                // //required
                            />
                        </div>

                        <div className="form-group">
                            <label>Last Name <span className='required-field'>*</span></label>
                            <input
                                type="text"
                                placeholder="Enter last name"
                                value={lastname}
                                onChange={e =>setLastname(e.target.value)}
                                autoComplete="off"
                                //required
                            />
                        </div>

                    </div>

                    <div className="form-group">
                        <label>Username <span className='required-field'>*</span></label>
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={username}
                            onChange={e =>setUsername(e.target.value)}
                            autoComplete="off"
                            //required
                        />
                    </div>

                    <div className="form-group">
                        <label>Email <span className='required-field'>*</span></label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={e =>setEmail(e.target.value)}
                            autoComplete="off"
                            // required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password <span className='required-field'>*</span></label>
                        <input
                            type="password"
                            placeholder="Create a password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            autoComplete="off"
                            // required
                        />
                    </div>

                    <div className="form-group">
                        <label>Confirm Password <span className='required-field'>*</span></label>
                        <input
                            type="password"
                            placeholder="Confirm a password"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            autoComplete="off"
                            // required
                        />
                    </div>

                    <div className="form-group">
                        <label>Account Type <span className='required-field'>*</span></label>

                        <select value={userType} onChange={e =>setAccountType(e.target.value)} required>
                            <option value="student">Student</option>
                            <option value="instructor">Instructor</option>
                        </select>
                    </div>

                    <button type="submit" className="register-button">
                        Register
                    </button>

                    {showErrorMsg && <p className='error-msg'>*{errorMsg}</p>}

                </form>

                <p className="login-text">
                    Already have an account?
                    <span onClick={()=>navigate('/login')}> Login</span>
                </p>

            </div>

        </div>
    )
}

export default Register

