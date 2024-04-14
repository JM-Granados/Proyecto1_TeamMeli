import React, { useState } from 'react'
import './NavBar.css'
import './DropDownSettings'

import Search_icon from '../assets/Search.png'
import Settings_icon from '../assets/Settings.png'
import User_icon from '../assets/User.png'
import DropDownSettings from './DropDownSettings'

const NavBar = () => {
    const [openSettings, setOpenSettings] = useState(false);

    return (
        <div className='navbar'>
            <div className="nav-settings">
                <img src={Settings_icon} alt="Settings" onClick={() => setOpenSettings((prev) => !prev)}/>
                {
                    openSettings && <DropDownSettings />
                }
            </div>
            
            <div className="nav-search">
            <img src={Search_icon} alt="" />
            </div>

            <div className="nav-user">
            <img src={User_icon} alt="" />
            </div>
        </div>
    )
}


export default NavBar;

