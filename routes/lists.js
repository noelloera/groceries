const express = require("express");
const router = express.Router();
const { User, List, Item } = require("../database/models/User.js");
const mongoose = require("mongoose");
const auth = require("../middleware/auth.js");
//These requests should connect and disconnect after each call
router.get("/me", auth, async (req, res) => {
  try {
    if (req.body.id) {
      const user = await User.findById(req.body.id);
      res.status(200).send({
        username: user.username,
        lists: user.lists,
      });
    } else {
      res.status(401).send({ message: "error in fetching user" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "error in fetching user" });
  }
});
//POST list
router.post("/lists/", auth, (req, res) => {
  const name = req.body.name;
  if (name && name !== "" && name.replace(/\s/g, "").length) {
    const newList = new List({
      _id: new mongoose.Types.ObjectId(),
      name: name,
      items: [],
    });
    User.updateOne(
      { _id: req.body.id },
      { $push: { lists: newList } },
      (err, log) => {
        if (err) res.status(422).send(err);
        res.status(201).send({
          newList: newList,
          message: "successfully created list",
        });
      }
    );
  } else {
    res.status(422).send({ message: "unable to create: invalid list name" });
  }
});
//POST item
router.post("/lists/:listId", (req, res) => {
  const id = req.params.listId;
  const value = req.body.value;
  if (value && value !== "" && value.replace(/\s/g, "").length) {
    const newItem = {
      _id: new mongoose.Types.ObjectId(),
      value: value,
    };
    User.updateOne(
      { id: req.body.id, "lists._id": id },
      { $push: { "lists.$.items": newItem } },
      (err, log) => {
        if (err) res.status(422).send(log);
        res.status(201).send({
          newItem: newItem,
          message: "sucessfully updated list",
        });
      }
    );
  } else {
    res.status(422).send({ message: "unable to create: invalid item name" });
  }
});
//DELETE item
router.delete("/lists/:listId", auth, (req, res) => {
  const listId = req.params.listId;
  const itemId = req.body.itemId;
  if (itemId && listId) {
    User.updateOne(
      { _id: req.body.id, "lists._id": listId, "items._id": itemId },
      { $pull: { "lists.$.items": { _id: itemId } } },
      (err, log) => {
        if (err)
          res.status(422).send({ message: "unable to delete: request error" });
        res.status(202).send({ message: "deleted the item" });
      }
    );
  } else {
    res.status(422).send({ message: "unable to delete: request error" });
  }
});

module.exports = router;
