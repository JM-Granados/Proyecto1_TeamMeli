import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [usernameEmail, setUsernameEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        /*axios.post('url de base', {usernameEmail, password})
        .then(result => {console.log(result)
            navigate('/home')
        })
        .catch(err=> console.log(err))*/
    }
    
    return(
        <div>
            <div className = "d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className = "bg-white p-3 rounded w-25">
                <h2>Log in</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username or email address">
                            <strong>Username or Email</strong>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter username or email address"
                            autoComplete="off"
                            name="usernameOrEmail"
                            className="form-control rounded-0"
                            onChange={(e) => setUsernameEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="password">
                            <strong>Password </strong>
                            <a class="label-link" href="/ForgotPass"> Forgot password? </a>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            name="password"
                            className="form-control rounded-0"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Sign in
                    </button>
                    <p></p>
                    <p>New account?</p>
                    <Link to="/Signup" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                        Create an account.
                    </Link>
                </form>
            </div>
        </div>
        </div>
    )
}

export default Login;