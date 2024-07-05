const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()

// Mongoose connecting to database.
async function mongooseConnect(){
    try {
        await mongoose.connect('mongodb+srv://relando:Wd%401123@cluster0.jpqgklk.mongodb.net/testing?retryWrites=true&w=majority&appName=Cluster0')
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
mongooseConnect()

// Midlewares
app.use(express.json())
app.use(cors())

// Models
const carSchema = mongoose.Schema({
    model: { type:String, required:true, minLength: 1 },
    brand: { type:String, required:true },
    productionYear: { type:Number, required:true, min:1980 },
    price: { type:Number, required:true }
})

const Car = mongoose.model('Car', carSchema)

// Routes
app.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/cars', async (req, res) => {
    try {
        const allCars = await Car.find().select("model brand price -_id").exec()
        res.json(allCars)
    }
    catch(error){
        res.status(500).json(`Some error happened ${error.message}`)
    }
})

app.post('/cars', async (req, res) => {
    const newCar = req.body

    try {
        const newData = new Car(newCar)
        const result = await newData.save()
        res.status(201).json(result)
    }
    catch(error){
        res.status(500).json(`Some error happened::: ${error.message}`)
    }
})

// Listen to PORT
app.listen(5550, () => {
    console.info('Mongoose app server listening on port 5550')
})