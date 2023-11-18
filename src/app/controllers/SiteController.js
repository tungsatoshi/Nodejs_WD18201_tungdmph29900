const Course = require("../models/Course");
const { mutipleMongooseObjectToObject } = require("../../util/mongoose");

async function index(req, res) {
  try {
    const data = await Course.find({});
    // courses = data.map((item) => item.toObject());
    // console.log(courses);
    // await res.json(result);
    res.render("home", { courses: mutipleMongooseObjectToObject(data) });
    // res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

function search(req, res) {
  res.render("search");
}

module.exports = { index, search };

// const Course = require("../models/Course");

// class SiteController {
//   // [GET] /news
//   index(req, res) {
//     await MyModel.find({});
//     // res.render("home");
//   }

//   // [GET] /new/:slug
//   search(req, res) {
//     res.render("search");
//   }
// }

// module.exports = new SiteController();
