const express = require("express");
const router = express.Router();
const SavedRouter = require("../schema/savedblogschema");
//create
router.post("/create", async (req, res) => {
  var data = new SavedRouter({
    post: req.body.postId,
    user: req.body.userId,
    is_active:true,
  });
  let response = await data.save();
  if(!response){
    return res.json({type:"failed",statuscode:500,message:"Saved Creation Failed"})
  }
   return res.json({type:"success",statuscode:201,message:"Saved Creation Successfully"})
});
//getByid
router.get("/get", async (req, res) => {
  const user = req.query.id;
  var findData = await SavedRouter.find({ user }).populate([{ path: "user" }]);
  res.json(findData);
});
//getAll
router.get("/getall", async (req, res) => {
  const limit = req.query.limit;
  const skip = req.query.skip
  var findData = await SavedRouter.find().populate([{ path: "user" }])
  res.json(findData);
});
//update 
router.put("/update", async (req, res) => {

  var data = await SavedRouter.findById(req.body._id);
  if (!data) {
    res.json({ message: "No data Found with given id" });
  }
  var update = await SavedRouter.findByIdAndUpdate(
    { _id: data._id },
    {
      is_active:false
    }
  );
  res.json(update);
});
router.get("/", (req, res) => {
  res.json("i am from router");
});
router.delete("/del", async (req, res) => {
  var delData = await SavedRouter.findOneAndRemove(req.params.id).then((e) => {
    res.json({ message: "deleted successfully" });
  });

  res.json(delData);
});
module.exports = router;
