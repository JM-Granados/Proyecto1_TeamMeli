import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';

function Home() {
    return (
        <div>
            <NavBar/>
        </div>
    )
}

export default Home;