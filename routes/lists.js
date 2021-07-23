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
//POST (Create) list
router.post("/lists/", auth, (req, res) => {
  try {
    let name = req.body.name;
    if (name && name !== "" && name.replace(/\s/g, "").length) {
      //Capitalizes the name of list
      name = name.charAt(0).toUpperCase() + name.slice(1);
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
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "error posting list" });
  }
});
//POST (Create) item
router.post("/lists/:listId", auth, (req, res) => {
  try {
    const id = req.params.listId;
    let value = req.body.value;
    if (value && value !== "" && value.replace(/\s/g, "").length) {
      //Capitalizes the value of item
      value = value.charAt(0).toUpperCase() + value.slice(1);
      const newItem = {
        _id: new mongoose.Types.ObjectId(),
        value: value,
      };
      User.updateOne(
        { "lists._id": id },
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
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "error in posting item" });
  }
});

//PUT (Update) List
router.put("/lists/", auth, (req, res) => {
  try {
    const id = req.body.listId;
    const listName = req.body.listName;
    if (itemId !== "") {
      User.updateOne(
        { "lists._id": id },
        { $set: { name: listName } },
        (err) => {
          if (err) {
            res
              .status(422)
              .send({ message: "unable to delete: request error " });
          }
          res.status(201).send({ message: "deleted the list" });
        }
      );
    } else {
      res.status(422).send({ message: "unable to delete: request error" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "error updating list" });
  }
});
//PUT (Update) Item
router.put("/lists/:listId", auth, (req, res) => {
  try {
    const id = req.params.listId;
    //New Items
    const items = req.body.items;
    const itemId = req.body.itemId;
    if (itemId !== "" && id !== "") {
      User.updateOne(
        { "lists._id": id },
        { $set: { "lists.$.items": items } },
        (err) => {
          if (err) {
            res.status(422).send({
              message: "unable to delete: request error ",
            });
          }
          res.status(201).send({
            newItems: items,
            message: "updated list",
          });
        }
      );
    } else {
      res.status(422).send({ message: "unable to delete: request error" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "error updating item" });
  }
});
//DELETE (Remove) List
router.delete("/lists/", auth, (req, res) => {
  try {
    const id = req.body.listId;
    if (itemId !== "") {
      User.updateOne({ "lists._id": id }, { $pull: { _id: id } }, (err) => {
        if (err) {
          res.status(422).send({ message: "unable to delete: request error " });
        }
        res.status(204).send({ message: "updated list" });
      });
    } else {
      res.status(422).send({ message: "unable to delete: request error" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "error removing list" });
  }
});
//DELETE (Remove) item
router.delete("/lists/:listId", auth, (req, res) => {
  try {
    const id = req.params.listId;
    const itemId = req.body.itemId;
    if (itemId !== "" && id !== "") {
      User.updateOne(
        { "lists._id": id },
        { $pull: { "lists.$.items": { _id: itemId } } },
        (err) => {
          if (err) {
            res
              .status(422)
              .send({ message: "unable to delete: request error " });
          }
          res.status(202).send({ message: "deleted the item" });
        }
      );
    } else {
      res.status(422).send({ message: "unable to delete: request error" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "error removing item" });
  }
});

module.exports = router;
