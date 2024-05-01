import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

import Search_icon from '../assets/Search.png'
import Settings_icon from '../assets/Settings.png'
import User_icon from '../assets/User.png'
import Home_icon from '../assets/casa.png'
import AddButton from '../assets/AddButton.png'

import 'bootstrap/dist/css/bootstrap.min.css';

import { Nav, Navbar, NavDropdown, Form, FormControl, Button, Collapse } from 'react-bootstrap';

const NavComponent = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    const [usernameEmail, setUsername] = useState();
    const [errorMessage, setErrorMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [searchResults, setSearchResults] = useState(null);
    const [open, setOpen] = React.useState(false);
    const [users, setUsers] = useState([]);
    const [notis, setNotis] = useState(null);

    const navigate = useNavigate()   

    
    const getImageUrl = (avatar) => {
        return avatar ? `http://localhost:4000/user-images/${avatar}` : `http://localhost:4000/user-images/User.png`;
    };


    const handleNotis = async () => {
        setOpen(!open);
        try {
            /**TRAE LOS USERS QUE SIGO EN NEO ->USERNAME*/
            const response = await axios.get(`http://localhost:4000/api/users/following/${user.username}`);
            console.log(response.data.user);
            if(response.data.message === "Success") {
                setUsers(response.data.user);
                // Obtener notificaciones para cada usuario
                const notificationsPromises = response.data.user.map(user =>
                    axios.get(`http://localhost:4000/api/messages/getNotifications/${user.username}`)
                );

                // Esperar todas las respuestas de notificaciones
                const notificationsResponses = await Promise.all(notificationsPromises);
                
                const allNotifications = notificationsResponses.flatMap(response => response.data);
                
                console.log(allNotifications);
                
                const sortedNotifications = allNotifications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                
                console.log("hola array")
                console.log(sortedNotifications);

                
                setNotis(sortedNotifications);
            } else {
                setErrorMessage('No users found');
            }
        } catch (err) {
            setErrorMessage(err.response?.data.error || 'An error occurred while fetching users.');
        }
    };

    useEffect(() => {
        // Agrega el listener cuando el componente se monta
        document.addEventListener('click', handlePageClick);
    
        // Limpieza del evento
        return () => {
            document.removeEventListener('click', handlePageClick);
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setTimeout(() => setShowToast(false), 3000);


        console.log(usernameEmail);
        try {
            const result = await axios.get(`http://localhost:4000/api/users/username/${usernameEmail}`);
            console.log(result.data.message);
            if (result.data.message === "User exist") {
                const user = result.data.user;
                const username = user.username;
                const avatar = user.avatar;
                setSearchResults(user);                
            } else {
                toast.error('Unexpected response from the server.');
                setErrorMessage('Unexpected response from the server.');
            }
        } catch (err) {
            const errorMessage = err.response?.data.error || 'An error occurred while creating the user.';
            setErrorMessage(errorMessage); // programa la actualización del estado
            toast.error(errorMessage); // muestra el toast inmediatamente con el mensaje correcto
        }
    }

    const handleInputChange = (e) => {
        const value = e.target.value;
        setUsername(value);
        if (value.trim() === '') {
            setSearchResults(null);
        }
    };

    const handlePageClick = (event) => {
        // Asegúrate de que el clic no ocurrió dentro del contenedor de búsqueda
        if (!event.target.closest('.search-results') && !event.target.closest('.form-control')) {
            setSearchResults(null);
        }
    };


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

    return (
        <>
            <ToastContainer />
            <Navbar bg="light" expand="lg">
                <div className="perfil-open" style={{ display:'flex', alignItems: 'center', marginRight: '10px'}}>
                        <img src={getImageUrl(user.avatar)} alt="Open perfil" style={{ width: '35px', height: '35px', objectFit: 'cover', borderRadius: '50%' }}/>
                </div>
                <Navbar.Brand href="/Home">DataHub</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Profile" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/Dm">Direct Message</NavDropdown.Item>
                            <NavDropdown.Item href="/UserConf">User configuration</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/">Close session</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="DataSets" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/MyDataSets">My Datasets</NavDropdown.Item>
                            <NavDropdown.Item href="/MyVotes">My Votes</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="/CreateDataSet">New DataSet</Nav.Link>
                        <Nav.Link 
                            onClick={() => handleNotis()}
                            aria-expanded={open}
                        >
                            Notifications
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                    <div style={{ position: 'relative' }}>
                        <Nav className="me-auto">
                            <Form className="d-flex" onSubmit={handleSubmit}>
                                <FormControl
                                    type="search"
                                    placeholder="Search users by username or datasets by name or description"
                                    className="me-2"
                                    aria-label="Search"
                                    style={{ width: '500px' }}
                                    onChange={handleInputChange}
                                />
                                <Button variant="outline-success" type="submit">Search</Button>
                            </Form>
                        </Nav>
                        <div style={{ position: 'relative' }}>
                        <form class="d-flex" role="search" onSubmit={handleSubmit}>
                            
                            <style>
                                {`
                                    @keyframes fadeInOut {
                                        0%, 100% {
                                            opacity: 0;
                                            transform: translateY(100%);
                                        }
                                        10%, 90% {
                                            opacity: 1;
                                            transform: translateY(0);
                                        }
                                    }
                                    `}
                            </style>
                            <div style={{
                                    position: 'fixed',
                                    bottom: '20px',
                                    right: '20px',
                                    backgroundColor: 'rgba(200, 0, 0, 0.85)',
                                    color: 'white',
                                    padding: '10px',
                                    borderRadius: '5px',
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                    animation: 'fadeInOut 3s forwards'
                                }}>
                                {errorMessage}
                            </div>
                        </form>
                    </div>
                </div>
                {searchResults && (
                    <div style={{ 
                        position: 'absolute', 
                        top: '100%', 
                        left: '80px', 
                        right: '-490px', 
                        zIndex: '1050px',
                        maxWidth: '500px', 
                        margin: 'auto', 
                        padding: '4px',
                        height: '130px',
                        backgroundColor: '#fff', // Color de fondo sólido
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)', 
                        marginTop: '0.10rem', 
                        borderRadius: '1rem',
                        border: '1px solid #ccc',
                        boxSizing: 'border-box'}}> 
                        <table className="table table-striped table-borderless">
                            <thead>
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">
                                        <img src={getImageUrl(searchResults.avatar)} className="rounded-circle" alt="Avatar" style={{ width: '75px', height: '75px' }}/>
                                    </th>
                                    <td className="align-middle">{searchResults.username}</td>
                                    <td className="align-middle"><button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => handleDmClick(searchResults)}>
                                        Direct message
                                            </button>
                                        </td>
                                        <td className="align-middle"><button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => handleViewClick(searchResults)}>
                                            View 
                                        </button>
                                    </td>
                                    </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </Navbar>
            <Collapse in={open} style={{ 
                                        position: 'absolute', 
                                        top: '7%', 
                                        left: '0px', 
                                        right: '900px', 
                                        zIndex: '1050px',
                                        maxWidth: '500px', 
                                        margin: 'auto', 
                                        maxHeight: '300px', // Limita la altura máxima
                                        overflowY: 'auto', // Permite scroll
                                        backgroundColor: '#fff', 
                                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)', 
                                        marginTop: '0.10rem', 
                                        borderRadius: '1rem',
                                        border: '1px solid #ccc',
                                        boxSizing: 'border-box',
                                        padding: '10px'}}>
                <div id="example-collapse-text" className="card card-body" style={{ fontSize: '12px', fontWeight: '300' }}> {/* Ajusta el tamaño y el grosor de la letra globalmente para la tarjeta */}
                    {notis ? (
                        notis.map((chat, index) => (
                            <div key={chat.id || index}>
                                <div style={{ marginBottom: '5px' }}> {/* Añade espacio entre notificaciones */}
                                    <span style={{ fontWeight: '400' }}>{chat.text}</span>
                                    <br />
                                    <span style={{ color: '#6c757d' }}>{new Date(chat.createdAt).toLocaleString()}</span>
                                </div>
                                <hr style={{
                                    width: "100%",
                                    border: "1px solid #eee", // Hace la línea más sutil
                                    margin: "5px 0" // Espacio sobre y bajo el separador
                                }} />
                            </div>
                        ))
                    ) : (
                        <span>
                            No notifications...
                        </span>
                    )}
                </div>
            </Collapse>
        </>
    );
};

export default NavComponent;