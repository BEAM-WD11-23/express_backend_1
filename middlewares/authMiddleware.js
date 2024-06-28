var jwt = require('jsonwebtoken')

function authProtected(request, response, next){
    const token = request.cookies.token

    if(!token) return response.status(401).json("You are not authorized, please log in.")

    try {
        jwt.verify(token, process.env.JWT_SECRET)
        next()
    }
    catch(err){
        response.status(401).json("You are not authorized, please log in.")
    }
}


module.exports = { authProtected }