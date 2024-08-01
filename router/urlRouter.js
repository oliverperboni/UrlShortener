const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const urlController = require('../controller/urlController');
const userController = require('../controller/userController');

router.get('/:shortUrl', urlController.redirectToLongUrl);


router.post('/shorten', authMiddleware, urlController.shortenUrl);

router.post('/login', userController.loginUser);
router.post('/register', userController.registerUser);

module.exports = router;
