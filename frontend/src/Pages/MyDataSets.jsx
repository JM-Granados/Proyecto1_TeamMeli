import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './MyDataSets.css';

function MyDataSets() {
    // estado actual, para actualizar = setea el estado inicial
    const [datasets, setDataset] = useState([]);
    const [id, setID] = useState();
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/datasets');
                console.log(response.data); // acceder a los datos de la respuesta
                // Actualizar el estado con los datos recibidos
                setDataset(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // Llama a la función de solicitud de datos cuando el componente se monta
    }, []); // El segundo argumento de useEffect especifica las dependencias, en este caso, está vacío


    const selectedDataSet = async (datasetId) => {

        try {
            const response = await axios.get(`http://localhost:4000/api/datasets/dataset_id/${datasetId}`);
            const author = response.data.dataset_author;
            const name = response.data.dataset_name;
            const description = response.data.dataset_description;
            const photo = response.data.dataset_photo;
            const archives = response.data.dataset_archive;
            const tutorial = response.data.dataset_tutorial;
            const comments = response.data.dataset_comments;
        

            localStorage.setItem('dataset', JSON.stringify({
                author,
                name,
                description,
                photo,
                archives,
                tutorial,
                comments
            }));

            navigate('/MyDataSetInfo')



        } catch (err) {
            console.error('Error fetching selected dataset:', err);
            setErrorMessage('Error fetching selected dataset. Please try again later.');
        }

    }


    return (
        <div className="nav-container container-fluid" >
            <NavBar />

            <div className="MyDataSets">
                <header>
                    <h1>My Data Sets</h1>
                </header>
                <div className="row">
                    <ul className='listDatasets'>
                        {
                            datasets.map(dataset =>
                                <li className='listDatasetsItems' key={dataset._id}>
                                    <Link className="setting-item" onClick={() => selectedDataSet(dataset._id)}>
                                        {dataset.dataset_name}
                                    </Link>
                                </li>
                            )
                        }
                    </ul>
                </div>

            </div>
        </div>
    );
}

export default MyDataSets;

