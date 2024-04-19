import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';

import AddButton from '../assets/AddButton.png'

function Home() {
    const user = JSON.parse(localStorage.getItem('user'));

    const [users, setUsers] = useState([]);
    const [userr, setUser] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/users");
                if(response.data.message === "Success") {
                    const usersWithAvatars = await Promise.all(response.data.users.map(async (user) => {
                        const avatarURL = await createImageURLFromBuffer(user.avatar.data);
                        return { ...user, avatarURL};
                    }));
                    setUsers(usersWithAvatars);
                } else {
                    setErrorMessage('No users found');
                }
            } catch (err) {
                setErrorMessage(err.response?.data.error || 'An error occurred while fetching users.');
            }
        };
        
        fetchUsers(); // Llamar a la función al montar el componente
    }, []);
    
    console.log(users);
    const bufferToBlob = (bufferArray) => {
        // Convertimos el array de buffer que recibimos a un Uint8Array
        const uint8Array = new Uint8Array(bufferArray);
        // Creamos el Blob a partir del Uint8Array
        return new Blob([uint8Array]);
    };

    const createImageURLFromBuffer = (bufferArray) => {
        return new Promise((resolve, reject) => {
            if (bufferArray) {
                const blob = bufferToBlob(bufferArray); // Convertimos el Buffer a Blob
                const reader = new FileReader();
                reader.onload = (e) => {
                    resolve(e.target.result); // e.target.result contiene el Data URL
                };
                reader.onerror = (e) => {
                    reject(new Error('Error reading buffer'));
                };
                reader.readAsDataURL(blob);
            } else {
                resolve(null);
            }
        });
    };



    return (
        <div>
            <NavBar/>
            <a href="/CreateDataSet" className='home-back'>
                <img
                    src={AddButton}
                    alt="Descripción de la imagen"
                    style={{
                        position: 'absolute',
                        bottom: '10px', 
                        right: '10px', 
                        width: '50px', 
                        height: 'auto' 
                    }}
                />
            </a>
            <h1>Following</h1>
            <table className="table table-striped table-borderless">
                
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.idUser}>
                            <th scope="row" style={{ width: '100px' }}>
                                <img src={user.avatar || 'defaultAvatarPath.jpg'} className="card-img-top" alt="Avatar"/>
                            </th>
                            <td>{user.username}</td>
                            <td><button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    Direct message
                                </button>

                                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                        <th className="modal-title fs-5" id="exampleModalLabel">TUKI</th>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                        </div>
                                        <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="button" className="btn btn-primary">Save changes</button>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </td>

                            <td><button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    View 
                                </button>

                                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <th className="modal-title fs-5" id="exampleModalLabel">TUKI</th>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body"></div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                <button type="button" className="btn btn-primary">Save changes</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Home;
