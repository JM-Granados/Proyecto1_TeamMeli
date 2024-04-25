import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';

import User_icon from '../assets/User.png'

function UserConf() {
    const user = JSON.parse(localStorage.getItem('user'));

    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('');

    const getImageUrl = (avatar) => {
        return avatar ? `http://localhost:4000/user-images/${avatar}` : `http://localhost:4000/user-images/User.png`;
    };

    const [firstName, setFirstName] = useState()
    const [secondName, setSecondName] = useState()
    const [firstLastname, setFirstLastName] = useState()
    const [secondLastName, setSecondLastName] = useState()
    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [password, setCurrentPassword] = useState()
    const [newPassword, setNewPassword] = useState()
    const [passwordConf, setPasswordConf] = useState()
    const [avatar, setavatar] = useState()

    const [isPasswordValid, setIsPasswordValid] = useState();
    const [passwordError, setPasswordError] = useState();

    const usernameEmail = user.username;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        const updatedFields = {};

        let endpoint = `http://localhost:4000/api/users/update/${usernameEmail}`

        if (firstName && firstName !== user.firstName) updatedFields.firstName = firstName; 
        if (secondName && secondName !== user.secondName) updatedFields.secondName = secondName;
        if (firstLastname && firstLastname !== user.firstLastname) updatedFields.firstLastname = firstLastname;
        if (secondLastName && secondLastName !== user.secondLastName) updatedFields.secondLastName = secondLastName;
        if (username && username !== user.username) updatedFields.username = username;
        if (email && email !== user.email) updatedFields.email = email;
        if (avatar && avatar !== user.avatar) {
            updatedFields.avatar = avatar;
            endpoint = `http://localhost:4000/api/users/updateWithAvatar/${usernameEmail}`;
        }
        if (newPassword && newPassword === passwordConf && password) {
            try {
                const response = await axios.post(`http://localhost:4000/api/users/username/${usernameEmail}`, { usernameEmail , password })
                if(response.data.message === "User exist and password is correct") {
                    updatedFields.password = newPassword;
                }
            } catch {
                setErrorMessage('Wrong current password.');
            }
        }

        const formData = new FormData();
        
        Object.keys(updatedFields).forEach(key => {
            formData.append(key, updatedFields[key]);
        });

        try {
            const result = await axios.post(endpoint, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (result.data.message === "User updated") {
                const updatedUserData = { ...user, ...result.data.user};
                
                localStorage.setItem('user', JSON.stringify(updatedUserData));

                setFirstName(updatedUserData.firstName || '');
                setSecondName(updatedUserData.secondName || '');
                setFirstLastName(updatedUserData.firstLastname || '');
                setSecondLastName(updatedUserData.secondLastName || '');
                setUsername(updatedUserData.username || '');
                setEmail(updatedUserData.email || '');
                setCurrentPassword(updatedUserData.password || ''); // Limpiar contraseña por seguridad
                setNewPassword('');
                setPasswordConf('');
                setavatar(updatedUserData.avatar || null); 

                navigate('/UserConf')

                window.location.reload();
            } else {
                setErrorMessage('Unexpected response from the server. ');
            }
        } catch (error) {
            setErrorMessage('An error ocurred while updating the user.')
        }
    };
    

    const handlePasswordChange = (e) => {
        const inputPassword = e.target.value;
        setCurrentPassword(inputPassword);
    
        // Validación básica de la contraseña aquí
        // Por ejemplo, verifica si la contraseña no está vacía
        if (!inputPassword) {
            setIsPasswordValid(false);
            setPasswordError('Password cannot be empty');
        } else {
            // Si tienes otros requisitos, colócalos aquí
            setIsPasswordValid(true);
            setPasswordError('');
        }
    };   

    return (
        <div>
            <NavBar/>
            <div className = "bg-white p-5 rounded">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img 
                    src={getImageUrl(user.avatar)} 
                    alt="User profile"
                    style={{
                    width: "150px",
                    marginRight: "0px", // Añade espacio a la derecha de la imagen
                    display: 'block', // Asegura que la imagen no tenga espacio extra debajo
                    objectFit: 'cover', 
                    borderRadius: '50%' 
                    }}
                />
                <h2 style={{ margin: 50 }}>Profile settings</h2>
                <p></p>
                </div>

                <form onSubmit={handleSubmit}>
                    <p></p>
                    <div className="mb-3">
                        <label htmlFor="FirstName*">
                            <strong>First name (current: {user.firstName})</strong>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter new first name "
                            autoComplete="off"
                            name="FirstName"
                            className="form-control rounded-0"
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="SecondName*">
                            <strong>Second name (current: {user.secondName})</strong>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter new second name "
                            autoComplete="off"
                            name="SecondName"
                            className="form-control rounded-0"
                            onChange={(e) => setSecondName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="FirstLastName*">
                            <strong>First last name (current: {user.firstLastname})</strong>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter new first last name "
                            autoComplete="off"
                            name="Name"
                            className="form-control rounded-0"
                            onChange={(e) => setFirstLastName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="SecondLastName*">
                            <strong>Second last name (current: {user.secondLastName})</strong>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter new second last Name "
                            autoComplete="off"
                            name="SecondLastName"
                            className="form-control rounded-0"
                            onChange={(e) => setSecondLastName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="UserName">
                            <strong>Username (current: {user.username})</strong>
                        </label>
                        <input
                            type="text"
                            placeholder= 'Enter new username'
                            autoComplete="off"
                            name="username"
                            className="form-control rounded-0"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Email">
                            <strong>Email (current: {user.email})</strong>
                        </label>
                        <input
                            type="text"
                            placeholder='Enter new email'
                            autoComplete="off"
                            name="Email"
                            className="form-control rounded-0"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="Password">
                            <strong>Password </strong>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter current password  "
                            name="password"
                            className='form-control rounded-0'
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                        <p></p>
                        <input
                            type="password"
                            placeholder="Enter the new password "
                            name="password"
                            className="form-control rounded-0"
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <p></p>
                        <input
                            type="password"
                            placeholder="Confirm the new password "
                            name="password"
                            className="form-control rounded-0"
                            onChange={(e) => setPasswordConf(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="User photo or avatar">
                            <strong>User photo or avatar</strong>
                        </label>
                        <input
                            type="file"
                            autoComplete="off"
                            name="User photo or avatar"
                            className="form-control rounded-0"
                            accept="image/png, image/jpeg, image/jpg"
                            onChange={(e) => setavatar(e.target.files[0])}
                        />
                    </div>
                    <p></p>
                    {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
                    <p></p>
                    <button type="submit" className="btn btn-success w-100 rounded-10">
                        Update account
                    </button>
                </form>
            </div>
        </div>
    )
}

export default UserConf;