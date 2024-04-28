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

    const navigate = useNavigate()    
    
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                /**TRAE LOS USERS QUE SIGO EN NEO ->USERNAME*/
                const response = await axios.get(`http://localhost:4000/api/users/following/${user.username}`);
                console.log(response.data.user);
                if(response.data.message === "Success") {
                    setUsers(response.data.user);
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

    const handleDmClick = (user) => {
        // Guarda la información del usuario en localStorage
        localStorage.setItem('selectedUser', JSON.stringify(user));

        // Redirige a la página "/OtherUserAcc"
        navigate('/Dm')
    };

    const handleViewClick = (user) => {
        // Guarda la información del usuario en localStorage
        localStorage.setItem('selectedUser', JSON.stringify(user));

        // Redirige a la página "/OtherUserAcc"
        navigate('/OtherUserAcc')
    };


    const getImageUrl = (avatar) => {
        return avatar ? `http://localhost:4000/user-images/${avatar}` : `http://localhost:4000/user-images/User.png`;
    };

    return (
        <div>
            <NavBar />
            {users.length > 0 ? 
                <table className="table table-striped table-borderless" style={{
                    maxWidth: '80%', 
                    margin: 'auto',
                    marginTop: '20px',
                    backgroundColor: '#fff', // Color de fondo sólido
                    borderRadius: '0.50rem', // Aplica el border-radius aquí
                    overflow: 'hidden', // Asegúrate de que los contenidos internos no sobresalgan
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
                }}>
            
                    <thead>
                        <tr>
                            <th scope="col" style={{
                                fontSize: '1.5em', // Aumenta el tamaño del texto
                                padding: '10px 0', // Añade más espacio verticalmente
                                textAlign: 'center', // Centrar el texto horizontalmente
                                lineHeight: 'normal'
                            }}>Following</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user.idUser}>
                                <th scope="row" style={{ width: '150px' }} className="align-middle">
                                    <img src={getImageUrl(user.avatar)} className="card-img-top rounded-circle" alt="Avatar" style={{ width: '75px', height: '75px', objectFit: 'cover', borderRadius: '50%' }}/>
                                </th>
                                <td className="align-middle">{user.username}</td>
                                <td className="align-middle"><button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => handleDmClick(user)}>
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

                                <td className="align-middle"><button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => handleViewClick(user)}>
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
            : 
                <div style={{
                    textAlign: 'center',
                    marginTop: '20px'
                }}>
                    <h2>No Following Users Found</h2>
                </div>
            }
        </div>
    )
}

export default Home;
