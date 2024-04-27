const datasetsCtrl = {};
const DataSet = require('../models/datasets');

datasetsCtrl.getDataSets = async (req, res) => {
    try {
        const datasets = await DataSet.find();
        res.json(datasets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

datasetsCtrl.getDataSet = async (req, res) => {
    const { id } = req.params;
    try {
        const dataset = await DataSet.findById(id);
        if (!dataset) {
            return res.status(404).json({ message: 'Dataset not found' });
        }
        res.json(dataset);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

datasetsCtrl.createDataSet = async (req, res) => {
    const { dataset_author, dataset_name, dataset_description, dataset_photo, dataset_archive, dataset_tutorial, dataset_comments } = req.body;
    console.log(req.body)
    const newDataSet = new DataSet(
        req.body
    );
    
    try {
        const savedDataSet = await newDataSet.save(); 
        res.status(201).json({ message: 'Dataset created :D', dataset: savedDataSet }); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = datasetsCtrl;
