const router = require("express").Router();
const User = require("../schema/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const BlogRouter = require("../schema/blogSchema");
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
    
    var userToken = jwt.sign({ email: userData.email,id:userData._id }, "securedata");

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
router.get("/getAll", validUser, async (req, res) => {
  jwt.verify(req.token, "securedata", async (err, data) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const data = await User.find();
      res.json(data);
    }
  });
});

//get user details
router.get("/userDetails", async (req, res) => {
  const user = req.query.id;
  var findBlog = await BlogRouter.find({ user }).populate([{ path: "user" }]);
  var findData = await User.findOne({ _id:user });
  res.json({
    userDetails: findData,
    userPosts:findBlog
  });
});
//update uer details
router.put("/update", async (req, res) => {
  // console.log(req);
  var user = await User.findById(req.body.id);
  console.log(user);
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
