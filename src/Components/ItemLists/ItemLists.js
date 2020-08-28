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
      currentListId: null,
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
          currentListId: this.state.currentListId
        });
        if (!this.state.currentListId) {
          this.setState({ currentListId: response.lists[0]._id })
        }
      }
    } catch (error) {
      console.log(error);
      //Keeps refreshing until it works but needs to produce a message later in the app
      window.location = "/";
    }
  }

  componentDidMount() {
    this.getLists();
    this.interval = setInterval(this.getLists, 20000);
    console.log(this.state.userLists)
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
        const options = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: listName }),
        };
        const response = await (await fetch(dev, options)).json();
        const oldLists = this.state.userLists.slice();
        console.log(response.list)
        oldLists.push(response.list);
        this.setState({
          input: "",
          currentListId: response.list._id,
          userLists: oldLists,
        });
      } catch (error) {
        alert(error);
      }
    } else {
      alert("Must enter a list name");
    }
  }

  //Fix new Item Fetch
  async newItem(e, item) {
    e.preventDefault();
    if (item) {
      try {
        let allLists = this.state.userLists.slice();
        allLists.forEach(async (list) => {
          if (list._id === this.state.currentListId) {
            list.items.push({ value: item });
            const options = {
              method: "PUT",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                list: list,
                value: item
              }),
            };
            let response = await (await fetch(dev + list._id, options)).json();
            console.log(response.list);
          }
        });
        this.setState({
          userLists: allLists,
        });
      } catch (error) {
        console.log(error);
        alert(error);
      }
    } else {
      alert("Must enter an item name" + item);
    }
  }

  async itemClick(e, id) {
    e.preventDefault();
    const allLists = this.state.userLists.slice();
    allLists.forEach(async (list) => {
      if (list._id === this.state.currentListId) {
        list.items.forEach((item, index) => {
          if (item._id === id) {
            list.items.splice(index, 1);
          }
        });
        const options = {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            list: list
          }),
        };
        let response = await (await fetch(dev + list._id, options)).json();
      }
    });
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
