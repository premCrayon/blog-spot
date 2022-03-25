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
//delete 
router.delete("/del", async (req, res) => {
  var delData = await SavedRouter.findOneAndRemove(req.params.id).then((e) => {
    res.json({ message: "deleted successfully" });
  });
  res.json(delData);
});
module.exports = router;
