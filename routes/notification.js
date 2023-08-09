const router = require("express").Router();
const notificationController = require('../controllers/notification')
const {ValidateToken} = require('../middleware/token')

router.post("/add-notification",ValidateToken,notificationController.notification);
router.patch("/:id",ValidateToken,notificationController.editNotification);
router.get("/",ValidateToken,notificationController.userNotification);
router.get("/readAll",ValidateToken,notificationController.readAllNotification);



module.exports = router;
