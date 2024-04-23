import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';

import AddButton from '../assets/AddButton.png'
import User_icon from '../assets/User.png'

function Home() {
    const user = JSON.parse(localStorage.getItem('user'));

    const [users, setUsers] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    
    
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/users");
                if(response.data.message === "Success") {
                    setUsers(response.data.users);
                } else {
                    setErrorMessage('No users found');
                }
            } catch (err) {
                setErrorMessage(err.response?.data.error || 'An error occurred while fetching users.');
            }
        };

        fetchUsers(); // Llamar a la función al montar el componente
    }, []);


    const getImageUrl = (avatar) => {
        return avatar ? `http://localhost:4000/user-images/${avatar}` : `http://localhost:4000/user-images/User.png`;
    };

    return (
        <div>
            <NavBar />
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
                            <th scope="row" style={{ width: '150px' }} className="align-middle">
                                <img src={getImageUrl(user.avatar)} className="card-img-top rounded-circle" alt="Avatar" style={{ width: '75px', height: '75px', objectFit: 'cover', borderRadius: '50%' }}/>
                            </th>
                            <td className="align-middle">{user.username}</td>
                            <td className="align-middle"><button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
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

                            <td className="align-middle"><button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
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
