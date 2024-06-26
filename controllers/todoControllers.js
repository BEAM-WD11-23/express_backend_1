var todoService = require('../services/todo.service')

function createTodo(request, response) {
    // Library agnostic controller
    const todo = request.body
    if (todo){ 
        todoService.createTodo(todo)
        .then(dataObj => {
            response.status(201).json(dataObj.data)
        })
        .catch(errorObj => {
            response.status(errorObj.status).json(errorObj.message)
        })
    }
    else{
        response.status(400).json('You must provide a valid request')
    }
}

function getAllTodos(req, res) {
    todoService.getAllTodos()
    .then((axiosRes)=>{
        res.json(axiosRes.data)
    })
    .catch((axiosErr)=>{
        res.status(axiosErr.response.status).json(axiosErr.message)
    })
}

function editTodo (req, res){
    const newData = req.body
    const tid = req.params.tid

    if(newData && tid){
        todoService.editTodo(tid, newData)
        .then(axiosResp => {
            res.status(201).json(axiosResp.data)
        })
        .catch(axiosErr => {
            res.status(axiosErr.response.status).json(axiosErr.message)
        })
    }
    else{
        res.status(400).json("Please provide Data and Tid")
    }
    
}

function deleteTodo(req, res){
    const tid = req.params.tid
    if (tid){
        todoService.deleteTodo(tid)
        .then(axiosRes => {
            res.json("Todo deleted successfully")
        })
        .catch(axiosErr => {
            res.status(axiosErr.response.status).json(axiosErr.message)
        })
    }
    else{
        res.status(400).json("You must provide an ID to delete the 'todo' ")
    }
}


module.exports = {createTodo, getAllTodos, editTodo, deleteTodo}