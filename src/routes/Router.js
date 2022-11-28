const router = require('express').Router();

router.use('/api/v1/users', require('./UserRouter'));

module.exports = router;
