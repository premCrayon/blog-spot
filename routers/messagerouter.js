const express = require("express");
const router = express.Router();
const MessageRouter = require("../schema/message");
//create
router.post("/create", async (req, res) => {

    var data = new MessageRouter({
        message: req.body.message,
        users: [req.body.from, req.body.to],
        senders: req.body.from,
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
    var messages = await MessageRouter.find({
        users: {
            $all: [from, to]
        }
    }).sort({ updatedAt: 1 })
    const projectedMessages = messages.map((msg) => {
        return {
            fromSelf: msg.senders.toString() === from,
            message: msg.message,
            createddat: msg.createTime,
            id: msg._id
        }
    })
    res.json(projectedMessages);
});
//commment
router.get("/", (req, res) => {
    res.json("i am from router");
});
module.exports = router;
