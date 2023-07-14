//const express = require('express')
//const router = express.Router()

const router = require("express").Router();

const UserController = require('../controllers/UserController')
const UserResetPassController = require('../controllers/UserResetPassController')


//middleware
const verifyToken = require('../helpers/verify-token')
const {imageUpload} = require("../helpers/image-upload")

router.post('/forgot_pass', UserResetPassController.forgotPass)
router.post('/reset_pass', UserResetPassController.resetPass)
router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/checkuser', UserController.checkUser)
router.get('/:id', UserController.getUserById)
router.patch('/edit/:id', verifyToken, imageUpload.single('image'), UserController.editUser)


module.exports = router