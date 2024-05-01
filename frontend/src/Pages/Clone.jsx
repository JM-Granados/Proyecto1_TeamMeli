
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import './Clone.css'

function Clone() {
    const selectedDataSet = JSON.parse(localStorage.getItem('dataset'));
    //const currentUser = JSON.parse(localStorage.getItem('user'));
    const [dataset_author, setDatasetAuthor] = useState('');
    const [dataset_name, setDatasetName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [dataset_createdDate, setDatasetCreatedDate] = useState('');

    const getImageUrl = (photo) => {
        return photo ? `http://localhost:4000/ds-archives/${photo}` : `http://localhost:4000/ds-archives/FOLDER.png`;
    };

    const getvideoURL = (video) => {
        return video ? `http://localhost:4000/ds-archives/${video}` : `http://localhost:4000/ds-archives/VIDEO.png`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        setDatasetCreatedDate(Date.now());

        const formData = {
            dataset_author: selectedDataSet.author,
            dataset_name: dataset_name,
            dataset_description: selectedDataSet.description,
            dataset_photo: selectedDataSet.photo,
            dataset_archive: selectedDataSet.archives,
            dataset_tutorial: selectedDataSet.tutorial,
            dataset_comments: selectedDataSet.comments,
            dataset_createdDate: new Date().toISOString()
        };
        
        console.log(formData)
        try {
            for (let pair of formData.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
            }

            // Make a POST request to your backend endpoint with axios
            const response = await axios.post("http://localhost:4000/api/datasets/dataset_cloned/",  formData)
            navigate('/MyDatasets');

        } catch (err) {
            if (err.response) {
                // Si hay una respuesta del servidor, muestra el mensaje de error del servidor
                setErrorMessage(err.response.data.error || 'An error ocurred while creating the user.');
            } else {
                // Si no hay respuesta del servidor, muestra un mensaje genérico de error
                setErrorMessage('An error occurred. Please try again later.');
            }
        }
        console.log('--------------------------------- OTRO INTENTO ---------------------------------')
    }

    return (
        <div className="nav-container">
            <NavBar />
            <div className="Clone">
                <header>
                    <div className="header-content">
                        <img src={getImageUrl(selectedDataSet.photo)} alt="" />
                        <h1>| My Cloned Data Set</h1>
                    </div>
                </header>
                <section className="infodataset">
                    <ul>
                        <li>
                            <div className="container">
                                <input
                                    type="text"
                                    placeholder="Name of your cloned dataset"
                                    autoComplete="off"
                                    name="datasetName"
                                    className="form-control rounded-0"
                                    onChange={(e) => setDatasetName(e.target.value)}
                                />
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
export default Clone;