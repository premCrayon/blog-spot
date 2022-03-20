const express = require("express");
const router = express.Router();
const BlogRouter = require("../schema/blogSchema");
const CommentRouter = require("../schema/commentsSchema");
//create
router.post("/create", async (req, res) => {
  var data = new BlogRouter({
    title: req.body.title,
    discription: req.body.discription,
    post: req.body.post,
    user: req.body.userId,
  });
  let response = await data.save();

  if(!response){
    return res.json({type:"failed",statuscode:500,message:"Post Creation Failed"})


  }

   return res.json({type:"success",statuscode:201,message:"Post Creation Successfully"})
});
//getByid
router.get("/get", async (req, res) => {
  const user = req.query.id;
  var findData = await BlogRouter.find({ user }).populate([{ path: "user" }]);
  res.json(findData);
});
//getpost
router.get("/getpost", async (req, res) => {
  const postId = req.query.id;
  console.log(postId)
  var findData = await BlogRouter.findOne({ _id: postId }).populate([{ path: "user", select: ['name', 'avatar'] }])
  var findComment = await CommentRouter.find({ post: postId }).populate([{ path: "user", select: ['name', 'avatar'] }])
  res.json({
    data: findData,
    comment:findComment
  });
});
//getAll
router.get("/getall", async (req, res) => {
  const limit = req.query.limit;
  const skip = req.query.skip
  var findData = await BlogRouter.find().populate([{ path: "user" }]).sort([['createTime','descending']]).skip(skip).limit(limit)
  res.json(findData);
});
//update
router.put("/update", async (req, res) => {
  // console.log(req);
  var task = await BlogRouter.findById(req.body._id);

  console.log(task);

  if (!task) {
    res.json({ message: "No task Found with given id" });
  }

  var update = await BlogRouter.findByIdAndUpdate(
    { _id: task._id },
    {
      task: req.body.task,
      completed: req.body.completed,
    }
  );
  res.json(update);
});
//deleter
router.delete("/del", async (req, res) => {
  var delData = await BlogRouter.findOneAndRemove(req.params.id).then((e) => {
    res.json({ message: "deleted successfully" });
  });

  res.json(delData);
});
router.get("/", (req, res) => {
  res.json("i am from router");
});
module.exports = router;
