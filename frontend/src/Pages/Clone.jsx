import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Clone.css'

function Clone() {
    return (
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
                            className="form-control rounded-0"/>
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

            <div className="saveButton">
                <button /*onClick={handleCreate}*/>Save</button>
            </div>

        </section>
    
    </div>
    )
}

export default Clone;