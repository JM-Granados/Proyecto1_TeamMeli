const datasetsCtrl = {};

const DataSet = require('../models/datasets');

datasetsCtrl.getDataSets = async (req, res) => {
    const datasets = await DataSet.find();
    res.json(datasets);
}


datasetsCtrl.getDataSet = (req, res) => res.send('GET - REQUEST DATASET')


datasetsCtrl.createDataSet = async (req, res) => {
    const { dataset_author, dataset_name, dataset_description, dataset_photo, dataset_archive, dataset_tutorial } = req.body;
    const newDataSet = new DataSet({
        dataset_author: dataset_author,
        dataset_name: dataset_name,
        dataset_description: dataset_description,
        dataset_photo: dataset_photo,
        dataset_archive: dataset_archive, 
        dataset_tutorial: dataset_tutorial
    })
    await newDataSet.save();
    console.log(newDataSet)
    res.json({message: 'Dataset created :D'})
}

module.exports = datasetsCtrl;
