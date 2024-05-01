const datasetsCtrl = {};
const DataSet = require('../models/datasets');

const connection = require('../database')


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
    
    try {
        console.log("REQ FILE", req.files);
        console.log("REQ BODY", req.body);

        // Extraer el primer nombre de archivo de cada campo
        const dataset_photo = req.files.dataset_photo[0].filename;
        const dataset_archive = req.files.dataset_archive.map(file => file.filename);
        const dataset_tutorial = req.files.dataset_tutorial[0].filename;

        // Crear un nuevo objeto DataSet con los datos recibidos
        const newDataSet = new DataSet({
            dataset_author: req.body.dataset_author,
            dataset_createdDate: Date.now,
            dataset_name: req.body.dataset_name,
            dataset_description: req.body.dataset_description,
            dataset_photo: dataset_photo,
            dataset_archive: dataset_archive,
            dataset_tutorial: dataset_tutorial,
            dataset_comments: [] // Asumiendo que dataset_comments es un array vacío por defecto
        });
        
        // Guardar el nuevo DataSet en la base de datos
        await newDataSet.save();
        console.log("NEW DATASET", newDataSet);
        const newdsid = newDataSet._id.toString();
        const neo = `
                CREATE (d:DS {id: $newdsid})`;
        const neo4j = connection.NeoDriver.session();
        neo4j
            .run(neo, { newdsid }) // Pasar el ID del nuevo conjunto de datos como parámetro
            .then(result => {
                neo4j.close();
                res.status(201).json({ message: 'Dataset created :D', dataset: newDataSet });
            })
            .catch(err => {
                console.log("Error executing Neo4j query:", err);
                res.status(500).json({ message: err.message });
            });
       
    } catch (error) {
        console.error('Error creating DataSet:', error);
        // Si hay un error, eliminar los archivos guardados
        deleteUploadedFiles(req.files);
        res.status(500).json({ error: 'Internal server error' });
    }
};

datasetsCtrl.cloneDataSet = async (req, res) => {
    try {
        console.log("REQ BODY", req.body);

        // Crear un nuevo objeto DataSet con los datos recibidos
        const newDataSet = new DataSet({
            dataset_author: req.body.dataset_author,
            dataset_createdDate: Date.now(),
            dataset_name: req.body.dataset_name,
            dataset_description: req.body.dataset_description,
            dataset_photo: req.body.dataset_photo,
            dataset_archive: req.body.dataset_archive,
            dataset_tutorial: req.body.dataset_tutorial,
            dataset_comments: req.body.dataset_comments 
        });
        
        // Guardar el nuevo DataSet en la base de datos
        await newDataSet.save();
        console.log("NEW DATASET", newDataSet);

        const newdsid = newDataSet._id.toString();
        const neo = `
                CREATE (d:DS {id: $newdsid})`;
        const neo4j = connection.NeoDriver.session();
        neo4j
            .run(neo, { newdsid }) // Pasar el ID del nuevo conjunto de datos como parámetro
            .then(result => {
                neo4j.close();
                res.status(201).json({ message: 'Dataset created :D', dataset: newDataSet });
            })
            .catch(err => {
                console.log("Error executing Neo4j query:", err);
                res.status(500).json({ message: err.message });
            });
       
    } catch (error) {
        console.error('Error creating DataSet:', error);
        // Si hay un error, eliminar los archivos guardados
        res.status(500).json({ error: 'Internal server error' });
    }
};


function deleteUploadedFiles(files) {
    // Eliminar los archivos guardados
    if (files.dataset_photo) {
        fs.unlinkSync(files.dataset_photo[0].path);
    }
    if (files.dataset_archive) {
        files.dataset_archive.forEach(file => {
            fs.unlinkSync(file.path);
        });
    }
    if (files.dataset_tutorial) {
        fs.unlinkSync(files.dataset_tutorial[0].path);
    }
}

datasetsCtrl.getDataSetsbyUser = async (req, res) => {
    const { username } = req.params; // Obtener el nombre de usuario de los parÃ¡metros de la solicitud
    console.log(username)
    try {
        // Buscar todos los conjuntos de datos asociados al nombre de usuario proporcionado
        const datasets = await DataSet.find({ dataset_author: username }); // Usar la variable username en la consulta
        res.json(datasets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

datasetsCtrl.addCommentToDataSet = async (req, res) => {
    const { datasetId, username } = req.body;
    const comment = req.body.dataset_comment
    try {

        const dataset = await DataSet.findById(datasetId);

        if (!dataset) {
            return res.status(404).json({ message: 'Dataset not found' });
        }


        dataset.dataset_comments.push({
            author: username,
            content: comment
        });


        await dataset.save();

        res.status(200).json({ message: 'Comment added successfully', dataset });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = datasetsCtrl;
