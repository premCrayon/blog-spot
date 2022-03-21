const express = require("express");
const router = express.Router();
const LikeRouter = require("../schema/likeSchema");
//create
router.post("/create", async (req, res) => {
  console.log("ind")
  var data = new LikeRouter({
    likedBy:req.body.likedBy,
    post: req.body.postId,
    user: req.body.userId,
  });
  let response = await data.save();
  if(!response){
    return res.json({type:"failed",statuscode:500,message:"Like Creation Failed"})
  }
   return res.json({type:"success",statuscode:201,message:"Like Creation Successfully"})
});
//getByid
router.get("/get", async (req, res) => {
  const user = req.query.id;
  var findData = await LikeRouter.find({ user }).populate([{ path: "user" }]);
  res.json(findData);
});
//getAll
router.get("/getall", async (req, res) => {
  const limit = req.query.limit;
  const skip = req.query.skip
  var findData = await LikeRouter.find().populate([{ path: "user" }])
  res.json(findData);
});

router.get("/", (req, res) => {
  res.json("i am from router");
});
module.exports = router;
