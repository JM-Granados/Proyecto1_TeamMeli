import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [FirstName, setFirstName] = useState()
    const [SecondName, setSecondName] = useState()
    const [FirstLastName, setFirstLastName] = useState()
    const [SecondLastName, setSecondLastName] = useState()
    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [birthdate, setBirthdate] = useState()
    const [avatar, setavatar] = useState()
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        try {
            const result = await axios.post('http://localhost:4000/api/users/', {FirstName, SecondName, FirstLastName, SecondLastName, username, email, password, birthdate, avatar})
            console.log(result);
            if(result.data.message === "User created") {
                navigate('/')
            } else {
                setErrorMessage('Unexpected response from the server.');
            }
        } catch (err) {
            setErrorMessage(err.response.data.error || 'An error ocurred while creating the user.')
        }
    }

    return (
        <div>
            <div className = "d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className = "bg-white p-4 rounded w-20">
                <h2>First, let's create your user account </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="FirstName*">
                            <strong>First name*</strong>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter first name "
                            autoComplete="off"
                            name="FirstName"
                            className="form-control rounded-0"
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="SecondName*">
                            <strong>Second name</strong>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter second name "
                            autoComplete="off"
                            name="SecondName"
                            className="form-control rounded-0"
                            onChange={(e) => setSecondName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="FirstLastName*">
                            <strong>First last name*</strong>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Name "
                            autoComplete="off"
                            name="Name"
                            className="form-control rounded-0"
                            onChange={(e) => setFirstLastName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="SecondLastName*">
                            <strong>Second last name*</strong>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter second last Name "
                            autoComplete="off"
                            name="SecondLastName"
                            className="form-control rounded-0"
                            onChange={(e) => setSecondLastName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="*">
                            <strong>Username*</strong>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Username "
                            autoComplete="off"
                            name="username"
                            className="form-control rounded-0"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="*">
                            <strong>Email*</strong>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Email"
                            autoComplete="off"
                            name="Email"
                            className="form-control rounded-0"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="password">
                            <strong>Password* </strong>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            name="password"
                            className="form-control rounded-0"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Birthdate*">
                            <strong>Birthdate*</strong>
                        </label>
                        <input
                            type="date"
                            placeholder="Enter Birthdate "
                            autoComplete="off"
                            name="Birthdate"
                            className="form-control rounded-0"
                            max={new Date().toISOString().split('T')[0]}
                            onChange={(e) => setBirthdate(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="User photo or avatar*">
                            <strong>User photo or avatar*</strong>
                        </label>
                        <input
                            type="file"
                            placeholder="Enter Birthdate "
                            autoComplete="off"
                            name="User photo or avatar"
                            className="form-control rounded-0"
                            accept="image/png, image/jpeg, image/jpg"
                            onChange={(e) => setavatar(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-10">
                        Create account
                    </button>
                    <p></p>
                    {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
                </form>
            </div>
        </div>
        </div>
    );
}

export default Signup;
