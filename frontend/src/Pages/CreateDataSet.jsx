import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import './CreateDataSet.css'

function CreateDataSet() {
    const [dataset_author, setDatasetAuthor] = useState('');
    const [dataset_createdDate, setDatasetCreatedDate] = useState('');
    const [dataset_name, setDatasetName] = useState('');
    const [dataset_description, setDatasetDescription] = useState('');
    const [dataset_photo, setDatasetPhoto] = useState(null);
    const [dataset_archive, setDatasetArchive] = useState([]);
    const [dataset_tutorial, setDatasetTutorial] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const activeUser = JSON.parse(localStorage.getItem('user'));

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        setDatasetCreatedDate(Date.now());
        // //setDatasetAuthor(activeUser.firstName + ' '+ activeUser.secondName + ' '+activeUser.firstLastName + ' '+activeUser.secondLastName);
        setDatasetAuthor("PERSONA RANDOM")

        const newDataSet = {
            dataset_author: dataset_author,
            dataset_createdDate: dataset_createdDate,
            dataset_name: dataset_name,
            dataset_description: dataset_description,
            dataset_photo: {
                name: dataset_photo.name,
                type: dataset_photo.type,
                path: dataset_photo.webkitRelativePath
            },
            dataset_archive: dataset_archive.map(file => ({
                archive_name: file.name,
                archive_type: file.type,
                archive_path: file.webkitRelativePath
            })),
            dataset_tutorial: {
                name: dataset_tutorial.name,
                type: dataset_tutorial.type,
                path: dataset_tutorial.webkitRelativePath
            },
            dataset_comments: []
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
            <div className="CreateDataSet">
                <header>
                    <h1>Create Data Set</h1>
                </header>
                <form onSubmit={handleSubmit}>
                    <section className="infolabels">
                        <ul>
                            <li><span>Name</span></li>
                            <li><span>Description</span></li>
                            <li><span>Photo</span></li>
                            <li><span>Archives</span></li>
                            <li><span>Tutorial</span></li>
                        </ul>
                    </section>

                    <aside className="infoinput">
                        <ul>
                            <li>
                                <input
                                    type="text"
                                    placeholder="Name of your dataset"
                                    autoComplete="off"
                                    name="datasetName"
                                    className="form-control rounded-0"
                                    onChange={(e) => setDatasetName(e.target.value)}
                                />
                            </li>
                            <li>
                                <input
                                    type="text"
                                    placeholder="Description of your dataset"
                                    autoComplete="off"
                                    name="datasetDescription"
                                    className="form-control rounded-0"
                                    onChange={(e) => setDatasetDescription(e.target.value)}
                                />
                            </li>
                            <li>
                                <label htmlFor="avatarInput" className="folderButton">
                                    <img src="assets/archive.svg" alt="Select archive" />
                                    photo
                                    <input
                                        type="file"
                                        id="avatarInput"
                                        accept="image/png, image/jpeg, image/jpg"
                                        onChange={(e) => {
                                            const fileName = e.target.files[0].name; // Obtén el nombre del archivo seleccionado
                                            setDatasetPhoto(e.target.files[0]);
                                            document.getElementById("avatarPath").innerText = fileName; // Actualiza el contenido del elemento con el nombre del archivo
                                        }}
                                    />
                                </label>
                                <span id="avatarPath"></span> {/* Aquí mostrarás la ruta del archivo */}
                            </li>
                            <li>
                                <label htmlFor="archiveInput" className="folderButton">
                                    <img src="assets/archive.svg" alt="Select archive" /> archive
                                    <input
                                        type="file"
                                        id="archiveInput"
                                        accept="*"
                                        multiple
                                        onChange={(e) => setDatasetArchive(Array.from(e.target.files))}
                                    />
                                </label>
                                {dataset_archive.length > 0 && (
                                    <span>{dataset_archive.map(file => file.name).join(', ')}</span>
                                )}
                            </li>
                            <li>
                                <label htmlFor="videoInput" className="folderButton">
                                    <img src="../assets/archive.svg" alt="Select video" /> video
                                    <input
                                        type="file"
                                        id="videoInput"
                                        accept="video/*"
                                        onChange={(e) => setDatasetTutorial(e.target.files[0])}
                                    />
                                </label>
                                <div className="show-vid">
                                    {dataset_tutorial && (
                                        <video controls>
                                            <source src={URL.createObjectURL(dataset_tutorial)} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    )}
                                </div>

                            </li>
                        </ul>
                    </aside>

                    <div className="createButton">
                        <button type="submit">Create Data Set</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateDataSet;
