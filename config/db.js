const mongoose = require('mongoose')
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

async function mongooseConnect(){
    try {
        await mongoose.connect(process.env.ATLAS_DB)
        console.log('Connected to DB')
    }
    catch(error){
        console.error('Error connecting to DB', error.message)
        process.exit(1)
    }

    mongoose.connection.on('connected', () => console.log("Mongoose connected to DB successfully"))
    mongoose.connection.on('error', error => console.error(`Connection from mongoose failed with err: ${error.message}`))
    mongoose.connection.on('disconnected', () => console.log("Mongoose disconnected from DB."))

    process.on('SIGINT', async () => {
        await mongoose.connection.close()
        console.log('Connection to DB ended as app termination')
        process.exit(0)
    })

}

module.exports = { connectToDB, getCollection, mongooseConnect }