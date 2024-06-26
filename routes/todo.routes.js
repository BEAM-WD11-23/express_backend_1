var express = require('express');
var router = express.Router()
var todoController = require('../controllers/todoControllers');

// Frontend wants to save a todo in backend. [http://localhost:4000/api/todos]
// Prerequisities: new Todo Data
router.post('/', todoController.createTodo)

// Frontend wants to access all the todos in the database
router.get('/', todoController.getAllTodos)

// Frontend wants to update a specific todo
// Prerequisities: Todo ID, Todo new Data.
router.put("/:tid", todoController.editTodo)

// Frontend wants to delete a specific todo
// Prerequisities: Todo ID
router.delete("/:tid", todoController.deleteTodo)

module.exports = { router }