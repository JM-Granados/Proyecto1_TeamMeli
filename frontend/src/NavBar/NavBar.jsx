import React, { useState, useEffect } from 'react';
import './NavBar.css'
import { useNavigate } from 'react-router-dom';
import Search_icon from '../assets/Search.png'
import Settings_icon from '../assets/Settings.png'
import User_icon from '../assets/User.png'
import Home_icon from '../assets/casa.png'

const NavBar = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    const [openSettings, setOpenSettings] = useState(false);
    const [openUser, setOpenUser] = useState(false);
    const [usernameEmail, setUsername] = useState();
    const [errorMessage, setErrorMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [searchResults, setSearchResults] = useState(null);

    const navigate = useNavigate();

    
    const getImageUrl = (avatar) => {
        return avatar ? `http://localhost:4000/user-images/${avatar}` : `http://localhost:4000/user-images/User.png`;
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
        <div className='navbar'>
            <div className="settings-open" style={{ display:'flex', alignItems: 'center'}}>
                <img 
                    src={Settings_icon} 
                    alt="Open settings" 
                    onClick={() => setOpenSettings((prev) => !prev)}
                    style={{marginRight:'18px'}}
                />
                {
                    openSettings && (
                    <div className="settings-dropdown">
                        <a href="/MyDataSets" className="setting-item">My DataSets</a>
                        <a href="/MyVotes" className="setting-item">My Votes</a>
                        <a href="/DataSetsNotis" className="setting-item">Datasets notifications</a>
                    </div>)
                }

                <a href="/Home" className='home-back'>
                    <img src={Home_icon} alt="home"/>                
                </a>
            </div>
            
            
            <div style={{ alignItems: 'center'}}>
                <form class="d-flex" role="search" >
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
            

            <div className="perfil-open">
                
                {/* <img src={getImageUrl(user.avatar)} alt="Open perfil" onClick={() => setOpenUser((prev) => !prev)} style={{ width: '35px', height: '35px', objectFit: 'cover', borderRadius: '50%' }}/>
                {
                    openUser && (
                    <div className="perfil-dropdown">
                        <a href="/UserConf" className="perfil-item">Profile settings</a>
                        <a href="/Dm" className="perfil-item">Direct message</a>
                        <a href="/" className="perfil-item">Close session</a>
                    </div>)
                } */}
            </div>
        </div>
    )
}


export default NavBar;

