const User = require("../models/UserModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { schema, schemaUsername } = require("../validations/userValidation");

dotenv.config();

const { SECRET_CODE } = process.env;

class UserController {
  async getAllUser(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getUserDetail(req, res) {
    try {
      const user = await User.findById(req.params.id);
      res.json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateUser(req, res) {
    try {
      const { username, email, password } = req.body;
      let { error: usernameError } = schemaUsername.validate({ username });
      if (usernameError) {
        return res.status(400).json({ message: usernameError.message });
      }
      let { error: generalError } = schema.validate({ email, password });
      if (generalError) {
        return res.status(400).json({ message: generalError.message });
      }
      await User.updateOne({ _id: req.params.id }, req.body);
      res.status(200).json({ message: "Update thanh cong" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteUser(req, res) {
    try {
      await User.deleteOne({ _id: req.params.id });
      res.status(200).json({ message: "Xoa thanh cong" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async createUser(req, res) {
    try {
      const { username, email, password } = req.body;

      // Kiem tra email
      const userExist = await User.findOne({ email });
      if (userExist) {
        return res.status(400).json({
          message: "Email nay da duoc dang ky",
        });
      }

      let { error: usernameError } = schemaUsername.validate({ username });
      if (usernameError) {
        return res.status(400).json({ message: usernameError.message });
      }
      let { error: generalError } = schema.validate({ email, password });
      if (generalError) {
        return res.status(400).json({ message: generalError.message });
      }
      // Ma hoa mat khau
      const hashPassword = await bcryptjs.hash(password, 10);
      await User.create({
        username,
        email,
        password: hashPassword,
      });
      res.status(200).json({ message: "Them moi thanh cong" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // [POST] users/login
  async loginUser(req, res) {
    try {
      const { email, password } = req.body;

      // Validate form
      const { error } = schema.validate(
        { email, password },
        { abortEarly: false }
      );
      if (error) {
        return res.status(400).json({ message: error.message });
      }

      // Check email
      const user = await User.findOne({ email });
      // console.log(user);
      if (!user) {
        return res
          .status(404)
          .json({ message: "Email or password chua chinh xac" });
      }

      // Check password
      const isMath = await bcryptjs.compare(password, user.password);
      console.log(isMath);

      if (!isMath) {
        return res
          .status(400)
          .json({ message: "Email or Password chua chinh xac" });
      }

      // Create token
      const token = jwt.sign({ _id: user._id }, SECRET_CODE, {
        expiresIn: "1d",
      });

      res.json({
        message: "Login successful",
        token,
        user: {
          username: user.username,
          email: user.email,
        },
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new UserController();