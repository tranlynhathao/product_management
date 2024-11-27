const mongoose = require("mongoose");

module.exports.connect = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log("Connecting DB successfully");
  } catch (error) {
    console.log("Connect error: ", error);
  }
};
