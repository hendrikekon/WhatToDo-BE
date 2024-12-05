const router = require('express').Router();
const todosController= require('./controller');

router.get('/todos', todosController.show);

router.post('/todos', todosController.store);

router.patch('/todos/:id', todosController.update);

router.delete('/todos/:id', todosController.destroy);

module.exports = router;