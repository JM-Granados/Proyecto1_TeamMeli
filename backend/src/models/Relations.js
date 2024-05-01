const connection = require('../database')

const setNewRelation = async (followerUsername, followedUsername, callback) => {
    const neo = `
            MATCH (a:User {username: $followerUsername}), (b:User {username: $followedUsername})
            CREATE (a)-[:FOLLOWS]->(b)
            RETURN a, b 
        `;

    const neo4j = connection.NeoDriver.session();
    await neo4j
        .run(neo, { followerUsername, followedUsername })
        .then(result => {
            neo4j.close();
            callback(null, result);
        })
        .catch(error => {
            callback({ message: 'Relation not created', code: 'RELATION_NOT_CREATED' }, null);
        })
}


const setNewVote = async (idDataset, currentUsername, callback) => {
    const neo = `
            MATCH (a:User {username: $currentUsername}), (b:DS {id: $idDataset})
            CREATE (a)-[:VOTED{created_at: timestamp()}]->(b)
            RETURN a, b 
        `;

    const neo4j = connection.NeoDriver.session();

    await neo4j
        .run(neo, { idDataset, currentUsername })
        .then(result => {
            neo4j.close();
            callback(null, result);
        })
        .catch(error => {
            callback({ message: 'Vote not created', code: 'VOTE_NOT_CREATED' }, null);
        })
}

const setNewDownload = async (idDataset, currentUsername, callback) => {
    const neo = `
        MATCH (a:User {username: $currentUsername}), (b:DS {id: $idDataset})
        CREATE (a)-[r:DOWNLOADED {created_at: timestamp()}]->(b)
        RETURN r
    
        `;

    const neo4j = connection.NeoDriver.session();

    await neo4j
        .run(neo, { idDataset, currentUsername })
        .then(result => {
            neo4j.close();
            callback(null, result);
        })
        .catch(error => {
            callback({ message: 'Download not created', code: 'DOWNLOAD_NOT_CREATED' }, null);
        })
}


/** ->  / EL ERR Y RES */
const deleteRelation = async (followerUsername, followedUsername, callback) => {
    const neo = `
            MATCH (follower:User {username: $followerUsername})-[r:FOLLOWS]->(followed:User {username: $followedUsername})
            DELETE r
        `;

    const neo4j = connection.NeoDriver.session();
    await neo4j
        .run(neo, { followerUsername, followedUsername }) /**CORRE EL QUERY */
        .then(result => {
            neo4j.close();
            callback(null, result);
        })
        .catch(error => {
            callback({ message: 'Relation not deleted', code: error }, null);
        })
}

const deleteVote = async (idDataset, currentUsername, callback) => {
    const neo = `
            MATCH (follower:User {username: $currentUsername})-[r:VOTED]->(idDataset:DS {id: $idDataset})
            DELETE r
        `;

    const neo4j = connection.NeoDriver.session();
    await neo4j
        .run(neo, { idDataset, currentUsername }) /**CORRE EL QUERY */
        .then(result => {
            neo4j.close();
            callback(null, result);
        })
        .catch(error => {
            callback({ message: 'Relation not deleted', code: error }, null);
        })
}

const checkFollow = async (followerUsername, followedUsername, callback) => {
    const neo = `
            MATCH (follower:User {username: $followerUsername})
            MATCH (followed:User {username: $followedUsername})
            RETURN EXISTS((follower)-[:FOLLOWS]->(followed)) AS follows
        `;
    const neo4j = connection.NeoDriver.session();
    const result = await neo4j
        .run(neo, { followerUsername, followedUsername })
    const fields = result.records[0]._fields;
    const follows = fields[0];
    if (follows === true) {
        callback(null, { message: 'Is following' });
    } else {
        callback(null, { message: 'Is not following' });
    }
}
const checkVote = async (idDataset, currentUsername, callback) => {
    //console.log("CHECK VOTE", idDataset, currentUsername)
    const neo = `
        MATCH (follower:User {username: $currentUsername})
        MATCH (idDataset:DS {id: $idDataset})
        RETURN EXISTS((follower)-[:VOTED]->(idDataset)) AS follows
    `;

    const neo4j = connection.NeoDriver.session();
    const result = await neo4j.run(neo, { idDataset, currentUsername }); // Pasa los parámetros directamente
    const fields = result.records[0]._fields;
    const follows = fields[0];
    if (follows === true) {
        callback(null, { message: 'Is voted' });
    } else {
        callback(null, { message: 'Is not voted' });
    }
};

const getMyVotes = async (currentUsername, callback) => {
    const neo = `
        MATCH (u:User {username: $currentUsername})-[:VOTED]->(d:DS)
        RETURN d    
        `;

    const neo4j = connection.NeoDriver.session();
    console.log("RELATIONS BACKEND")
    console.log(currentUsername)
    await neo4j
        .run(neo, { currentUsername })
        .then(result => {
            neo4j.close();
            callback(null, result);
        })
        .catch(error => {
            callback({ message: 'Couldnt get your votes', code: 'VOTES_NOT_OBTAINED' }, null);
        })
}

module.exports = {
    setNewRelation,
    checkFollow,
    deleteRelation,
    setNewVote,
    checkVote,
    deleteVote, 
    setNewDownload, 
    getMyVotes
}
