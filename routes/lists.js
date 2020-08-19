const express = require("express");
const router = express.Router();
//Database
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

router.get("/lists", (req, res) => {
  //Later a connection to the db should replace this (error handler)
  res.status(200).send(lists);
});

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
})