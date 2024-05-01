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

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        // Check if required fields are filled
        if (!dataset_name || !dataset_description || !dataset_photo || dataset_archive.length === 0 || !dataset_tutorial) {
            setErrorMessage('Please fill in all required fields.');
            return;
        }

        try {
            // Create a FormData object to store form data
            const formData = new FormData();
            formData.append('dataset_author', "random");
            formData.append('dataset_createdDate', Date.now().toISOString());
            formData.append('dataset_name', dataset_name);
            formData.append('dataset_description', dataset_description);
            formData.append('dataset_photo', dataset_photo);

            // Append archive files
            dataset_archive.forEach(file => {
                formData.append('dataset_archive', file);
            });

            // Append tutorial video file
            formData.append('dataset_tutorial', dataset_tutorial);

            for (let pair of formData.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
            }

            // Make a POST request to your backend endpoint with axios
            const response = await axios.post("http://localhost:4000/api/datasets/", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Set content type to multipart/form-data
                }
            });

            navigate('/MyDatasets');
        } catch (error) {
            setErrorMessage('Error al crear el conjunto de datos');
        }
    };



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
                                    name="dataset_name"
                                    className="form-control rounded-0"
                                    onChange={(e) => setDatasetName(e.target.value)}
                                />
                            </li>
                            <li>
                                <input
                                    type="text"
                                    placeholder="Description of your dataset"
                                    autoComplete="off"
                                    name="dataset_description"
                                    className="form-control rounded-0"
                                    onChange={(e) => setDatasetDescription(e.target.value)}
                                />
                            </li>
                            <li>
                                <label htmlFor="avatarInput" className="folderButton">
                                    <img src="/src/assets/folder.png" alt="Select archive" />
                                    photo
                                    <input
                                        type="file"
                                        id="avatarInput"
                                        name="dataset_photo"
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
                                    <img src="/src/assets/folder.png" alt="Select archive" /> archive
                                    <input
                                        type="file"
                                        id="archiveInput"
                                        accept="*"
                                        multiple
                                        name="dataset_archive"
                                        onChange={(e) => setDatasetArchive(Array.from(e.target.files))}
                                    />
                                </label>
                                {dataset_archive.length > 0 && (
                                    <span>{dataset_archive.map(file => file.name).join(', ')}</span>
                                )}
                            </li>
                            <li>
                                <label htmlFor="videoInput" className="folderButton">
                                    <img src="/src/assets/folder.png" alt="Select video" /> video
                                    <input
                                        type="file"
                                        id="videoInput"
                                        accept="video/*"
                                        name="dataset_tutorial"
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
