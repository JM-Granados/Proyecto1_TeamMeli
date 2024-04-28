const datasetsCtrl = {};
const DataSet = require('../models/datasets');

/*const connection = require('../database')*/ 

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
        /*const neo = `
            CREATE (u: DS {username: $username})
            
        `;

        sE CONECTA CON LA BASE Y HACE EL QUERY
         const neo4j = connection.NeoDriver.session();
            neo4j
                .run(neo, { username: user.username })
                .then(result => {
                    neo4j.close();
                    callback(null, results.insertId); 
                })
                .catch(err => {
                    callback({ message: err.message }, null); 
                })

    */ 
        res.status(201).json({ message: 'Dataset created :D', dataset: savedDataSet }); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = datasetsCtrl;
