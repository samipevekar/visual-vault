import React, { useContext, useState } from 'react'
import './signup.css'
import shopContext from '../../Context/ShopContext'
import toast from 'react-hot-toast'

export default function Signup() {
    const [state, setState] = useState("login")
    const [credentials, setCredentials] = useState({
        name: "",
        username: "",
        password: "",
        gender: ""
    })
    const [usernameError, setUsernameError] = useState("")

    const validateUsername = (username) => {
        const usernameRegex = /^[a-z_]+$/
        return usernameRegex.test(username)
    }

    const onchangeHandler = (e) => {
        const { name, value } = e.target
        if (name === 'username') {
            const trimmedValue = value.trim()
            if (!validateUsername(trimmedValue)) {
                setUsernameError("Username must be lowercase and without symbols ")
            } else {
                setUsernameError("")
            }
            setCredentials({ ...credentials, [name]: trimmedValue })
        } else {
            setCredentials({ ...credentials, [name]: value })
        }
    }

    // Using alert component from shopContext
    const context = useContext(shopContext)
    const { HOST } = context

    const signup = async (e) => {
        e.preventDefault()
        if (usernameError) {
            toast.error(usernameError)
            return
        }
        let response;
        await fetch(`${HOST}/api/auth/signup`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(credentials)
        }).then(res => res.json()).then(data => response = data)

        if (response && response.success) {
            localStorage.setItem("auth-token", response.token)
            window.location.href = "/"
        } else {
            toast.error(response.message)
        }
    }

    const login = async (e) => {
        let response
        e.preventDefault()
        await fetch(`${HOST}/api/auth/login`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(credentials)
        }).then(res => res.json()).then(data => response = data)

        if (response && response.success) {
            localStorage.setItem("auth-token", response.token)
            window.location.href = "/"
        } else {
            toast.error(response.message)
        }
    }

    return (
        <div className='signupContainer'>
            <form className='form' onSubmit={state === "login" ? login : signup}>
                <div className="mb-3">
                    {state === "signup" ? <h1 className='text-[30px] font-[650] mb-2'>Sign Up</h1> : <h1 className='text-[30px] font-[650] mb-2'>Login</h1>}
                    {state === "signup" ? <input required type="text" className="input input-bordered w-full max-w-xs my-2 h-12" name='name' placeholder="Enter name" minLength={3} onChange={onchangeHandler} value={credentials.name} /> : <></>}
                    <input required type="text" className="input input-bordered w-full max-w-xs my-2 h-12" name='username' minLength={3} placeholder="Enter username" onChange={onchangeHandler} value={credentials.username} />
                    {usernameError && <p className="text-red-500">{usernameError}</p>}
                    <input required type="password" className="input input-bordered w-full max-w-xs my-2 h-12" name='password' placeholder="Enter your password" onChange={onchangeHandler} value={credentials.password} />
                </div>

                {state === "signup" ? <div className='d-flex gap-4 '>
                    <label className='flex gap-2'>
                        <input type="radio" name='gender' value="male" className='radio'
                            checked={credentials.gender === 'male'} onChange={onchangeHandler} /> {""}
                        Male
                    </label>

                    <label className='flex gap-2'>
                        <input type="radio" name='gender' value="female" className='radio'
                            checked={credentials.gender === 'female'} onChange={onchangeHandler} /> {""}
                        Female
                    </label>
                </div> : ""}

                {state === "signup" ? <p style={{ cursor: "pointer", margin: "10px 0px" }}>Already have an account? <span onClick={() => setState("login")} style={{ fontWeight: "bold" }}>Login</span></p> : <p style={{ cursor: "pointer" }}>Don't have an account? <span onClick={() => setState("signup")} style={{ fontWeight: "bold" }}>Signup</span></p>}
                {state === "signup" ? <button className='btn btn-primary' id='sign_btn' type='submit'>Signup</button> : <button className='btn btn-primary' id='sign_btn' type='submit'>Login</button>}
            </form>
        </div>
    )
}
