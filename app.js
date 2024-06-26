var axios = require('axios');

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var todoController = require('./controllers/todoControllers');
var noteController = require('./controllers/noteControllers');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// CRUD:::>> GET, POST, PUT, DELETE

// Frontend wants to save a todo in backend. http://localhost:4000/api/todos
// Prerequisities: new Todo Data
app.post('/api/todos', todoController.createTodo)

// Frontend wants to access all the todos in the database
app.get('/api/todos', todoController.getAllTodos)

// Frontend wants to update a specific todo
// Prerequisities: Todo ID, Todo new Data.
app.put("/api/todos/:tid", todoController.editTodo)

// Frontend wants to delete a specific todo
// Prerequisities: Todo ID
app.delete("/api/todos/:tid", todoController.deleteTodo)

// Frontend wants to delete a specific Note from a specific Todo
// Prerequisities: Todo ID, Note ID

app.delete("/api/todo/:tid/note/:nid", noteController.deleteNote)


module.exports = app;

// How frontend is sending the request
// fetch(`http://localhost:4000/api/todos/${id}`, {
//     method:"PUT",
//     headers: {
//         "Content-Type": "application/json"
//     },
//     body: JSON.stringify(newData)
// })