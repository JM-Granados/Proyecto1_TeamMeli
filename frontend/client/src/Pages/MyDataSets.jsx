import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './MyDataSets.css'

function MyDataSets() {
    return (
        <div className="MyVotes">
            <header>
                <h1>My Data Sets</h1>
            </header>
        </div>
    )
}

export default MyDataSets;