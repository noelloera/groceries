const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const itemSchema = new Schema({
  _id: ObjectId,
  value: String
})
const listSchema = new Schema({
  _id: ObjectId,
  name: String,
  items: [itemSchema],
});


const List = mongoose.model("List", listSchema);
const Item = mongoose.model("Item", itemSchema)



module.exports = {List, Item};
