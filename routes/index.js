const express = require('express');
const controllers = require('../controllers')

const router = express.Router();

router.route('/')
  .get(controllers.getAllTodos)
  .post(controllers.createTodo);

router.route('/:id')
  .get(controllers.getTodo)
  .put(controllers.updateTodo)
  .delete(controllers.deleteTodo);

  router.route('/:id/status')
  .put(controllers.completeTodo);

module.exports = router;