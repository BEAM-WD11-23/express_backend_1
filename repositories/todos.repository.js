var { getCollection } = require('../config/db')

async function getAllTodos(){
    const todosCollection = await getCollection('todos')
    return todosCollection.find({}).project().toArray()
}


module.exports = { getAllTodos }