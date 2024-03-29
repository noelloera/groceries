const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
};

async function connect() {
  try {
    await mongoose
      .connect(process.env.MONGO_URI, options)
      .then(() => {
        console.log("successfully connected database...");
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  } catch (error) {
    disconnect();
    console.log(error);
  }
}

async function disconnect() {
  await mongoose
    .disconnect()
    .then(() => {
      console.log("... successfully disconnected database");
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
}

module.exports = { connect };
