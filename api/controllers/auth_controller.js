const validator = require("validator");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/auth_model");

// encrypt password
const encryptPassword = (password) => {
  return CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString();
};
// decrypt password
const decryptPassword = (password) => {
  return CryptoJS.AES.decrypt(password, process.env.PASS_SEC).toString(
    CryptoJS.enc.Utf8
  );
};

// create transporter for sending email
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "oghenerookerri@gmail.com",
    pass: "qmtedgblfmsjmysr",
  },
});

// send login success email
const sendLoginSuccessEmail = (userEmail, User) => {
  const mailOptions = {
    from: "oghenerookerri@gmail.com",
    to: userEmail,
    subject: "Successfully loggedIn",
    html: `<h2>Successfully LoggedIn</h2>
    <p>Dear ${User.fname} you have successfully logged into your account. If you do not recognize this action, <a href="http://localhost:3000/send-message">Contact Us</a></p>`,
  };

  // return transporter.sendMail(mailOption)
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent successfully:", info.response);
    }
  });
};

// register user
const register = async (req, res) => {
  // destructure the inputs from request form(body)
  const { fname, lname, email, password } = req.body;

  //   check if all fields are filled
  try {
    if (!fname || !lname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // check if email is valid
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Email is not valid" });
    }
    // check if email is existing
    const isEmailExisting = await User.findOne({ email: email });
    if (isEmailExisting) {
      return res.status(400).json({ message: "Email is already in use!" });
    }
    // if the user passes the things at the top it then craete a new user
    const newUser = new User({
      fname: fname,
      lname: lname,
      email: email,
      password: encryptPassword(password),
    });
    // save user

    await newUser.save();

    res.status(201).json({ message: "You're Now Registered" });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Error registering user", err });
  }
};

// login user
const login = async (req, res) => {
  // destructure the inputs from request form(body)
  const { email, password } = req.body;

  try {
    //   check if all fields are filled
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // check if email is registered
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "Email is not registered" });
    }

    // decrypt the encrypted password
    // go to database and decrypt the encrypted password
    const decryptedPassword = decryptPassword(user.password);
    // checks if the password matches with the one the user registered with
    const isPasswordCorrect = decryptedPassword === password;
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Wrong credentials" });
    }
    // create access token
    const accessToken = jwt.sign(
      { id: user._id }, // user information
      process.env.JWT_SEC, //jwt secret
      {
        expiresIn: "1d", // time of automatically loggoing out user
      }
    );

    // extract the password from the user info before swnding a response
    const { password: userPassword, ...others } = user._doc;

    // Send a login success email to user
    sendLoginSuccessEmail(email, user);

    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
};

module.exports = {
  register,
  login,
};
