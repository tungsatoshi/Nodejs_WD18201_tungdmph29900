const express = require("express");
const path = require("path");
const { engine } = require("express-handlebars");
const morgan = require("morgan");
const methodOverride = require("method-override");

const dotenv = require("dotenv");
dotenv.config();
const { DB_URL } = process.env;

const app = express();
const port = 3000;

const route = require("./routes");
const db = require("./config/db");

// Connect to DB
db.connect(DB_URL);

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride("_method"));

//HTTP logger
// app.use(morgan("combined"));

app.engine(
  ".hbs",
  engine({
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b,
    },
  })
);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "resources", "views"));

// Routes init
route(app);

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
