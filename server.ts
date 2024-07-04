// Setup a backend server
import express, { Request, Response } from 'express'
import { Db } from 'mongodb'
const cors = require('cors')
const { MongoClient } = require('mongodb')

const app = express()

app.use(express.json())
app.use(cors())

function connectToDatabase():Db {
    // Get a database client
    const client = new MongoClient('mongodb+srv://relando:Wd%401123@cluster0.jpqgklk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    // Access a database
    const myDb = client.db('testing')
    return myDb
}

// ROUTE
app.get('/products', getProdsController)

//CONTROLLER
async function getProdsController(request:Request, response:Response):Promise<void> {
    try {
        const result = await getProdsService()
        response.json(result)
    }
    catch(error: any){
        console.log(error)
        response.status(500).json(error.message)
    }
}

// SERVICE
async function getProdsService(){
    const db = connectToDatabase()
    const result = await getProdsRepository(db)
    return result
}

// REPO => 
async function getProdsRepository(database: Db){
    // Access the collection in that database to perform CRUDs
    const products = database.collection('products')
        // Perform CRUD on that collection
    const result = await products.find().toArray()
    return result
}

app.listen(3500, () => {console.log('Server is running on port 3500.')})

// To start the new file server run: npx nodemon server.js