var { getCollection } = require('../config/db')

async function getAllUsers(){
    const usersCollection = await getCollection('users')
    const allUsers = await usersCollection.find().project({password:0}).toArray()
    return allUsers
}

async function getUserById(userId){
    const usersCollection = await getCollection('users')
    return usersCollection.findOne({_id: {$eq: userId}})
}

async function updateUser(userId, newData){
    const usersCollection = await getCollection('users')
    return usersCollection.updateOne({_id: {$eq: userId}}, {$set: newData})
}

async function deleteUser(userId){
    const usersCollection = await getCollection('users')
    return usersCollection.deleteOne({_id: {$eq: userId}})
}


module.exports = { getAllUsers, getUserById, updateUser, deleteUser }