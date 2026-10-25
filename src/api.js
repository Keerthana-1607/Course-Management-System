import Cookies from 'js-cookie'

export const BASE_URL = import.meta.env.VITE_API_BASE_URL
export const apiUrl = path => `${BASE_URL}${path}`

const ACCESS_TOKEN_KEY = 'jwt_token'
const REFRESH_TOKEN_KEY = 'refresh_token'
const USER_TYPE = 'user_type'
const FIRSTNAME='firstname'
const LASTNAME = 'lastname'
const EMAIL='email'
const USERNAME='username'

// save tokens from here
export const saveTokens = ({access,refresh}) =>{
    Cookies.set(ACCESS_TOKEN_KEY,access,{expires:30})
    Cookies.set(REFRESH_TOKEN_KEY,refresh,{expires:30})
    
}
// save newaccess token
export const saveAccessToken = (access) => {
    Cookies.set(ACCESS_TOKEN_KEY, access, {expires: 30})
}
// save user details
export const saveUser = ({user_type, firstname,lastname,email,username}) => {
    Cookies.set(USER_TYPE, user_type, {expires: 30})
    Cookies.set(FIRSTNAME, firstname, {expires: 30})
    Cookies.set(LASTNAME, lastname, {expires: 30})
    Cookies.set(EMAIL, email, {expires: 30})
    Cookies.set(USERNAME, username, {expires: 30})
}

// get user details
export const getUserType = () => Cookies.get(USER_TYPE)
export const getFirstname = () => Cookies.get(FIRSTNAME)
export const getLastname = () => Cookies.get(LASTNAME)
export const getEmail = () => Cookies.get(EMAIL)
export const getUsername = () => Cookies.get(USERNAME)

// get tokens
export const getAccessToken = () => Cookies.get(ACCESS_TOKEN_KEY)
export const getRefreshToken = () => Cookies.get(REFRESH_TOKEN_KEY)

export const refreshAccessToken = async () => {
    const refreshToken = getRefreshToken()

    const response = await fetch(
        apiUrl('/users/login/refresh/'),
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                refresh: refreshToken
            })
        }
    )

    const data = await response.json()

    if (response.ok) {
        saveAccessToken(data.access)
    }

    return data
}



// clear tokens
export const clearTokens = () =>{
    Cookies.remove(ACCESS_TOKEN_KEY)
    Cookies.remove(REFRESH_TOKEN_KEY)
    Cookies.remove(USER_TYPE)
    Cookies.remove(FIRSTNAME)
    Cookies.remove(LASTNAME)
    Cookies.remove(EMAIL)
    Cookies.remove(USERNAME)
}

// fetching

// export const apiFetch = (path,options={}) =>{
//     let token = getAccessToken()
//     let headers = {'Content-type':'application/json',...options.headers}    

//     if(token !== undefined){
//         headers.Authorization = `Bearer ${token}`
//     }
//     return fetch(apiUrl(path),{...options,headers})
// }

// export const apiFetch = (path, options = {}) => {
//     const token = getAccessToken()

//     const headers = {
//         'Content-Type': 'application/json',
//         ...options.headers
//     }

//     if (token) {
//         headers.Authorization = `Bearer ${token}`
//     }

//     console.log("Token:", token)
//     console.log("Headers:", headers)

//     return fetch(apiUrl(path), {
//         ...options,
//         headers
//     })
// }

export const apiFetch = async (path, options = {}) => {
    const token = getAccessToken()

    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    }

    if (token) {
        headers.Authorization = `Bearer ${token}`
    }

    // First request
    let response = await fetch(apiUrl(path), {
        ...options,
        headers
    })

    // Access token expired
    if (response.status === 401) {

        console.log("Access token expired or invalid")

        // Get a new access token
        const data = await refreshAccessToken()

        console.log("New access token:", data.access)

        // Put new token into headers
        headers.Authorization = `Bearer ${data.access}`

        // Send original request again
        response = await fetch(apiUrl(path), {
            ...options,
            headers
        })
    }

    return response
}
