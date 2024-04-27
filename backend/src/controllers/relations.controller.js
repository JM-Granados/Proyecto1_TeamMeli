const relationsCtrl = {};

const RelationsModel = require('../models/Relations')

relationsCtrl.setNewRelation = async (req, res) => {
    const { followerUsername, followedUsername } = req.body;

    console.log(req.body);

    await RelationsModel.setNewRelation(followerUsername, followedUsername, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message, detail: err.detail });
        }
        else {
            res.json({ message: 'Relation created' });
        }
    }) 

}

relationsCtrl.checkFollow = async (req, res) => {
    const { followerUsername, followedUsername } = req.body;

    console.log(followedUsername);

    await RelationsModel.checkFollow(followerUsername, followedUsername, (err, result) => {
        if (err) {
            console.log("entonces qué pasa")
            res.status(500).json({ error: err.message, detail: err.detail });
        }
        else {
            res.json({ message: 'Is following' });
        }
    })
}

module.exports = relationsCtrl;