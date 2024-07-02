var { MongoClient } = require("mongodb");

let db = null;

async function connectToDB(){
    if(db) return db;

    try {
        console.log(process.env.ATLAS_DB)
        const client = new MongoClient(process.env.ATLAS_DB)
        db = client.db(process.env.DB_NAME)
        console.dir("Connection to database eslablished.")
        return db;
    }
    catch(error){
        console.log("Unable to establish a connection", error)
        throw error
    }
}

// a utility functions to help us instanly access a collection inside database
async function getCollection(collectionName){
    try {
        const db = await connectToDB()
        const collection = await db.collection(collectionName)
        console.dir(`Collection ${collectionName} provided successfully.`)
        return collection
    }
    catch(error){
        throw error
    }
}

module.exports = { connectToDB, getCollection }