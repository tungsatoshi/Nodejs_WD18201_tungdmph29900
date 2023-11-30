const mongoose = require("mongoose");

async function connect(dbUrl) {
  try {
    // await mongoose.connect("mongodb://localhost:27017/f8_education_dev", {
    //   // useNewUrlParser: true,
    //   // useUnifiedTopology: true,
    //   // useCreateIndex: true,
    // });
    await mongoose.connect(dbUrl);
    console.log("Connect successfully!!");
  } catch (error) {
    console.log("Connect failure");
  }
}

module.exports = { connect };
