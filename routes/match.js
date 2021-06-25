const matchController = require('../controllers/match');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.post('/', auth, matchController.addMatch);

router.get('/:id', auth, matchController.getOne);

router.get('/all', matchController.getAll);

router.delete('/:id', auth, matchController.deleteOne);

router.put('/:id', auth, matchController.updateOne);

module.exports = router;
