const router = require('express').Router();

const { register, login, update } = require('../controllers/UserController');

const authGuard = require('../middlewares/authGuard');

router.post('/register', register);
router.post('/login', login);
router.patch('/', authGuard, update);

module.exports = router;
