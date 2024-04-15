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
            <a href="#" class="settings-open">
                <img src={Settings_icon} alt="Open settings" />
            </a>
            <ul>
                <li>
                    <li><a href="/MyDataSets">My DataSets</a></li>
                </li>
            </ul>
            {/*<div className="nav-settings">
                <img src={Settings_icon} alt="Settings" onClick={() => setOpenSettings((prev) => !prev)}/>
                {/*openSettings && <DropDownSettings />
                <ul>
                    <li>
                        <a href="/MyDataSets" class=""></a>
                    </li>
                    <li></li>
                    <li></li>
                </ul>

            </div>
            
            <div className="nav-search">
            <img src={Search_icon} alt="" />
            </div>

            <div className="nav-user">
            <img src={User_icon} alt="" />
            </div>*/}
        </div>
    )
}


export default NavBar;

