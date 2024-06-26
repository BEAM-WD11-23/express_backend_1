var axios = require('axios');

function createTodo(request, response) {
    const todo = request.body

    if (todo){ 
        axios.post(process.env.DB_TODO_ENDPOINT) 
        .then(axiosRes => {
            response.status(201).json(axiosRes.data)
        })
        .catch(axiosErr => {
            response.status(axiosErr.response.status).json(axiosErr.message)
        })
    }
    else{
        response.status(400).json('You must provide a valid request')
    }
}

function getAllTodos(req, res) {
    axios.get(process.env.DB_TODO_ENDPOINT)
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
        axios.put(`${process.env.DB_TODO_ENDPOINT}/${tid}`, newData)
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
        axios.delete(process.env.DB_TODO_ENDPOINT+'/'+tid)
        .then(axiosRes=>{
            res.json("Todo deleted successfully")
        })
        .catch(axiosErr=>{
            res.status(axiosErr.response.status).json(axiosErr.message)
        })
    }
    else{
        res.status(400).json("You must provide an ID to delete the 'todo' ")
    }
}


module.exports = {createTodo, getAllTodos, editTodo, deleteTodo}