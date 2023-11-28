const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");

mongoose.plugin(slug);

const Category = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    slug: { type: String, slug: "title" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Category", Category);
