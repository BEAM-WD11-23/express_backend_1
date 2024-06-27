var jwt = require("jsonwebtoken")


function protectedMW(req, res, next){
    const token = req.cookies.token
    try{
        req.user = jwt.verify(token, process.env.JWT_SECRET)
        next()
    }
    catch(err){
        res.status(401).json("User not authorized.")
    }
}

module.exports = { protectedMW }