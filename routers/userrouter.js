const router = require("express").Router();
const User = require("../schema/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const BlogRouter = require("../schema/blogSchema");
const SavedRouter = require("../schema/savedblogschema");

//Register
router.post("/register", async (req, res) => {
  try {
    var emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
      return res.status(400).send({
      type: "rejected",
      message: "Logged In Successfully!",
      });
    }
    //Password hash
    var hash = await bcrypt.hash(req.body.password, 10);
    var user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hash,
      phone: req.body.phone,
      avatar:req.body.avatar
    });
    var data = await user.save();
    res.json(data);
  } catch (err) {
    res.status(400).json(err);
  }
});
//Login
router.post("/login", async (req, res) => {
  try {
    var userData = await User.findOne({ email: req.body.email });
    if (!userData) {
      return res.status(400).json("Email not exist");
    }
    var validPsw = await bcrypt.compare(req.body.password, userData.password);

    if (!validPsw) {
      return res.status(400).json("Password not valid");
    }
    
    var userToken = jwt.sign({ id:userData._id,avatar:userData.avatar,name:userData.name }, "securedata");

    res.status(200).send({
      type: "success",
      message: "Logged In Successfully!",
      token: userToken,
    });
  } catch (err) {
    res.status(400).json(err.message);
   
  }
});
const validUser = (req, res, next) => {
  var token = req.header("auth");
  req.token = token;
  next();
};
router.get("/getAll/:token", validUser, async (req, res) => {
  const userToken = req.params.token;
  console.log(userToken)
   jwt.verify(userToken, "securedata", async (err, data) => {
    if (err) {
      res.sendStatus(403);
    } else {
      //const data = await User.find().select(['name','email','_id','avatar'])
      const deconded = jwt.decode(userToken)
  try {
    const users=await User.find({_id:{$ne:deconded.id}}).select(['name','email','_id','avatar'])
   res.json(users);
  } catch (err) {
    console.log(err)
  }
     
    }
   });
  
});

//get user details
router.get("/userDetails", async (req, res) => {
  const user = req.query.id;
  var findBlog = await BlogRouter.find({ user }).populate([{ path: "user" }]);
  var findData = await User.findOne({ _id: user });
  var findsaved = await SavedRouter.find({user }).populate([{ path: "post" }]);
  console.log(findsaved)
  res.json({
    userDetails: findData,
    userPosts: findBlog,
    saved:findsaved
  });
});
//get user while chat
router.get("/userchat", async (req, res) => {
  const user = req.query.id;
  var findData = await User.findOne({ _id: user }).select(['name','email','_id','avatar'])
  res.json(findData);
});
//update uer details
router.put("/update", async (req, res) => {
  // console.log(req);
  var user = await User.findById(req.body.id);
  
  if (!user) {
    res.json({ message: "No task Found with given id" });
  }
  var update = await User.findByIdAndUpdate(
    { _id: user._id },
    {
      name: req.body.name,
      avatar: req.body.avatar,
    }
  );
  res.json(update);
});
module.exports = router;
