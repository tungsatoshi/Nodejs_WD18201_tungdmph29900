const newsRouter = require("./news");
const coursesRouter = require("./courses");
const siteRouter = require("./site");
const meRouter = require("./me");
const users = require("./users");
const categories = require("./categories");

function route(app) {
  app.use("/news", newsRouter);
  app.use("/me", meRouter);
  app.use("/courses", coursesRouter);
  app.use("/categories", categories);
  app.use("/users", users);
  app.use("/products", coursesRouter);
  app.use("/", siteRouter);
}

module.exports = route;
