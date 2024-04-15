import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './MyVotes.css'

function MyVotes() {
    return (
        <div className="MyVotes">
            <header>
                <h1>My voted Data sets</h1>
            </header>
        </div>
    )
}

export default MyVotes;