import React, { useState } from 'react'
import './NavBar.css'

import Search_icon from '../assets/Search.png'
import Settings_icon from '../assets/Settings.png'
import User_icon from '../assets/User.png'
import Home_icon from '../assets/casa.png'

const NavBar = () => {
    const [openSettings, setOpenSettings] = useState(false);
    const [openUser, setOpenUser] = useState(false);

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
            
            
            <div className="search">
            <img src={Search_icon} alt="" />
            </div>

            <div className="perfil-open">
                <img src={User_icon} alt="Open perfil" onClick={() => setOpenUser((prev) => !prev)}/>
                {
                    openUser && (
                    <div className="perfil-dropdown">
                        <a href="/UserConf" className="perfil-item">Profile settings</a>
                        <a href="/Dm" className="perfil-item">Direct message</a>
                    </div>)
                }
            </div>
        </div>
    )
}


export default NavBar;

