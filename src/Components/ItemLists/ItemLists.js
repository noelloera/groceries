import React from "react";
import "./ItemLists.css";
import Items from "../Items/Items.js";
import { findAllByRole } from "@testing-library/react";

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

export default class ItemLists extends React.Component {
  constructor(props) {
    super(props);
    //State values:
    this.state = {
      input: "",
      mounted: false,
      currentListId: 1,
      userLists: [],
    };
    //Element references
    this.listInput = React.createRef();
    //Method Binding:
    this.renderLists = this.renderLists.bind(this);
    this.renderItems = this.renderItems.bind(this);
    this.listClick = this.listClick.bind(this);
    this.itemClick = this.itemClick.bind(this);
    this.focus = this.focus.bind(this);
    this.newList = this.newList.bind(this);
    this.newItem = this.newItem.bind(this);
  }

  //Hooks
  componentDidMount() {
    this.setState({
      mounted: true,
      userLists: lists.allLists.slice(),
    });
  }
  //Methods
  listClick(id) {
    this.setState({
      currentListId: id,
    });
  }

  newList(e) {
    e.preventDefault();
    const listName = this.state.input.slice();
    if (listName) {
      const oldLists = this.state.userLists.slice();
      const newListObject = {
        name: listName,
        //replace IDs with new MongoDB id's
        _id: oldLists.length + 1,
        items: [],
      };
      oldLists.push(newListObject);
      this.setState({
        currentListId: newListObject._id,
        userLists: oldLists,
      });
      this.setState({ input: "" });
    } else {
      alert("Must enter a list name");
    }
  }

  newItem(e, item) {
    e.preventDefault();
    if (item) {
      let allLists = this.state.userLists.slice();
      allLists.forEach((list) => {
        if (list._id === this.state.currentListId) {
          let newItem = { _id: list.items.length + 1, value: item };
          list.items.push(newItem);
        }
      });
      this.setState({
        userLists: allLists,
      });
    } else {
      alert("Must enter an item name" + item);
    }
  }

  itemClick(e, id) {
    e.preventDefault();
    const allLists = this.state.userLists.slice();
    allLists.forEach((list) => {
      if (list._id === this.state.currentListId) {
        list.items.forEach((item, index) => {
          if (item._id === id) {
            list.items.splice(index, 1);
          }
        });
      }
    });
    console.log(allLists);
    this.setState({ userLists: allLists });
  }

  focus(e) {
    this.listInput.current.focus();
  }

  //Rendering Methods
  renderLists() {
    const allLists = this.state.userLists.slice();
    if (allLists !== undefined && allLists.length !== 0 && this.state.mounted) {
      return allLists.map((currentList) => {
        return (
          <li
            onClick={(e) => this.listClick(currentList._id)}
            key={currentList._id}
          >
            {currentList.name}
          </li>
        );
      });
    } else {
      return <li>There are no saved lists tap (+) to add one</li>;
    }
  }

  renderItems() {
    let items = [];
    const allLists = this.state.userLists.slice();
    allLists.forEach((list) => {
      if (list._id === this.state.currentListId) {
        items = list.items;
      }
    });
    if (items.length !== 0) {
      return items.map((item) => {
        return (
          <li
            onClick={(e) => {
              this.itemClick(e, item._id);
            }}
            key={item._id}
          >
            {item.value}
          </li>
        );
      });
    } else {
      return <li>no items</li>;
    }
  }

  render() {
    //Should map the item lists, as well as handle methods for lists
    return (
      <div>
        <h1>Lists:</h1>
        <button onClick={(e) => this.focus(e)}>+</button>
        <ul>{this.renderLists()}</ul>
        <form onSubmit={(e) => this.newList(e)}>
          <input
            ref={this.listInput}
            value={this.state.input}
            onChange={(e) => {
              this.setState({ input: e.target.value });
            }}
          ></input>
        </form>
        <Items 
        newItem={this.newItem} renderItems={this.renderItems} />
      </div>
    );
  }
}
