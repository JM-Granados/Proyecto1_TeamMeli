import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ForgotPass() {
    const [email] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        /*axios.post('url de base', {Email})
        .then(result => {console.log(result)
            navigate('/')
        })
        .catch(err=> console.log(err))*/
    }

    return (
        <div>
            <div className = "d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className = "bg-white p-3 rounded w-25">
                <h2>Reset your password</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="Email">
                            <strong>Enter your account's verified emial address and we will send you a password reset.</strong>
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
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Send password reset email
                    </button>
                </form>
            </div>
            </div>
        </div>
    );
}

export default ForgotPass;