import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import './UserDataset.css';

import Like from '../assets/like-gray.png'
import notLike from '../assets/not-like-gray.png'
import download from '../assets/download.png'

function UserDataset() {
    const selectedDataSet = JSON.parse(localStorage.getItem('dataset'));
    const [dataset_comment, setDatasetComment] = useState('');
    const idDataset = selectedDataSet.id

    //const currentUsername = JSON.parse(localStorage.getItem('user'));
    const currentUsername = "random";

    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('');
    const [isVoted, setIsVoted] = useState(false);
    const [isDownloaded, setIsDownloaded] = useState(false);
    const textRef = useRef(null);

    const getImageUrl = (photo) => {
        return photo ? `http://localhost:4000/ds-archives/${photo}` : `http://localhost:4000/ds-archives/FOLDER.png`;
    };

    const getvideoURL = (video) => {
        return video ? `http://localhost:4000/ds-archives/${video}` : `http://localhost:4000/ds-archives/VIDEO.png`;
    };

    const getArchivesURL = (archive) =>{ `http://localhost:4000/ds-archives/${archive}`};

    const handleCreate = async () => {

        try {
            console.log(selectedDataSet)
            const datasetId = selectedDataSet.id;
            const username = 'random'; // Supongamos que el nombre de usuario es 'random'

            // Verificar si el comentario está vacío
            if (!dataset_comment.trim()) {
                setErrorMessage('Please enter a comment');
                return;
            }

            // Enviar la solicitud para agregar el comentario al servidor
            console.log(dataset_comment)
            const response = await axios.post('http://localhost:4000/api/datasets/dataset_comment', {
                datasetId,
                username,
                dataset_comment
            });


        } catch (error) {
            // Manejar errores de la solicitud
            console.error('Error adding comment:', error);
            setErrorMessage('Error adding comment. Please try again later.');
        }
    };

    useEffect(() => {
        checkVotedStatus();
        if (textRef.current) {
            setContentWidth(textRef.current.offsetWidth);
        }
    }, [currentUsername]);
    //currentUser.username

    useEffect(() => {
        console.log("El estado isVoted ha cambiado a:", isVoted);
        // Aquí puedes realizar más acciones que dependan del nuevo valor de isFollowing.
    }, [isVoted]);

    useEffect(() => {
        console.log("El estado isDownloaded ha cambiado a:", isDownloaded);
        // Aquí puedes realizar más acciones que dependan del nuevo valor de isFollowing.
    }, [isDownloaded]);


    const voteDataset = async () => {
        //Aqui tambien debe ir la bitacora
        try {
            const check = await axios.post('http://localhost:4000/api/relations/checkVote', { idDataset, currentUsername });
            if (check.data.message.message === "Is voted") {
                const response = await axios.post('http://localhost:4000/api/relations/deleteVote', { idDataset, currentUsername });
                if (response.data.message === "Relation deleted") {
                    setIsVoted(false); // Cambiar el estado a false si se desvota
                } else {
                    setErrorMessage('Cant vote this dataset.');
                }
            } else {
                const response = await axios.post('http://localhost:4000/api/relations/createVote', { idDataset, currentUsername });
                if (response.data.message === "Relation created") {
                    setIsVoted(true); // Cambiar el estado a true si se vota
                } else {
                    setErrorMessage('Cant vote this dataset.');
                }
            }
        } catch (error) {
            const errorMessage = error.response?.data.error || 'An error occurred while creating the user.';
            setErrorMessage(errorMessage);
        }
    };

    const downloadDataset = async () =>{

        //Aqui tambien debe ir la bitacora
        try {
            const check = await axios.post('http://localhost:4000/api/relations/createDownload', { idDataset, currentUsername });
            
            


            setIsDownloaded(true)
        } catch (error) {
            setIsDownloaded(false)
            const errorMessage = error.response?.data.error || 'An error occurred while downloading.';
            setErrorMessage(errorMessage);
        }
    };

    const checkVotedStatus = async () => {
        //console.log(idDataset, currentUsername)
        try {
            // Sustituye 'checkFollowStatusEndpoint' con la ruta correcta de tu API
            const result = await axios.post('http://localhost:4000/api/relations/checkVote', { idDataset, currentUsername });
            setIsVoted(result.data.message.message === "Is voted");
        } catch (error) {
            console.error('Error al verificar el estado de seguimiento', error);
        }
    };

    return (
        <div className="nav-container">
            <NavBar />
            <div className="UserDataset">
                <header>
                    <div className="header-content">

                        <img src={getImageUrl(selectedDataSet.photo)} alt="" />
                        <h1>| User Data Set</h1>
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
                        <div className="button-container">
                            <button className="button" onClick={voteDataset}>
                                <img src={isVoted ? Like : notLike} alt={isVoted ? "Unvote ds" : "Vote ds"} />
                                Like
                            </button>
                            <button className="button" onClick={downloadDataset}>
                                <img src={download} alt="Download" />
                                Download
                            </button>
                        </div>




                    </ul>
                </section>

                <aside className="comments">
                    <h3>Comments</h3>
                    {selectedDataSet.comments.map((comment, index) => (
                        <li key={index}>
                            <p> {comment.author} : {comment.content}</p>

                        </li>
                    ))}
                    <div className='commentPost'>
                        <input
                            type="text"
                            placeholder="Post a comment"
                            autoComplete="off"
                            name="datasetName"
                            className="form-control rounded-0"
                            onChange={(e) => setDatasetComment(e.target.value)}
                        />

                        <button onClick={handleCreate}>Post</button>
                    </div>
                </aside>

            </div>
        </div>
    )
}

export default UserDataset;