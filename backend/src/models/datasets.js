const { Schema, model } = require('mongoose');

// Subesquema para dataset_photo
const photoSchema = new Schema({
    name: String,
    type: String,
    path: String,
    //required: true
});

// Subesquema para dataset_tutorial
const tutorialSchema = new Schema({
    name: String,
    type: String,
    path: String,
    //required: true
});

const datasetSchema = new Schema({
    dataset_author: String,
    dataset_createdDate: {
        type: Date,
        default: Date.now
    },
    dataset_name: {
        type: String,
        required: true,
        trim: true
    },
    dataset_description: {
        type: String,
        required: true,
        trim: true //limpiar texto
    },
    dataset_photo: photoSchema, // Utiliza el subesquema
    dataset_archive: [{
        archive_name: String,
        archive_type: String,
        archive_path: String
    }],
    dataset_tutorial: tutorialSchema, // Utiliza el subesquema
    dataset_comments: [{
        author: String,
        content: String,
        date: {
            type: Date,
            default: Date.now
        }
    }]
});

module.exports = model('DataSet', datasetSchema);
