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

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        console.log("Dataset Author:", dataset_author);
        console.log("Dataset Created Date:", dataset_createdDate);
        console.log("Dataset Name:", dataset_name);
        console.log("Dataset Description:", dataset_description);
        console.log("Dataset Photo:", dataset_photo);
        console.log("Dataset Archive:", dataset_archive);
        console.log("Dataset Tutorial:", dataset_tutorial);
        
        // Resto del código para enviar la solicitud
        // ...

        setDatasetCreatedDate(Date.now());
        setDatasetAuthor("JM");
        
        const formData = new FormData();
        formData.append('dataset_author', dataset_author);
        formData.append('dataset_createdDate', dataset_createdDate);
        formData.append('dataset_name', dataset_name);
        formData.append('dataset_description', dataset_description);
        formData.append('dataset_photo', dataset_photo);
        dataset_archive.forEach(file => {
            formData.append('dataset_archive', file);
        });
        formData.append('dataset_tutorial', dataset_tutorial);
        
        
        console.log("Dataset Author:", formData.get('dataset_author'));
        console.log("Dataset Created Date:", formData.get('dataset_createdDate'));
        console.log("Dataset Name:", formData.get('dataset_name'));
        console.log("Dataset Description:", formData.get('dataset_description'));
        console.log("Dataset Photo:", formData.get('dataset_photo'));
        
        // Para archivos múltiples, debes verificar cuántos archivos hay en la instancia formData
        for (let i = 0; i < formData.getAll('dataset_archive').length; i++) {
            console.log(`Dataset Archive file ${i}:`, formData.getAll('dataset_archive')[i]);
        }
        
        console.log("Dataset Tutorial:", formData.get('dataset_tutorial'));
            
        try {
            const result = await axios.post('http://localhost:4000/api/datasets/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(result);
            if (result.data && result.data.message === "Dataset created :D") {
                navigate('/')
            } else {
                setErrorMessage('Unexpected response from the server.');
            }

        } catch (err) {
            setErrorMessage(err.response.data.error || 'An error occurred while creating dataset.')
        }
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
