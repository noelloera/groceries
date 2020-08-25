const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const listSchema = new Schema({
  name: String,
  _id: ObjectId,
  items: [
    {
      _id: ObjectId,
      value: String,
    },
  ],
});

const List = mongoose.model("List", listSchema);

module.exports = List;
