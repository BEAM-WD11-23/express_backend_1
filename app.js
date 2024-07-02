var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var todoRoutes = require("./routes/todo.routes")
var noteRoutes = require("./routes/note.routes")
var userRoutes = require("./routes/user.routes")
var cors = require('cors');
var { authProtected } = require('./middlewares/authMiddleware');
var authController = require('./controllers/authControllers')


app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// CRUD:::>> GET, POST, PUT, DELETE
// This checks/verifies the token
app.use('/api/todos', authProtected, todoRoutes.router)
app.use('/api', noteRoutes.router)
app.use('/api', userRoutes.router)

// This creates a token
app.post('/auth/login', authController.login)

app.get('/auth/check', authController.check)

app.get('/', (req, res) => res.send('<h1>Welcome to Todo BACKEND</h1>'))

module.exports = app;