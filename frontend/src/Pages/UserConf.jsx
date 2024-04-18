import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';

import User_icon from '../assets/User.png'

function UserConf() {
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div>
            <NavBar/>
            <div className = "bg-white p-5 rounded">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img 
                    src={User_icon} 
                    alt="User profile"
                    style={{
                    width: "150px",
                    marginRight: "0px", // Añade espacio a la derecha de la imagen
                    display: 'block' // Asegura que la imagen no tenga espacio extra debajo
                    }}
                />
                <h2 style={{ margin: 50 }}>Profile settings</h2>
                <p></p>
                </div>

                <form>
                    <p></p>
                    <div className="mb-3">
                        <label htmlFor="Name">
                            <strong>Name</strong>
                        </label>
                        <input
                            type="text"
                            placeholder= {user.firstName}
                            autoComplete="off"
                            name="Name"
                            className="form-control rounded-0"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="UserName">
                            <strong>Username</strong>
                        </label>
                        <input
                            type="text"
                            placeholder= {user.username}
                            autoComplete="off"
                            name="username"
                            className="form-control rounded-0"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Email">
                            <strong>Email</strong>
                        </label>
                        <input
                            type="text"
                            placeholder={user.email}
                            autoComplete="off"
                            name="Email"
                            className="form-control rounded-0"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="Password">
                            <strong>Password</strong>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter current password  "
                            name="password"
                            className="form-control rounded-0"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <p></p>
                        <input
                            type="password"
                            placeholder="Enter the new password "
                            name="password"
                            className="form-control rounded-0"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <p></p>
                        <input
                            type="password"
                            placeholder="Confirm the new password "
                            name="password"
                            className="form-control rounded-0"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Birthdate">
                            <strong>Birthdate (traer desde base)</strong>
                        </label>
                        <input
                            type="date"
                            placeholder="Traer desde base "
                            autoComplete="off"
                            name="Birthdate"
                            className="form-control rounded-0"
                            max={new Date().toISOString().split('T')[0]}
                            onChange={(e) => setBirthdate(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="User photo or avatar">
                            <strong>User photo or avatar</strong>
                        </label>
                        <input
                            type="file"
                            placeholder="Traer desde base "
                            autoComplete="off"
                            name="User photo or avatar"
                            className="form-control rounded-0"
                            accept="image/png, image/jpeg, image/jpg"
                            onChange={(e) => setAvatar(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-10">
                        Update account
                    </button>
                </form>
            </div>
        </div>
    )
}

export default UserConf;