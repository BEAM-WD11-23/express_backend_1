var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var todoRoutes = require("./routes/todo.routes")
var noteRoutes = require("./routes/note.routes")
var authRoutes = require("./routes/auth.routes")
var cors = require('cors')

var { protectedMW } = require('./middlewares/authMiddleware')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())

// CRUD:::>> GET, POST, PUT, DELETE

app.use('/api/todos', todoRoutes.router)
app.use('/api', noteRoutes.router)
app.use('/auth', authRoutes.router)

app.get('/', (req, res) => res.send('<h1>Welcome to Todo BACKEND</h1>'))

app.get('/dashboard', protectedMW, (req, res) => {
    res.json(req.user)
})

module.exports = app;