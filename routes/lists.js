const express = require("express");
const router = express.Router();
//Database
const { connect, disconnect } = require("../database/database");
const List = require("../database/models/list-schema");
const mongoose = require("mongoose");

//GET
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

//POST
router.post("/lists/", (req, res) => {
  const name = req.body.name;
  const id = req.body.id;
  if (name && name !== "") {
    connect();
    const newList = new List({
      name: name,
      _id: id || new mongoose.Types.ObjectId(),
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

//Disconnect from DB is not working
router.put("/lists/:listId", (req, res) => {
  const id = req.params.listId;
  const list = req.body.list;
  if (list && id) {
    List.findByIdAndUpdate(id, list, (error, list) => {
      if (error || !list) {
        res.status(422).send({
          message: "unable to update: request error",
        });
        disconnect();
        res.status(200).send({
          message: "successfully updated list",
          list: newList,
        });
        disconnect();
      }
    });
  } else {
    res.send(404).send({
      message: "unable to update: invalid object/id",
    });
    disconnect();
  }
});

//DELETE when it is needed after popup implementation

module.exports = router;
