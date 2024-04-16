import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserDataset() {
    return (
    <div className="UserDataset">
        <header>
            <div className="header-content">
                <img src="ruta-de-tu-imagen.jpg" alt="" />
                <h1>| User Data Set</h1>
            </div>
        </header>
        <section className="infodataset">
            <ul>
                <li>
                    <div className="container">
                        <span>Name</span>
                        <p>Info de la base de datos</p>
                    </div>
                </li>
                <li>
                    <div className="container">
                        <span>Description</span>
                        <p>Info de la base de datos</p>
                    </div>
                </li>
                <li>
                    <div className="container">
                        <span>Archive rute</span>
                        <p>Info de la base de datos</p>
                    </div>
                </li>
                <li>
                    <div className="container">
                        <span>Tutorial</span>
                        <p>Info de la base de datos</p>
                    </div>
                </li>
            </ul>

        </section>

        <aside className="comments">
            <h3>Comments</h3>
            <p>Comentarios traidos desde la bd</p>
            <p> .</p>
            <p> .</p>
            <p> .</p>
            <div className='commentPost'>
                <input
                    type="text"
                    placeholder="Post a comment"
                    autoComplete="off"
                    name="datasetName"
                    className="form-control rounded-0"
                />
                <button /*onClick={handleCreate}*/>Post</button>
            </div>
        </aside>

    </div>
    )
}

export default UserDataset;