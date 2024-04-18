import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';

import AddButton from '../assets/AddButton.png'

function Home() {
    const user = JSON.parse(localStorage.getItem('user')); 

    return (
        <div>
            <NavBar/>
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
        </div>
    )
}

export default Home;
