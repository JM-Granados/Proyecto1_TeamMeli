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
        .then(result=> {
            neo4j.close();
            callback(null, result);
        })
        .catch(error => {
            callback({message: 'Relation not created', code: 'RELATION_NOT_CREATED'}, null);
        })
}

const deleteRelation = async (followerUsername, followedUsername, callback) => {
    const neo = `
            MATCH (follower:User {username: $followerUsername})-[r:FOLLOWS]->(followed:User {username: $followedUsername})
            DELETE r
        `;

    const neo4j = connection.NeoDriver.session();
    await neo4j 
        .run(neo, { followerUsername, followedUsername })
        .then(result=> {
            neo4j.close();
            callback(null, result);
        })
        .catch(error => {
            callback({message: 'Relation not deleted', code: error}, null);
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
                        .run(neo, {followerUsername, followedUsername})
    const fields = result.records[0]._fields;
    const follows = fields[0];
    if (follows === true) {
        callback(null, {message: 'Is following'});
    } else {
        callback(null, {message: 'Is not following'});
    }
}

module.exports = {
    setNewRelation, 
    checkFollow, 
    deleteRelation
}
