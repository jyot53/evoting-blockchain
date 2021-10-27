const express = require("express");
const router = express.Router();
const User = require("../db/schemas/userSchema");
const Aadhar = require("../db/schemas/aadharSchema");
const bcryptjs = require("bcryptjs");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
const cors = require("cors");
// const jwt = require('jsonwebtoken');

router.get("/",  (req, res) => {
  res.send("hello from home page webjs!!!");
});

router.post("/register", async (req, res) => {
  const { name, email, aadhar, password, cpassword } = req.body;
  if (!name || !email || !aadhar || !password || !cpassword) {
    return res.status(401).json({ warning: "All fields are compulsory" });
  }

  const aadharExist = await Aadhar.findOne({ aadharNo: aadhar });
  if (aadharExist) {
    if (aadharExist.email == email && aadharExist.name == name) {
        
        try {
            const userExist = await User.findOne({ email: email });
        if (userExist) {
          return res.status(401).json({ error: "User Already exists" });
        }
        if (password != cpassword) {
          return res
            .status(401)
            .json({ error: "Password and Confirm Password are different" });
        }
        const user = new User({ name, email, aadhar, password, cpassword });
        await user.save(); //save to database
        return res.status(201).json({ message: "User Registered" });
        } catch (error) {
            return res.status(501).json({ error: "Server Error " + err });  
        }

        
    

      // return res.status(201).json({message:"User Registered"});
      // return res.status(501).json({error:"Server Error "+ err});
    } else {
      return res.status(401).json({ error: "Wrong Aadhar Number" });
    }
  }
});

router.get("/signin" , (req, res) => {
  if(req.session.user){
    return res.status(201).json({ message: true , user: req.session.user});
  }
  return res.status(401).json({ message: false});
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({ warning: "All fields are compulsory" });
  }

  // expires:new Date(new Date.now() + 25892000000),
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      const ismatch = await bcryptjs.compare(password, userExist.password);
      if (!ismatch) {
        return res.status(401).json({ error: "Invalid Credentials" });
      } else {
        // const token = await userExist.generateAuthToken();
        // res.cookie("jwtoken", token, {
        //   httpOnly: true,
        // });
        req.session.user = userExist;
        return res.status(201).json({ message: "User Logged-In" , user: userExist });
      }
    } else {
      return res.status(401).json({ error: "Invalid Credentials" });
    }
  } catch (err) {
    return res.status(501).json({ error: "Server Error " + err });
  }
});

router.post("/addUser", async (req, res) => {
  const { aadharNo, phone, email, age, name } = req.body;
  if (!aadharNo || !name || !age || !email || !phone) {
    return res.status(401).json({ warning: "All fields are compulsory" });
  }

  try {
    const userExist = await Aadhar.findOne({ aadharNo: aadharNo });
    if (userExist) {
      return res.status(401).json({ error: "User Already exists" });
    }
    const user = new Aadhar({ aadharNo, phone, email, age, name });
    await user.save();
    return res.status(201).json({ message: "User Registered" });
  } catch (err) {
    return res.status(501).json({ error: "Server Error " + err });
  }
});

router.post("/verifyUser", async (req, res) => {
  const { aadharNo } = req.body;
  if (!aadharNo) {
    return res.status(401).json({ warning: "All Fields Are Compulsory" });
  }

  const aadharExist = await Aadhar.findOne({ aadharNo: aadharNo });
  if (aadharExist) {
    // console.log(aadharExist.email);
    return res
      .status(201)
      .json({
        message: "User Verified Enter OTP sent to the linked mobile number",
      });
  } else {
    return res.status(401).json({ error: "Check Your Aadhar Number" });
  }
});

router.post("/send_mail", cors(), async (req, res) => {
  const { aadhar } = req.body;
  const otp = otpGenerator.generate(5, {
    upperCase: false,
    specialChars: false,
    alphabets: false,
    digits: true,
  });
  const aadharUser = await Aadhar.findOne({ aadharNo: aadhar });

  if (aadharUser) {
    var transport = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.PORT,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transport.sendMail({
      from: process.env.MAIL_FROM,
      to: aadharUser.email,
      subject: "One Time Password For Voting Registraiton",
      html: `<h2>Your OTP is <span style=" font-weight: bolder;"> ${otp}  </span> and it will expire in 5 mins</h2>`,
    });
    return res
      .status(201)
      .json({ message: "OTP Sent to linked email id", serverotp: otp });
  } else {
    return res.status(201).json({ error: "Invalid Aadhar Number" });
  }
});

module.exports = router;
