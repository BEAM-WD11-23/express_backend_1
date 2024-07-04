var userRepository = require('../repositories/user.repository')

async function getAllUsers(){
    const allUsers = await userRepository.getAllUsers()
    return allUsers
}

async function getUserById(userId){
    return await userRepository.getUserById(userId)
}

async function updateUser(userId, newData){
    return await userRepository.updateUser(userId, newData)
}

async function deleteUser(userId){
    return await userRepository.deleteUser(userId)
}


module.exports = { getAllUsers, getUserById, updateUser, deleteUser }