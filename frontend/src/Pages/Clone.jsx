
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import './Clone.css'

function Clone() {
    const selectedDataSet = JSON.parse(localStorage.getItem('dataset'));
    const [dataset_author, setDatasetAuthor] = useState('');
    const [dataset_name, setDatasetName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [dataset_createdDate, setDatasetCreatedDate] = useState('');

    //console.log(selectedDataSet.tutorial)


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        setDatasetCreatedDate(Date.now());
        // //setDatasetAuthor(activeUser.firstName + ' '+ activeUser.secondName + ' '+activeUser.firstLastName + ' '+activeUser.secondLastName);
        setDatasetAuthor("PERSONA RANDOM")

        const newDataSet = {
            dataset_author: selectedDataSet.author,
            dataset_createdDate: selectedDataSet.createdDate,
            dataset_name: dataset_name,
            dataset_description: selectedDataSet.description,
            dataset_photo: selectedDataSet.photo,
            dataset_archive: selectedDataSet.archives.map(file => ({
                archive_name: file.name,
                archive_type: file.type,
                archive_path: file.webkitRelativePath
            })),
            dataset_tutorial: selectedDataSet.tutorial,
            dataset_comments: selectedDataSet.comments,
            ddataset_createdDate: dataset_createdDate
        };

        console.log(newDataSet)
        try {
            const res = await axios.post("http://localhost:4000/api/datasets", newDataSet);
            console.log(res);
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
                        <img src="ruta-de-tu-imagen.jpg" alt="" />
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
                                            <p>Name: {archive.archive_name}</p>
                                            {/* <p>Type: {archive.archive_type}</p>
        <p>Path: {archive.archive_path}</p> */}
                                        </li>
                                    ))}

                                </ul>
                            </div>
                        </li>
                        <li>
                            <div className="container">
                                <span>Tutorial</span>
                                <p>{selectedDataSet.tutorial.name}</p>
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