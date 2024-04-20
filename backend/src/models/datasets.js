const { Schema, model } = require('mongoose');

const datasetSchema =  new Schema({
    dataset_author: String,
    dataset_createdDate: {
            type: Date,
            default: Date.now
        },
    dataset_name : {
            type: String,
            required: true,
            trim: true
        },
    dataset_description: {
            type: String,
            required: true,
            trim: true //limpiar texto
        },
    dataset_photo: {
            type: String,
            required: true 
        },
    dataset_archive: [{
            archive_name: String,
            archive_type: String,
            archive_path: String
        }],
    dataset_tutorial: {
            type: String,
            required: true 
        }    
    });

    module.exports = model('DataSet', datasetSchema);