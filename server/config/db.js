const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`connected to DB ${conn.connection.host}`.cyan.inverse);
  } catch (error) {
    console.error(`Error:${error}`.red.underline);
    process.exit(1);
  }
};
module.exports = connectDB;
