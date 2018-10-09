const express = require('express');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.use(authMiddleware);

//when the user is already authenticated
router.get('/', (req, res) => {
	res.send({ ok: true, user: req.userId });

});

module.exports = app => app.use('/projects', router);
