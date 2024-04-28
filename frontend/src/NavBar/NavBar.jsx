import React, { useState } from 'react'
import './NavBar.css'

import Search_icon from '../assets/Search.png'
import Settings_icon from '../assets/Settings.png'
import User_icon from '../assets/User.png'
import Home_icon from '../assets/casa.png'

const NavBar = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    const [openSettings, setOpenSettings] = useState(false);
    const [openUser, setOpenUser] = useState(false);

    
    const getImageUrl = (avatar) => {
        return avatar ? `http://localhost:4000/user-images/${avatar}` : `http://localhost:4000/user-images/User.png`;
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

