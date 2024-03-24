const express = require('express');
const tryCatch = require('../middlewares/tryCatch');
const { register, login, dashboard } = require('../controllers/userController');
const checkAuth = require('../middlewares/checkAuth');
const router = express.Router();

router.post('/register', tryCatch(register));
router.post('/login', tryCatch(login));
router.get('/dashboard', checkAuth, tryCatch(dashboard));

module.exports = router;
