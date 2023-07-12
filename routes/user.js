const router = require("express").Router();
const notificationController = require('../controllers/user')

router.post("/user-add",notificationController.addUser);
router.get("/get-user",notificationController.getAllUser);


module.exports = router;