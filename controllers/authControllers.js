var jwt = require('jsonwebtoken')

const db = [
    {uid:'u0001',username:'relando', name: 'Relando Vrapi', password: 'wd@1123'},
    {uid:'u2222',username:'john', name: 'John Smith', password: 'wd@1123'},
    {uid:'u7777',username:'sarah', name: 'Sarah Smith', password: 'wd@1123'},
]


function login(request, response){
    const { username, password } = request.body


    if(!username || !password) response.status(400).json("Missing credentials")
    else {
        const foundUser = db.find(user => user.username === username)

        if(foundUser && foundUser.password === password){
            delete foundUser.password
            const token = jwt.sign(foundUser, process.env.JWT_SECRET, { expiresIn:'3m' })
            const cookieOptions = [
                'token=' + token,
                'HttpOnly',
                'SameSite=None',
                'Secure' // Ensure this is true for HTTPS
            ].join('; ');
        
            response.setHeader('Set-Cookie', cookieOptions);
            response.json(foundUser)
        }
        else {
            response.status(401).json("Username or password is incorrect.")
        }
    }
}

function check(request, response){
    const token = request.cookies.token

    if(!token) return response.status(401).json("User not logged in")
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        response.json(decoded)
    }
    catch(err){
        response.status(401).json("User not logged in")
    }
}

module.exports = { login, db, check }