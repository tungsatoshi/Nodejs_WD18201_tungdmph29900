const express = require("express");
const router = express.Router();
const { checkPermission } = require("../middlewares/checkPermission");

const courseController = require("../app/controllers/CoursesController");

// get: products/all -> res.json
router.get("/all", checkPermission, courseController.showAllProduct);
// post: /products => res.json
router.post("/", checkPermission, courseController.postProduct);
// update: /products/:slug findOne //res.json
router.put("/:slug", checkPermission, courseController.putProduct);
// delete: /products/:slug
router.delete("/:slug", checkPermission, courseController.deleteProduct);
// detail: /products/:slug
router.get("/:slug", courseController.detailProduct);

// router.get("/create", courseController.create);
// router.post("/store", courseController.store);
// router.get("/:slug", courseController.show);
// router.get("/:id/edit", courseController.edit);
// router.put("/:id", courseController.update);
// router.delete("/:id", courseController.deleteCourse);

module.exports = router;
