var axios = require('axios');

function createTodo(newTodo){
    return axios.post(process.env.DB_TODO_ENDPOINT, newTodo)
    .then(axiosRes => {
        return {
            status: axiosRes.status,
            data: axiosRes.data
        }
    })
    .catch(axiosErr => {
        return Promise.reject({
            status: axiosErr.status,
            message: axiosErr.message
        })
    })
}

function getAllTodos(){
    return axios.get(process.env.DB_TODO_ENDPOINT)
}

function editTodo(tid, newData){
    return axios.put(`${process.env.DB_TODO_ENDPOINT}/${tid}`, newData)
}

function deleteTodo(tid){
    return axios.delete(process.env.DB_TODO_ENDPOINT+'/'+tid)
}

module.exports = { createTodo, getAllTodos, editTodo, deleteTodo }
