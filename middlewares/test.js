

function test(req, res, next){
    if(Object.keys(req.body).length === 0) res.status(400).json("Some message")
    next()
}