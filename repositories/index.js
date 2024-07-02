var { getAllUsers, getUserById, updateUser, deleteUser } = require('./user.repository')
var { getAllTodos } = require('./todos.repository')



module.exports = { 
    getAllUsers, 
    getUserById, 
    updateUser, 
    deleteUser, 
    getAllTodos 
}