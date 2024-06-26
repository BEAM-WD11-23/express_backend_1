var { default: axios } = require("axios")

async function deleteNote(request, response) {
    const tid = request.params.tid
    const nid = request.params.nid

    if(tid && nid){
        try{
            const { data:todo } = await axios.get(process.env.DB_TODO_ENDPOINT+"/"+tid)
            const updatedTodo = {...todo, notes:todo.notes.filter(note => note.nid !== nid)}
            const { data:newUpdatedTodo } = await axios.put(process.env.DB_TODO_ENDPOINT+"/"+tid, updatedTodo)

            response.json(newUpdatedTodo)

        }
        catch(err){
            response.status(err.response.status).json(err.message)
        }
    }
    else{
        response.status(400).json("Missing tid or nid.")
    }
}

module.exports = { deleteNote }