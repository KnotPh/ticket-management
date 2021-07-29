const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const moment = require('moment-timezone');
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.SECRET_KEY
        ).toString(),
        email: req.body.email,
        age:req.body.age,
        fullName:req.body.full_name,
        isAvtive:req.body.is_active,
    });
    try {
        let user = await newUser.save();
        console.log(moment(user.createdAt).format('MM-DD-YYYY H:m:s'))
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});


//LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
      !user && res.status(401).json("Wrong password or username!");
  
      const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
      const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
  
      originalPassword !== req.body.password &&
        res.status(401).json("Wrong password or username!");
  
      const accessToken = jwt.sign(
        { id: user._id},
        process.env.SECRET_KEY,
        { expiresIn: "5d" }
      );
  
      const { password, ...info } = user._doc;
      const createdAt = moment(user.createdAt).format('MM-DD-YYYY H:m:s');
      const updatedAt = moment(user.updatedAt).format('MM-DD-YYYY H:m:s');
      res.status(200).json({ ...info, accessToken,createdAt, updatedAt});
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;