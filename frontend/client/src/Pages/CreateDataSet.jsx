import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function CreateDataSet(){
    return(

        <div>
            <div className="CreateDataSet">
                <div className="infolabels">
                    <ul>
                        <label>Name</label>
                        <label>Description</label>
                        <label>Photo</label>
                        <label>Archives</label>
                        <lable>Tutorial</lable>
                    </ul>
                </div>
                <div className="infoinput">
                    <input  type="text"
                            placeholder="Name of your dataset "
                            autoComplete="off"
                            name="Name Datasest"
                            className="form-control rounded-0"
                            //onChange={(e) => setEmail(e.target.value)}
                            />
                    <input  type="text"
                            placeholder="Description of your dataset "
                            autoComplete="off"
                            name="Description Datasest"
                            className="form-control rounded-0"
                            //onChange={(e) => setEmail(e.target.value)}
                            />
             
                </div>
            </div>
        </div>
    )


}
export default CreateDataSet;