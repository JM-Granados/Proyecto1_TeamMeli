const datasetsCtrl = {};
const DataSet = require('../models/datasets');

const connection = require('../database')

const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,'./DatasetImages/' )
    },
    filename:function(req, file, cb){
        let ext = path.extname(file.originalname)
        cb(null, Date.now()+ext)
    }
})

const upload = multer({
    storage: storage,
    fileFilter: function(req, file, callback){
        if(
            file.mimetype == "*"
        ){
            callback( null, true,)
        }else{
            console.log("FILE TYPE NOT SUPORTED")
        }
    }
})


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
    // console.log("CONTROLLER dataset")
    // console.log(req.file)
    const { dataset_author, dataset_name, dataset_description, dataset_comments } = req.body;
    //console.log(req.file.path)
    //req.file.path

    //const newDataSet = new DataSet(req.body);
    const newDataSet = new DataSet({
        dataset_author: req.body.dataset_author,
        dataset_name: req.body.dataset_name,
        dataset_description: req.body.dataset_description
        //dataset_photo: req.body.dataset_photo,
        // dataset_archive: req.body.dataset_archive, 
        // dataset_tutorial: req.body.dataset_tutorial
    })
    

    try {
        const savedDataSet = await newDataSet.save();
        const newdsid = savedDataSet._id.toString(); // Guardar el ID del nuevo conjunto de datos
        //console.log(newdsid)
        const neo = `
    CREATE (d:DS {id: $newdsid}) // Usar el ID del nuevo conjunto de datos en la consulta
`;

        const neo4j = connection.NeoDriver.session();
        neo4j
            .run(neo, { newdsid }) // Pasar el ID del nuevo conjunto de datos como parámetro
            .then(result => {
                neo4j.close();
                res.status(201).json({ message: 'Dataset created :D', dataset: savedDataSet });
            })
            .catch(err => {
                console.log("Error executing Neo4j query:", err);
                res.status(500).json({ message: err.message });
            });
    } catch (error) {
        console.log("NO SE CREO");
        res.status(500).json({ message: 'Error saving dataset in MongoDB', error: error });
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


datasetsCtrl.uploadDataset_photo = (req, res)=>{
    console.log("UPLOAD PHOTO")
    console.log(req.file);
    const photo = req.file.fieldname
    res.json(photo);
 }


/*datasetsCtrl.uploadDataset_archives = (req, res) => {
    console.log("HOLAAAAAAAAA CONTROLLER")
    console.log(req.file)
    const archive = req.file.filename
    res.json(archive);
}*/

datasetsCtrl.uploadDataset_archives = (req, res) => {
    console.log("HOLAAAAAAAAA CONTROLLER")
    console.log("Archivos recibidos: ", req.files);
    let paths = req.files.map(file => file.fieldname).join(',');
    res.json({ paths });
}


 datasetsCtrl.uploadDataset_tutorial = (req, res)=>{
    const tutorial = req.file.filename
    res.json(tutorial);
 }




module.exports = datasetsCtrl;
