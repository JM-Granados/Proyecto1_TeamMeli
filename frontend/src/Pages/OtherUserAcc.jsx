import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';

import AddButton from '../assets/Add User.png'
import Chat from '../assets/Message.png'

function OtherUserAcc() {
    return (
        <div>
            <NavBar/>
            <img
                src={AddButton}
                alt="Descripción de la imagen"
                style={{
                    position: 'absolute',
                    bottom: '10px', 
                    right: '70px', 
                    width: '50px', 
                    height: 'auto' 
                }}
            />
            <a href="/Dm">
                <img
                    src={Chat}
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
        </div>
    )
}

export default OtherUserAcc;