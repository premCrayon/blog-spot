const express = require("express");
const router = express.Router();
const MessageRouter = require("../schema/message");
const UserRouter = require("../schema/userSchema");
//create
router.post("/create", async (req, res) => {

    var data = new MessageRouter({
        message: req.body.message,
        users: [req.body.from, req.body.to],
        senders: req.body.from,
        recevier: req.body.to,
        is_active: true,
        is_read: false
    });
    let response = await data.save();
    if (!response) {
        return res.json({ type: "failed", statuscode: 500, message: "Mesg Creation Failed" })
    }
    return res.json({ type: "success", statuscode: 201, message: "Msg Creation Successfully" })
});
//getByid
router.post("/get", async (req, res) => {
    const from = req.body.from;
    const to = req.body.to
    let unread = await MessageRouter.updateMany({ users: [from, to] }, { is_read: true }, { new: true })
    console.log(unread)
    var messages = await MessageRouter.find({
        users: {
            $all: [from, to]
        },
        is_active: true
    }).sort({ updatedAt: 1 })

    const projectedMessages = messages.map((msg) => {
        return {
            fromSelf: msg.senders.toString() === from,
            message: msg.message,
            createddat: msg.createTime,
            id: msg._id,
            imageUrl: msg.imageUrl,
            from: msg.senders,
            to: msg.recevier,
            is_active: msg.is_active
        }
    })
    res.json(projectedMessages);
});
const getUserMessage = async (user_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await MessageRouter.find({
                $or: [
                    { 'senders': user_id },
                    { 'recevier': user_id }
                ]
            })
            resolve(result)
        }
        catch (err) {
            reject(err)
        }
    })
}
//get chat by user
router.post("/getChat", async (req, res) => {
    const user_id = req.body.user_id;
    console.log(user_id)
    const user = await UserRouter.find({ _id: { $ne: user_id } })

    let userData = []
    for (let i = 0; i < user.length; i++) {
        let msg = await getUserMessage(user[i]._id)
        userData.push({
            name: user[i].name,
            id: user[i]._id,
            avatar: user[i].avatar,
            msg,

        })
    }
    let result = userData.filter((val) => val.msg.length > 0)
    res.json(result)

});
//commment
router.get("/", (req, res) => {
    res.json("i am from router");
});
//delete msg
router.put("/del", async (req, res) => {
    var msg = await MessageRouter.findById(req.body.id);
    if (!msg) {
        res.json({ message: "No Message Found with given id" });
    }
    var update = await MessageRouter.findByIdAndUpdate(
        { _id: msg._id },
        {
            is_active: false
        }
    );
    res.json(update);
});
module.exports = router;
