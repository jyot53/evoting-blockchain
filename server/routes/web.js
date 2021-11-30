const express = require("express");
const router = express.Router();
const User = require("../db/schemas/userSchema");
const Aadhar = require("../db/schemas/aadharSchema");
const Contact = require("../db/schemas/contactSchema");
const Mapping = require("../db/schemas/mappingSchema");
const bcryptjs = require("bcryptjs");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
const cors = require("cors");
// const jwt = require('jsonwebtoken');

router.get("/", (req, res) => {
    res.send("hello from home page webjs!!!");
});

router.post("/register", async(req, res) => {
    console.log("register called");
    const { name, email,gender, aadhar, password, cpassword } = req.body;
    if (!name || !email || !gender || !aadhar || !password || !cpassword) {
        return res.status(401).json({ warning: "All fields are compulsory" });
    }

    if(gender != "Male" && gender != "Female"){
        return res.status(401).json({ error: "Gender must be Male or Female" });
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
                const user = new User({ name, email,gender, aadhar, password, cpassword });
                await user.save(); //save to database
                return res.status(201).json({ message: "User Registered" });
            } catch (error) {
                return res.status(501).json({ error: "Server Error " + error });
            }


            // return res.status(201).json({message:"User Registered"});
            // return res.status(501).json({error:"Server Error "+ err});
        } else {
            return res.status(401).json({ error: "Wrong Aadhar Details" });
        }
    }else{
        return res.status(401).json({ error: "Wrong Aadhar Number" });
    }
});

router.post("/get_details", async(req, res) => {

    const { email } = req.body;
    const user = await User.findOne({ email });
    return res.status(201).json({ message: true, user });

});

router.post("/signin", async(req, res) => {
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
                return res.status(201).json({ message: "User Logged-In", user: userExist });
            }
        } else {
            return res.status(401).json({ error: "Invalid Credentials" });
        }
    } catch (err) {
        return res.status(501).json({ error: "Server Error " + err });
    }
});

router.post("/addUser", async(req, res) => {
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


router.post('/change_status', async(req, res) => {
    const { email } = req.body;
    try {
        const updatedUser = await User.findOneAndUpdate({ email: email }, { status: true }, { new: true }, (e) => {
            console.log(e);
        });

        User.save();
        return res.status(201).json({ message: "User voting status updated" });
    } catch (error) {
        return res.status(501).json({ error: "Server Error " + error });
    }
})

router.post('/change_register', async(req, res) => {
    const { email } = req.body;
    try {
        const updatedUser = await User.findOneAndUpdate({ email: email }, { isregister: true }, { new: true }, (e) => {
            console.log(e);
        });

        User.save();
        return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        return res.status(501).json({ error: "Server Error " + error });
    }
})

// router.post("/addUser1", async (req, res) => {
//   const { aadharNo, accountaddress } = req.body;
//   if (!aadharNo || !accountaddress) {
//     return res.status(401).json({ warning: "All fields are compulsory" });
//   }

//   try {
//     const userExist = await Aadhar.findOne({ aadharNo: aadharNo });
//     if (userExist) {
//       return res.status(401).json({ error: "User Already exists" });
//     }
//     const user = new Mapping({ aadharNo, accountaddress });
//     await user.save();
//     return res.status(201).json({ message: "User Registered" });
//   } catch (err) {
//     return res.status(501).json({ error: "Server Error " + err });
//   }
// });

router.post("/verify_user", async(req, res) => {
    const { aadharNo, accountaddress } = req.body;
    if (!aadharNo || !accountaddress) {
        return res.status(401).json({ warning: "All Fields Are Compulsory" });
    }

    const mappingExist = await Mapping.findOne({ aadharNo: aadharNo, accountaddress: accountaddress });
    if (mappingExist) {
        // console.log(aadharExist.email);
        return res.status(201).json({ message: "User Verified" });
    } else {
        return res.status(401).json({ error: "Check Your Aadhar Number or Account address" });
    }
});

router.post("/send_mail", cors(), async(req, res) => {
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


router.post("/generate_otp", (req, res) => {

    const otp = otpGenerator.generate(5, {
        upperCase: false,
        specialChars: false,
        alphabets: false,
        digits: true,
    });
    // console.log(otp);
    return res.status(201).json({ serverotp: otp });
});

router.post("/contact_form", async(req, res) => {
    const { name, email, message } = req.body;
    // console.log("contact form");
    if (!name || !email || !message) {
        return res.status(401).json({ warning: "Message field cannot be empty" });
    }
    try {
        const contact = new Contact({ name, email, message });
        await contact.save();
        return res.status(201).json({ message: "Your message has been sent, We will get back to you as soon as possible." });
    } catch (error) {
        return res.status(501).json({ error: "Server Error " + error });
    }
});

router.post("/admin_register", async (req, res) => {
    // const registerusers = await User.find({})
});

router.post("/all_users" , async (req, res) => {
    const users = await User.find();
    // console.log(users);
    /*.toArray( function (err,res) {
         if(err) console.log("Error is "  + err);
         console.log(JSON.stringify(res));
         return res.status(201).json({users: res});
     } ) */
   const agg = await User.aggregate([{ $lookup:
        {
          from: 'mappings',
          localField: 'aadhar',
          foreignField: 'aadharNo',
          as: 'usermapping'
        }
      }
     ]);
     //agg[0].usermapping[0].accountaddress
     return res.status(201).json({users: agg});
});


module.exports = router;