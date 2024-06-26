
function validateTodoMiddleware(request, response, next){
    const todoData = request.body
    
    if(Object.keys(todoData).length !== 0){
        if(todoData.title && todoData.title.length >= 3 && todoData.description && todoData.description.length >= 5){
            next()
        }
        else{
            response.status(415).json("You must provide valid todo data: title min 3 chars, description min 5 chars.")
        }
    }
    else{
        response.status(400).json("You must provide todo data before saving it.")
    }
}


module.exports = { validateTodoMiddleware }