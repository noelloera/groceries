const express = require("express");
const router = express.Router();
//Database
const { connect, disconnect } = require("../database/database");
const List = require("../database/models/list-schema");
const mongoose = require("mongoose");
let lists = {
  _id: 1,
  allLists: [
    {
      name: "kitchen",
      _id: 1,
      items: [
        {
          _id: 1,
          value: "apples",
        },
        {
          _id: 2,
          value: "bananas",
        },
        {
          _id: 3,
          value: "strawberries",
        },
        {
          _id: 4,
          value: "watermelon",
        },
      ],
    },
    {
      name: "cookout",
      _id: 2,
      items: [
        {
          _id: 1,
          value: "steak",
        },
        {
          _id: 2,
          value: "ham",
        },
        {
          _id: 3,
          value: "cheese",
        },
      ],
    },
    {
      name: "bathroom",
      _id: 3,
      items: [
        {
          _id: 1,
          value: "shampoo",
        },
        {
          _id: 2,
          value: "hairspray",
        },
        {
          _id: 3,
          value: "loofa",
        },
      ],
    },
  ],
};

router.get("/lists/", (req, res) => {
  //Later, should only send if the log in was successful
  connect();
  List.find((error, lists) => {
    if (error) {
      res.status(500).send({
        message: "Cannot retrieve Objects",
        error: error,
      });
      disconnect();
    } else {
      res.status(200).send({
        message: "Found Objects",
        lists: lists,
      });
      disconnect();
    }
  });
});

//Use a get for an individual id list to understand how to override the list

router.post("/lists/", (req, res) => {
  const name = req.body.name;
  if (name && name !== "") {
    connect();
    const newList = new List({
      name: name,
      _id: new mongoose.Types.ObjectId(),
      items: [],
    });
    newList.save((error, list) => {
      if (error || !list) {
        res.status(422).send({
          message: "cannot create: invalid list name",
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
      message: "cannot create: invalid list name",
    });
  }
});

//Create the put methods to update the existing list by searchin and updating its contents

/*
router.get("/lists/:listId", (req, res) => {
  const allLists = lists.allLists;
  if (allLists !== undefined && allLists.length !== 0) {
    allLists.map((currentList) => {
      if (currentList._id === this.state.currentListId) {
        currentList.items.map((item) => {
          res.status(200).send(item);
        });
      }
    });
  } else {
    res.status(404).send({
      error: `No List exists with id: ${req.params.listId}`,
    });
  }
});

router.post("/lists/",(req,res)=>{
    const allLists = lists.allLists
    if(req.body.list){
        allLists.push(req.body.list)
        res.status(200).send({
            message: "Successfully created a new object",
            createdObject: req.body
        })
    }
})*/

module.exports = router;
