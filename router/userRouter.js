const router = require('express').Router();
const {register, login, getAll, getValById, updateUser, deleteUser} = require('../controller/userController')


router.post('/register', register);
router.post('/login', login);
router.get('/getAllUser', getAll);
router.post('/getUserById', getValById);
router.post('/updateUser', updateUser);
router.post('/deleteUser', deleteUser);







module.exports=router;