const Notification = require("../model/notification");
const User = require("../model/user");

const notification = async (req, res) => {
    try {
        const { Department, message } = req.body;
        const notification = await Notification.create({
            Department, message
        });
        console.log(notification, "notificationnotification");
        return res.status(201).json({
            message: "Notification sent successfully", notification: notification
        })
    }
    catch (error) {
        return res.status(400).json({ error });
    }
};

const userNotification = async (req, res) => {
    try {
        const { _id } = req.currentUser
        const data = await User.findOne({ _id })
        console.log(data, "data<<<<");
        let conn = {}
        conn = { Department: data.Department }
        console.log(conn, "conn.....");
        const filterdata = await Notification.find(conn)
        const newCount = filterdata.filter((el) => !el.isRead)
        return res.status(200).json({ data: filterdata, count: newCount.length });
    } catch (error) {
        return res.status(500).json({ message: "internal server error" });
    }
};

const editNotification = async (req, res) => {
    try {
        const { id } = req.params
        const data = await Notification.findOneAndUpdate(
            {
                _id: id
            },
            {
                $set: {
                    isRead: true
                }
            },
            {
                new: true
            }
        )
        return res.status(200).json({ data })
    } catch (error) {
        console.log(error, 'error.......');
        return res.status(500).json({ error });
    }
}


const readAllNotification = async (req, res) => {
    try {
        const updateResult = await Notification.updateMany({ isRead: true });
        console.log(updateResult, "updateResult.....<<<<<");
        return res.status(200).json({ message: "All notifications marked as read successfully." });
    } catch (error) {
        console.log(error, 'error.......');
        return res.status(500).json({ error });
    }
}

module.exports = {
    notification,
    userNotification,
    editNotification,
    readAllNotification
}
