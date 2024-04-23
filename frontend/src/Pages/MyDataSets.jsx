import { useState, useEffect } from 'react';
import NavBar from '../NavBar/NavBar';
import axios from 'axios';
import './MyDataSets.css';

function MyDataSets() {
    // estado actual, para actualizar = setea el estado inicial
    const [datasets, setDataset] = useState([]);

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
                                    <a href="/MyDataSetInfo" className="setting-item">{dataset.dataset_name}</a> </li>
                            )
                        }
                    </ul>
                </div>

            </div>
        </div>
    );
}

export default MyDataSets;
