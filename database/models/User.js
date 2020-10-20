const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const itemSchema = new Schema({
  _id: ObjectId,
  name: String,
});
const listSchema = new Schema({
  _id: ObjectId,
  name: String,
  items: [itemSchema],
});
const userSchema = new Schema({
  _id: ObjectId,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  expiredTokens: [String],
  lists: [listSchema],
});

const Item = mongoose.model("Item", itemSchema);
const List = mongoose.model("List", listSchema);
const User = mongoose.model("User", userSchema);

module.exports = { User, List, Item, mongoose };
