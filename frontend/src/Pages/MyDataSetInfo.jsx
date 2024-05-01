import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import './MyDataSetInfo.css';

function MyDataSetInfo() {
    const selectedDataSet = JSON.parse(localStorage.getItem('dataset'));
    console.log(selectedDataSet.tutorial.name)
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('');

    const getImageUrl = (photo) => {
        return photo ? `http://localhost:4000/ds-archives/${photo}` : `http://localhost:4000/ds-archives/FOLDER.png`;
    };

    const getvideoURL = (video) => {
        return video ? `http://localhost:4000/ds-archives/${video}` : `http://localhost:4000/ds-archives/VIDEO.png`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        navigate('/Clone')
    }

    return (
        <div className="nav-container">
            <NavBar />
            <div className="MyDataSetInfo">


                <header>
                    <div className="header-content">
                        <img src={getImageUrl(selectedDataSet.photo)} alt="" />
                        <h1>| My Data Set</h1>
                    </div>
                </header>
                <section className="infodataset">
                    <ul>
                        <li>
                            <div className="container">
                                <span>Name</span>
                                <p>{selectedDataSet.name}</p>
                            </div>
                        </li>
                        <li>
                            <div className="container">
                                <span>Description</span>
                                <p>{selectedDataSet.description}</p>
                            </div>
                        </li>
                        <li>
                            <div className="container">
                                <span>Archive route</span>
                                <ul>
                                    {selectedDataSet.archives && selectedDataSet.archives.map((archive, index) => (
                                        <li key={index}>
                                            <p>Name: {archive}</p>
                                            {/* <p>Type: {archive.archive_type}</p>
        <p>Path: {archive.archive_path}</p> */}
                                        </li>
                                    ))}

                                </ul>
                            </div>
                        </li>
                        <li>
                            <span>Tutorial</span>
                            <div className="show-vid">
                                <video controls>
                                    <source src={getvideoURL(selectedDataSet.tutorial)} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        </li>
                    </ul>
                    <div className="cloneButton">
                        <button onClick={handleSubmit}>Clone</button>
                    </div>
                </section>
                <aside className="comments">
                    <h3>Comments</h3>
                    <ul>
                        {selectedDataSet.comments.map((comment, index) => (
                            <li key={index}>
                                <p> {comment.author} : {comment.content}</p>

                            </li>
                        ))}
                    </ul>
                </aside>
            </div>
        </div>
    );
}

export default MyDataSetInfo;