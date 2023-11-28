const express = require("express");
const router = express.Router();

const userController = require("../app/controllers/UserController");

router.delete("/:id", userController.deleteUser);
router.get("/:id", userController.getUserDetail);
router.get("/", userController.getAllUser);
router.put("/:id", userController.updateUser);
router.post("/login", userController.loginUser);
router.post("/", userController.createUser);

module.exports = router;
