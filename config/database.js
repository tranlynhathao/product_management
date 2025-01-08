const mongoose = require("mongoose");

module.exports.connect = async () => {
  try {
    mongoose
      .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000,
      })
      .then(() => {
        console.log("Database connected successfully");
      })
      .catch((err) => {
        console.error("Database connection failed:", err.message);
      });
  } catch (error) {
    console.log("Connect error: ", error);
  }
};
