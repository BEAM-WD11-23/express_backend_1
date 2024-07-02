var userRepository = require('../repositories/user.repository')

async function getAllUsers(){
    try {
        const allUsers = await userRepository.getAllUsers()
        console.dir(`Users fetched successfully in the service.`)
        return allUsers
    }
    catch(error){
        throw error
    }
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