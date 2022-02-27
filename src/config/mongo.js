const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("MongoDb is connected !");
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

module.exports = connectToDb;
