import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [usernameEmail, setUsernameEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        
        const emailRegex = /\S+@\S+\.\S+/;
        const isEmail = emailRegex.test(usernameEmail);

        const endpoint = isEmail 
        ? `http://localhost:4000/api/users/email/${usernameEmail}`
        : `http://localhost:4000/api/users/username/${usernameEmail}`;


        try {
            const result = await axios.post(endpoint, { usernameEmail, password })

            if(result.data.message === "User exist and password is correct") {
                const response = await axios.get(endpoint);
                const user = response.data.user;
                const id = user.idUser;
                const firstName = user.firstName;
                const secondName = user.secondName;
                const firstLastName = user.firstLastName;
                const secondLastName = user.secondLastName;
                const email = user.email;
                const username = user.username;
                const avatar = user.avatar;
                const birthdate = user.birthdate;

                localStorage.setItem('user', JSON.stringify({
                    firstName,
                    secondName,
                    firstLastName,
                    secondLastName,
                    email,
                    username,
                    avatar,
                    birthdate,
                    id
                }));
                navigate('/Home')
            } else {
                setErrorMessage('Username, email or password incorrect.');
            }
        } catch (err) {
            setErrorMessage(err.response.data.error || 'An error ocurred.')
        }

    }
    
    return(
        <div>
            <div className = "d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className = "bg-white p-4 rounded w-20">
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
                            <a className="label-link" href="/ForgotPass"> Forgot password? </a>
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
                    {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
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

function validatePassword(inputPassword, storedPassword) {
    return inputPassword === storedPassword;
}

export default Login;