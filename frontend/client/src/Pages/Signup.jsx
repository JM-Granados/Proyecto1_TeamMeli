import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [name, setName] = useState()
    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [birthdate, setBirthdate] = useState()
    const [avatar, setavatar] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        /*axios.post('url de base', {name, username, email, password, birthdate, avatar})
        .then(result => {console.log(result)
            navigate('/')
        })
        .catch(err=> console.log(err))*/
    }

    return (
        <div>
            <div className = "d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className = "bg-white p-3 rounded w-25">
                <h2>First, let's create your user account </h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="Name*">
                            <strong>Name*</strong>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Name "
                            autoComplete="off"
                            name="Name"
                            className="form-control rounded-0"
                            onChange={(e) => setName(e.target.value)}
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
                            onChange={(e) => setAvatar(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Create account
                    </button>
                </form>
            </div>
        </div>
        </div>
    );
}

export default Signup;