import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateDataSet.css'

function CreateDataSet() {
    return (
        <div className="CreateDataSet">  
        <header>
            <h1>Create Data Set</h1>  
        </header>
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
                        <li><input
                            type="text"
                            placeholder="Name of your dataset"
                            autoComplete="off"
                            name="datasetName"
                            className="form-control rounded-0"
                        /></li>
                        <li><input
                            type="text"
                            placeholder="Description of your dataset"
                            autoComplete="off"
                            name="datasetDescription"
                            className="form-control rounded-0"
                        /></li>
                        <li><label htmlFor="avatarInput" className="folderButton">
                            <img src="assets/archive.svg" alt="Select archive" />
                            photo
                            <input
                                type="file"
                                id="avatarInput"
                                accept="image/png, image/jpeg, image/jpg"
                            />
                        </label></li>
                    </ul>
                    <li><label htmlFor="avatarInput" className="folderButton">
                        <img src="assets/archive.svg" alt="Select archive" /> archive
                    
                        <input
                            type="file"
                            id="archiveInput"
                            accept="*"
                        />
                    </label></li>
                    <li><label htmlFor="avatarInput" className="folderButton">
                        <img src="assets/archive.svg" alt="Select archive" />
                        video
                        <input
                            type="file"
                            id="avatarInput"
                            accept="video/*"
                        />
                    </label></li>
                </aside>
                
                <div className="createButton">
                    <button /*onClick={handleCreate}*/>Create Data Set</button>
                </div>

            </div>
        
    );
}

export default CreateDataSet;