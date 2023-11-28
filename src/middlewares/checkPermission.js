const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../app/models/UserModel");
// const Student = require("../models/StudentModel");

dotenv.config();

const { SECRET_CODE } = process.env;

const checkPermission = async (req, res, next) => {
  try {
    console.log(req.headers.authorization);
    // Bước 1: Kiểm tra xem đã đăng nhập hay chưa?
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token);
    if (!token) {
      return res.status(403).json({
        message: "Ban chua dang nhap",
      });
    }

    //Decode
    const decoded = jwt.verify(token, SECRET_CODE);
    console.log(decoded);
    if (!decoded) {
      throw new Error("Token Error");
    }

    //Find user
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(404).json({
        message: "User khong ton tai trong he thong",
      });
    }
    console.log(user);

    //Check role
    // if (user.role !== "admin") {
    //   return res.status(400).json({
    //     message: "Ban khong co quyen lam viec nay",
    //   });
    // }

    next();
  } catch (error) {
    return res.status(400).json({
      name: error.name,
      message: error.message,
    });
  }
};

module.exports = { checkPermission };
