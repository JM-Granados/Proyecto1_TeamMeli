import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import './MyVotes.css'

function MyVotes() {
    return (
        <div className="nav-container">
            <NavBar />
            <div className="MyVotes">
                <header>
                    <h1>My voted Data sets</h1>
                </header>
            </div>
        </div>
    )
}

export default MyVotes;