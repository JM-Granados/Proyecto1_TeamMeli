import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ForgotPass() {
    const [email, setEmail] = useState()
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            const result = await axios.post(`http://localhost:4000/api/users/forgot-password/${email}`, {email})

            if(result.data.message === "User exist") {
                localStorage.setItem('userRecovery', JSON.stringify({
                    email
                }));
                navigate('/')
            } else {
                setErrorMessage('There is no account with that registered email');
            }
        } catch {
            setErrorMessage('An error ocurred sending the email.');
        }
    }

    return (
        <div>
            <div className = "d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className = "bg-white p-4 rounded w-20">
                <h2>Forgot password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="Email">
                            Enter your account's verified email address and we will send you a link to reset your pasword.
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Enter your email address "
                            autoComplete="off"
                            name="Email"
                            className="form-control rounded-0"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <p></p>
                    {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
                    <p></p>
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Send email verification
                    </button>
                </form>
            </div>
            </div>
        </div>
    );
}

export default ForgotPass;