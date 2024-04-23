import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ResetPassword() {
    const user = JSON.parse(localStorage.getItem('userRecovery'));

    const [password, setPassword] = useState()
    const [passwordConf, setPasswordConf] = useState()
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('');

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        const email = user.email;
        
        try {
            if (password === passwordConf) {
                const result = await axios.put(`http://localhost:4000/api/users/recovery-password/${email}`, {email, password})
                console.log("HOLA");
    
                if(result.data.message === "Password update") {
                    navigate('/')
                } else {
                    setErrorMessage('The password could not be saved');
                }
            } else {
                setErrorMessage('The password and the password confirmation are not the same');
            }

        } catch {
            setErrorMessage('The password could not be saved');
        }
    }

    return (
        <div>
            <div className = "d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className = "bg-white p-4 rounded w-20">
                <h2>Reset your password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="Email">
                            Enter the new password:
                        </label>
                        <input
                            type="text"
                            placeholder="Enter the new password "
                            autoComplete="off"
                            name="Email"
                            className="form-control rounded-0"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Email">
                            Confirm the password:
                        </label>
                        <input
                            type="text"
                            placeholder="Confirm the new password "
                            autoComplete="off"
                            name="Email"
                            className="form-control rounded-0"
                            onChange={(e) => setPasswordConf(e.target.value)}
                        />
                    </div>
                    <p></p>
                    {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
                    <p></p>
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Update
                    </button>
                </form>
            </div>
            </div>
        </div>
    );
}

export default ResetPassword;