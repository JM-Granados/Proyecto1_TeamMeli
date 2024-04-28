import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AddButton from '../assets/Add User.png'
import AddedButton from '../assets/Added User.png'
import Chat from '../assets/Message.png'

function OtherUserAcc() {
    const user = JSON.parse(localStorage.getItem('selectedUser'));

    const currentUser = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate()

    /** dETERMINA EL ESTADO DE LA IMAGEN
     * ISVOTED, SESTISVOTED
    */
    const [isFollowing, setIsFollowing] = useState(false);
    const [contentWidth, setContentWidth] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [searchResults, setSearchResults] = useState(null);
    const textRef = useRef(null);

    const followerUsername = currentUser.username;
    const followedUsername = user.username;

    useEffect(() => {
        checkFollowStatus();
        if (textRef.current) {
            setContentWidth(textRef.current.offsetWidth);
        }
    }, [user.username]);

    /**
     *  CAMBIA SI ISFOLLOWING CAMBIA
     */
    useEffect(() => {
        console.log("El estado isFollowing ha cambiado a:", isFollowing);
        // Aquí puedes realizar más acciones que dependan del nuevo valor de isFollowing.
    }, [isFollowing]);
    
    /**
     * VA A NEO VA VER AL SEGUIDO Y SEGUIDO
     */
    const checkFollowStatus = async () => {
        try {
            // Sustituye 'checkFollowStatusEndpoint' con la ruta correcta de tu API
            const result = await axios.post('http://localhost:4000/api/relations/checkFollow', { followerUsername, followedUsername });
            setIsFollowing(result.data.message.message === "Is following");
        } catch (error) {
            console.error('Error al verificar el estado de seguimiento', error);
        }
    };

    const getImageUrl = (avatar) => {
        return avatar ? `http://localhost:4000/user-images/${avatar}` : `http://localhost:4000/user-images/User.png`;
    };

    const followUser = async () => {
        const followerUsername = currentUser.username; // Deberías obtener esto de la autenticación o estado de la app
        const followedUsername = user.username;
        /**
         * ESTADO ACTUAL DE LA IMAGEN FOLLOW EN CADA CLICK
         * AQUI TAMBIEN VA LA BITACORA DE NOTIFICACIONES CUANDO LO CREA/MATA EN NEO LO ALMACENA EN MONGO
         */
        try {
            const check = await axios.post('http://localhost:4000/api/relations/checkFollow', { followerUsername, followedUsername });
            if(check.data.message.message === "Is following") {
                const response = await axios.post('http://localhost:4000/api/relations/deleteRelation', { followerUsername, followedUsername });
                console.log(response)
                if (response.data.message === "Relation deleted") {
                    setIsFollowing(false);
                    
                } else {
                    setErrorMessage('Cant follow this user.');
                }
                console.log(isFollowing);
            } else {
                /**CRERA LA REALCION DEL FOLLOW */
                const response = await axios.post('http://localhost:4000/api/relations/createRelation', { followerUsername, followedUsername });
                console.log(response)
                if (response.data.message === "Relation created") {
                    setIsFollowing(true);
                } else {
                    setErrorMessage('Cant follow this user.');
                }
                console.log(isFollowing);
            }
            
        } catch (error) {
            const errorMessage = err.response?.data.error || 'An error occurred while creating the user.';
            setErrorMessage(errorMessage); // programa la actualización del estado
        }
    };
    console.log(isFollowing);

    return (
        <div>
            <NavBar/>
            <div className = "bg-white p-5 rounded">
            <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                width:  contentWidth + 400,
                padding: '10px',
                backgroundColor: '#fff', // Color de fondo sólido
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)', 
                marginTop: '0.50rem', 
                borderRadius: '1rem',
                boxSizing: 'border-box',
                border: '1px solid #ccc' 
            }}>
                <img 
                    src={getImageUrl(user.avatar)} 
                    alt="Other user profile"
                    style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: '50%' 
                    }}
                />
                <h2 ref={textRef} style={{ 
                        margin: '0 10px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}>
                        {user.username}
                </h2>
                <div style={{
                        display: 'flex',
                        flexShrink: 0,
                    }}>
                        <button onClick={followUser} style={{ background: 'none', border: 'none' }}>
                            <img
                                src={isFollowing ? AddedButton : AddButton}
                                alt={isFollowing ? "Unfollow User" : "Follow User"}
                                style={{
                                    width: '50px', 
                                    height: 'auto',
                                    margin: '0 10px'
                                }}
                            />
                        </button>
                    <a href="/Dm">
                        <img
                            src={Chat}
                            alt="Descripción de la imagen"
                            style={{
                                width: '50px', 
                                height: 'auto',
                                margin: '0 10px'
                            }}
                        />
                    </a>
                </div>
            </div>
            </div>      
        </div>
    )
}

export default OtherUserAcc;