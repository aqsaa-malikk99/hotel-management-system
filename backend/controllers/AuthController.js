const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

class AuthController {
  
  export async register(req, res) {
    const { firstName, lastName, email, password, roleType } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create a new user instance
      user = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        roleType,
      });


      await user.save();


      const payload = {
        user: {
          id: user._id,
        },
      };


      if (!process.env.JWT_SECRET) {
        return res.status(500).json({ msg: 'JWT_SECRET environment variable is not set' });
      }

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.status(201).json({ token });

    } catch (err) {

      console.error(err.message);
      res.status(500).json({ msg: `Server Error: ${err.message}` });
    }
  }


  export async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }
      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }
      const payload = {
        user: {
          id: user._id,
        },
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.json({ token });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("SERVER ERROR");
    }
  }
}

module.exports = new AuthController();
