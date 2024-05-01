import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import './MyVotes.css';

function MyVotes() {
    const [datasets, setDataset] = useState([]);
    const [dsnames, setDsnames] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate()

    const currentUsername = "random";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:4000/api/relations/getVotes', { currentUsername });
                const dsnamesArray = [];
                for (let record of response.data.message.records) {
                    const fields = record._fields;
                    for (let field of fields) {
                        const currenteId = field.properties.id;
                        const currentDs = await axios.get(`http://localhost:4000/api/datasets/dataset_id/${currenteId}`);
                        dsnamesArray.push(currentDs.data);
                    }
                }
                setDsnames(dsnamesArray);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const selectedDataSet = async (datasetId) => {
        try {
            const response = await axios.get(`http://localhost:4000/api/datasets/dataset_id/${datasetId}`);
            const id = datasetId;
            const author = response.data.dataset_author;
            const name = response.data.dataset_name;
            const description = response.data.dataset_description;
            const photo = response.data.dataset_photo;
            const archives = response.data.dataset_archive;
            const tutorial = response.data.dataset_tutorial;
            const comments = response.data.dataset_comments;

            localStorage.setItem('dataset', JSON.stringify({
                id,
                author,
                name,
                description,
                photo,
                archives,
                tutorial,
                comments
            }));

            navigate('/UserDataset');
        } catch (err) {
            console.error('Error fetching selected dataset:', err);
            setErrorMessage('Error fetching selected dataset. Please try again later.');
        }
    }

    return (
        <div className="nav-container">
            <NavBar />
            <div className="MyVotes">
                <header>
                    <h1>My voted Data sets</h1>
                </header>
                <div className="row">
                    <ul className='listDatasets'>
                        {
                            dsnames.map((dataset, index) =>
                                <li className='listDatasetsItems' key={index}>
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
    )
}

export default MyVotes;
