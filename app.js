var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var todoRoutes = require("./routes/todo.routes")
var noteRoutes = require("./routes/note.routes")
var cors = require('cors')



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
    "origin": 'http://localhost:3000',
    "methods": "POST"
}))

// CRUD:::>> GET, POST, PUT, DELETE

app.use('/api/todos', todoRoutes.router)
app.use('/api', noteRoutes.router)

app.get('/', (req, res) => res.send('<h1>Welcome to Todo BACKEND</h1>'))

module.exports = app;