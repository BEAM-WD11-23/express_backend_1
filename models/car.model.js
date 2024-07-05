const mongoose = require('mongoose')

const carSchema = mongoose.Schema({
    model: { type:String, required:true, minLength: 1 },
    brand: { type:String, required:true },
    productionYear: { type:Number, required:true, min:1980 },
    price: { type:Number, required:true }
})


const Car = mongoose.model('Car', carSchema)


module.exports = { Car }