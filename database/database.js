const mongoose = require("mongoose");
require("dotenv").config();

const dbUrl = `mongodb+srv://${process.env.MONGO_E}:${process.env.MONGO_P}@groceries.ggozb.mongodb.net/<dbname>?retryWrites=true&w=majority`;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

async function connect() {
  await mongoose
    .connect(process.env.MONGO_URI || dbUrl, options)
    .then(() => {
      console.log("...successfully connected to the database");
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
}

async function disconnect() {
  await mongoose
    .disconnect()
    .then(() => {
      console.log("...succesfully disconnected from the database");
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
}

module.exports = { connect, disconnect };
