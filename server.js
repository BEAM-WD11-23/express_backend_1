// Setup a backend server
const express = require('express')
const cors = require('cors')
const { MongoClient } = require('mongodb')

const app = express()

app.use(express.json())
app.use(cors())

function connectToDatabase(){
    // Get a database client
    const client = new MongoClient('mongodb+srv://relando:Wd%401123@cluster0.jpqgklk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    // Access a database
    const myDb = client.db('testing')
    return myDb
}

// ROUTE
app.get('/products', getProdsController)

//CONTROLLER
async function getProdsController (request, response) {
    try {
        const result = getProdsService()
        response.json(result)
    }
    catch(error){
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
async function getProdsRepository(db){
    // Access the collection in that database to perform CRUDs
    const products = db.collection('products')
        // Perform CRUD on that collection
    const result = await products.find().toArray()
    return result
}

app.listen(3500, () => {console.log('Server is running on port 3500.')})

// To start the new file server run: npx nodemon server.js