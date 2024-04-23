const datasetsCtrl = {};

const DataSet = require('../models/datasets');

datasetsCtrl.getDataSets = async (req, res) => {
    const datasets = await DataSet.find();
    res.json(datasets);
}


datasetsCtrl.getDataSet = (req, res) => res.send('GET - REQUEST DATASET')


datasetsCtrl.createDataSet = async (req, res) => {
    const { dataset_author, dataset_name, dataset_description, dataset_photo, dataset_archive, dataset_tutorial } = req.body;
    
    console.log(req.body);

    console.log("HOLAAAA");

    console.log(req.file);

    const newDataSet = new DataSet({
        dataset_author: req.body.dataset_author,
        dataset_name: req.body.dataset_name,
        dataset_description: req.body.dataset_description,
        dataset_photo: req.body.dataset_photo,
        dataset_archive: req.body.dataset_archive, 
        dataset_tutorial: req.body.dataset_tutorial
    })
    await newDataSet.save();
    console.log(newDataSet)
    res.json({message: 'Dataset created :D'})
}

module.exports = datasetsCtrl;
