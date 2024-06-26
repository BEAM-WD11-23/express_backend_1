var express = require('express');
var router = express.Router()
var noteController = require('../controllers/noteControllers');

// Frontend wants to delete a specific Note from a specific Todo
// Prerequisities: Todo ID, Note ID
router.delete("/todo/:tid/note/:nid", noteController.deleteNote)


module.exports = { router }