const express = require("express");
const router = express.Router();
const { User, List, Item } = require("../database/models/User.js");
const mongoose = require("mongoose");
const auth = require("../middleware/auth.js");

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
router.get("/lists/", (req, res) => {
  //Later, should only send if the log in was successful
  connect();
  List.find((error, lists) => {
    if (error) {
      res.status(500).send({
        message: "unable to retrieve objects",
        error: error,
      });
      disconnect();
    } else {
      res.status(200).send({
        message: "found objects",
        lists: lists,
      });
      disconnect();
    }
  });
});

//GET ID
router.get("/lists/:listId", (req, res) => {
  const id = req.params.listId;
  if (id && id !== "") {
    connect();
    List.findById(id, (error, list) => {
      if (error || !list) {
        res.status(404).send({
          message: "unable to retrieve list",
        });
        disconnect();
      } else {
        res.status(302).send({
          message: "successfully retrieved list",
          list: list,
        });
        disconnect();
      }
    });
  } else {
    res.status(404).send({
      message: "unable to retrieve list: invalid id",
    });
  }
});

//POST Requests
//Lists
router.post("/lists/", (req, res) => {
  const name = req.body.name;
  if (name && name !== "") {
    connect();
    const newList = new List({
      _id: new mongoose.Types.ObjectId(),
      name: name,
      items: [],
    });
    newList.save((error, list) => {
      if (error || !list) {
        res.status(422).send({
          message: "unable to create: invalid list name",
        });
        disconnect();
      } else {
        res.status(201).send({
          message: "successully created list",
          list: list,
        });
        disconnect();
      }
    });
  } else {
    res.status(422).send({
      message: "unable to create: invalid list name",
    });
  }
});
//Post Items
router.post("/lists/:listId", (req, res) => {
  const listId = req.params.listId;
  const value = req.body.value;
  if (value && value !== "") {
    connect();
    const newItem = Item({
      _id: new mongoose.Types.ObjectId(),
      value: value,
    });
    List.updateOne(
      { _id: listId },
      { $push: { items: newItem } },
      (error, list) => {
        if (error) res.status(404);
        else
          res.status(201).send({
            message: "updated",
            list: list,
          });
      }
    );
  } else {
    res.status(422).send({ message: "unable to create: invalid item name" });
  }
});

//UPDATE Item and List Names

//DELETE Requests, you can send the body as url call too
router.delete("/lists/:listId", (req, res) => {
  const listId = req.params.listId;
  const id = req.body.id;
  if (id) {
    connect();
    List.updateOne(
      { _id: listId },
      { $pull: { items: { _id: id } } },
      (error, list) => {
        if (error) {
          res.status(422).send({
            message: "unable to delete: request error",
          });
          disconnect();
        } else {
          res.status(202).send({
            message: "deleted the item object",
          });
          disconnect();
        }
      }
    );
  } else {
    res.status(404).send({
      message: "unable to delete object with that id",
    });
  }
});

module.exports = router;
