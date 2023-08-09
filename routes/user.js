const router = require("express").Router();
const userController = require('../controllers/user')

router.post("/user-add",userController.addUser);
router.post("/login",userController.loginUser);



module.exports = router;