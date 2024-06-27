var express = require('express');
var router = express.Router()
var jwt = require('jsonwebtoken')

const db = [
    {
        uid: 'u101',
        username: "relando",
        name: "Relando Vrapi",
        age: "28",
        email: "thevrapi@gmail.com",
        password: "wd@1123"
    },
    {
        uid: 'u122',
        username: "john",
        name: "John Doe",
        age: "44",
        email: "johnd@gmail.com",
        password: "john@2024"
    },
    {
        uid: 'u444',
        username: "tinna",
        name: "Tinna Smith",
        age: "34",
        email: "tsmith@gmail.com",
        password: "tinna@2024"
    }
]

router.post('/login', (request, response) => {
    const {username, password} = request.body

    if(username && password){
        const foundUser = db.find(user => user.username === username)

        if(foundUser && foundUser.password === password){
            // Code if username and password are both correct
            delete foundUser.password
            const token = jwt.sign(foundUser, process.env.JWT_SECRET, { expiresIn: '1h' })

            response.cookie('token', token, { httpOnly: true})

            response.json('User logged in successfully')
        }
        else{
            response.status(401).json("Username or password is incorrect.")
        }
    }
    else{
        response.status(400).json("You must provide a username and password.")
    }
})

router.post('/register', (request, response) => {

})

router.get('/logout', (request, response) => {

})



module.exports = { router }