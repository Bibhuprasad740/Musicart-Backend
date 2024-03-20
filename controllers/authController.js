const User = require("../database/models/User");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const { name, phone, email, password } = req.body;
  try {
    if (!name || !phone || !email || !password) {
      return res.status(400).send("Please enter all the fields!");
    }
    if (name.length < 3) {
      return res
        .status(400)
        .send("Name should be more than 3 characters long!");
    }
    if (password.length < 6) {
      return res.status(400).send("Password length should be more than 5!");
    }
    if (phone.toString().length !== 10) {
      return res.status(400).send("Phone number should be 10 digits!");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("Email already exists!");
    }

    bcryptjs.hash(password, 12, async (error, hash) => {
      if (error) {
        return res.status(400).send("Could not hash the password!");
      }

      const user = await new User({
        name,
        phone,
        email,
        password: hash,
      });
      await user.save();

      const token = jwt.sign({ email: email }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });

      res.status(200).send({ token, user });
    });
  } catch (error) {
    console.log("Error in authController.signUp", error);
    return res.status(400).send("Error in creating user!");
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("Email does not exist!");
    }

    const matched = await bcryptjs.compare(password, user.password);
    if (!matched) {
      return res.status(400).send("Incorrect password!");
    }

    const token = jwt.sign({ email: email }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(200).send({ token, user });
  } catch (error) {
    console.log("Error in authController.signin", error);
    return res.status(400).send("Error in log in");
  }
};
