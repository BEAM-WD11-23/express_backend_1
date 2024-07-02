var { getAllUsers } = require("../services/user.service")

async function allUsers(req, res){
    try {
        const allUsers = await getAllUsers()
        res.json(allUsers)
    }
    catch(error){
        res.status(500).json(error.message)
    }

}


module.exports = { allUsers }