import React from "react";
import "./ItemLists.css";
import Items from "../Items/Items.js";
import { findAllByRole, findAllByLabelText } from "@testing-library/react";
const mongoose = require("mongoose");

const dev = "http://localhost:5000/lists/";
const production = "/lists/";

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
    this.getLists = this.getLists.bind(this);
  }

  //Hooks
  async getLists() {
    try {
      let response = await (await fetch(dev)).json();
      if (response) {
        //good place to remove the CSS loading element
        if (!response.lists == this.state.userLists) console.log(response);
        this.setState({
          mounted: true,
          userLists: response.lists,
        });
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  componentDidMount() {
    this.getLists();
    this.interval = setInterval(this.getLists, 5000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  //Methods
  listClick(id) {
    this.setState({
      currentListId: id,
    });
  }

  async newList(e) {
    e.preventDefault();
    const listName = this.state.input.slice();
    if (listName) {
      try {
        const newList = {
          name: listName,
          _id: new mongoose.Types.ObjectId(),
        };
        const options = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newList),
        };
        const response = await (await fetch(dev, options)).json();
        const oldLists = this.state.userLists.slice();
        const newListObject = response.list
        oldLists.push(newListObject);
        this.setState({
          currentListId: newListObject._id,
          userLists: oldLists,
        });
        this.setState({ input: "" });
      } catch (error) {
        alert(error);
      }
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
        <Items newItem={this.newItem} renderItems={this.renderItems} />
      </div>
    );
  }
}
