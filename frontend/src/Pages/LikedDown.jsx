import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LikedDown.css'

function LikedDown() {
    return (
        <div className="LikedDown">
        <header>
            <h1>Liked or Downloaded Data Sets</h1>
        </header>
    </div>
    )
}

export default LikedDown;