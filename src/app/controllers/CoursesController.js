const Course = require("../models/Course");
const { mongooseToObject } = require("../../util/mongoose");
const { schemaProduct } = require("../validations/productValidation");

async function show(req, res) {
  try {
    //[GET] //courses/:slug
    const data = await Course.findOne({ slug: req.params.slug });
    // res.json(data);
    res.render("courses/show", { course: mongooseToObject(data) });
    // res.send("Course detail! - " + req.params.slug);
  } catch (error) {
    res.send(error);
  }
}

// [GET] /courses/create
function create(req, res) {
  res.render("courses/create");
}

// [GET] /courses/store
async function store(req, res) {
  try {
    const course = new Course(req.body);
    await course.save();
    res.redirect("/");
  } catch (error) {}
}

// [GET] /courses/:id/edit
async function edit(req, res) {
  try {
    const data = await Course.findById(req.params.id);
    res.render("courses/edit", { course: mongooseToObject(data) });
  } catch (error) {}
}

// [PUT] /courses/:id
async function update(req, res) {
  try {
    await Course.updateOne({ _id: req.params.id }, req.body);
    res.redirect("/me/stored/courses");
  } catch (error) {}
}

// [DELETE] /courses/:id
async function deleteCourse(req, res) {
  try {
    await Course.deleteOne({ _id: req.params.id });
    res.redirect("back");
    // res.status(200).json({ message: "ok" });
  } catch (error) {
    res.status(400).json({ error: "ERROR!!!" });
  }
}

///////////////////////
async function showAllProduct(req, res) {
  try {
    const data = await Course.find({});
    // res.render("home", { courses: mutipleMongooseObjectToObject(data) });
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}
async function postProduct(req, res) {
  try {
    const { name, description, image, videoId, level } = req.body;
    const { error } = schemaProduct.validate({ name, description });
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    // await course.save();
    await Course.create({
      name,
      description,
      image,
      videoId,
      level,
    });
    res.status(200).json({ message: "ok" });
    // res.redirect("/");
  } catch (error) {
    res.status(400).json({ error: "ERROR!!!" });
  }
}

async function putProduct(req, res) {
  try {
    await Course.updateOne({ slug: req.params.slug }, req.body);
    res.status(200).json({ message: "ok" });
    // res.redirect("/me/stored/courses");
  } catch (error) {
    res.status(400).json({ error: "ERROR!!!" });
  }
}

async function deleteProduct(req, res) {
  try {
    await Course.deleteOne({ slug: req.params.slug });
    // res.redirect("back");
    res.status(200).json({ message: "ok" });
  } catch (error) {
    res.status(400).json({ error: "ERROR!!!" });
  }
}
async function detailProduct(req, res) {
  try {
    // [GET] //courses/:slug
    const data = await Course.findOne({ slug: req.params.slug });
    // res.json(data);
    // res.render("courses/show", { course: mongooseToObject(data) });
    // res.send("Course detail! - " + req.params.slug);
    res.json(data);
  } catch (error) {
    res.send(error);
  }
}

module.exports = {
  detailProduct,
  deleteProduct,
  putProduct,
  postProduct,
  showAllProduct,
  show,
  create,
  store,
  edit,
  update,
  deleteCourse,
};
