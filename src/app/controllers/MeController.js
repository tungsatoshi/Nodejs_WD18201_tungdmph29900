const Course = require("../models/Course");
const { mutipleMongooseObjectToObject } = require("../../util/mongoose");

async function storedCourses(req, res) {
  try {
    // [GET] /me/stored/courses
    const data = await Course.find({});
    res.render("me/stored-courses.hbs", {
      courses: mutipleMongooseObjectToObject(data),
    });
  } catch (error) {}
}

module.exports = { storedCourses };
