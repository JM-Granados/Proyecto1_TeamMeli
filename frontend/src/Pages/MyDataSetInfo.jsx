import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './MyDataSetInfo.css';

function MyDataSetInfo() {
  return (
    <div className="MyDataSetInfo">
        <header>
            <div className="header-content">
                <img src="ruta-de-tu-imagen.jpg" alt="" />
                <h1>| My Data Set</h1>
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
        <div className="cloneButton">
        <button /*onClick={handleCreate}*/>Clone</button>
        </div>
    </section>
    <aside className="comments">
        <h3>Comments</h3>
        <p>Comentarios traidos desde la bd</p>
        </aside>
    </div>
  );
}

export default MyDataSetInfo;
