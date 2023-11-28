const express = require("express");
const router = express.Router();

const CategoriesController = require("../app/controllers/CategoriesController");

router.get("/:id", CategoriesController.getCategoryDetail);
router.get("/", CategoriesController.getAllCategories);
router.post("/", CategoriesController.createCategory);
router.put("/:id", CategoriesController.updateCategory);
router.delete("/:id", CategoriesController.deleleCategory);

module.exports = router;
