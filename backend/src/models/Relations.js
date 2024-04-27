const connection = require('../database')

const setNewRelation = async (followerUsername, followedUsername, callback) => {
    const neo = `
            MATCH (a:User {username: $followerUsername}), (b:User {username: $followedUsername})
            CREATE (a)-[:FOLLOWS]->(b)
            RETURN a, b 
        `;
    
    console.log("hoal"); 
    console.log(followerUsername);
    console.log(followedUsername);

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

const checkFollow = async (followerUsername, followedUsername, callback) => {
    const neo = `
            MATCH (follower:User {username: $followerUsername})
            MATCH (followed:User {username: $followedUsername})
            RETURN EXISTS((follower)-[:FOLLOWS]->(followed)) AS follows
        `;
    const neo4j = connection.NeoDriver.session();
    console.log("HOLAAA")
    console.log(followedUsername);
    const result = await neo4j 
                        .run(neo, {followerUsername, followedUsername})
    console.log(result.records);
    const fields = result.records[0]._fields;
    const follows = fields[0];
    if (follows === true) {
        console.log("SI SE SIGUE")
        callback(null, {message: 'Is following'});
    } else {
        callback({message: 'Is not following'}, null);
    }
}

module.exports = {
    setNewRelation,
    checkFollow
}
