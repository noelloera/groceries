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
    this.state = {
      //When implementing actual object use the "first" array object position
      mounted: false,
      currentListId: 1,
      userLists: [],
    };
    this.listInput = React.createRef();
    this.renderLists = this.renderLists.bind(this);
    this.renderItems = this.renderItems.bind(this);
    this.handleListClick = this.handleListClick.bind(this);
    this.focusListInput = this.focusListInput.bind(this);
    this.handleNewList = this.handleNewList.bind(this);
    this.handleNewItem = this.handleNewItem.bind(this);
    this.itemClick = this.itemClick.bind(this);
  }

  //Will be the method to retrieve data
  componentDidMount() {
    this.setState({
      mounted: true,
      userLists: lists.allLists.slice(),
    });
  }

  //Handler for when a list is clicked
  handleListClick(id) {
    this.setState({
      currentListId: id,
    });
  }

  //Sets new State and changes to new List
  handleNewList(e) {
    e.preventDefault();
    const listName = this.listInput.current.value;
    if (listName) {
      let updateLists = this.state.userLists.slice();
      const newListObject = {
        name: listName,
        _id: updateLists.length + 1,
        items: [],
      };
      updateLists.push(newListObject);
      this.setState({
        currentListId: newListObject._id,
        userLists: updateLists,
      });
      this.listInput.current.value = null;
    } else {
      alert("Must enter a list name");
    }
  }

  //New Item Handlers and helper function
  handleNewItem(e, item) {
    e.preventDefault();
    if (item) {
      let allLists = this.addItemToList(item);
      this.setState({
        userLists: allLists,
      });
    } else {
      alert("Must enter an item name");
    }
  }
  addItemToList(item) {
    const allLists = this.state.userLists.slice();
    allLists.forEach((list) => {
      if (list._id === this.state.currentListId) {
        if (item) {
          let newItem = { _id: list.items.length + 1, value: item };
          list.items.push(newItem);
        }
      }
    });
    return allLists;
  }
  itemClick(e, id) {
    e.preventDefault();
    const allLists = this.state.userLists.slice();
    allLists.forEach((list) => {
      if (list._id === this.state.currentListId) {
        list.items.forEach((item,index)=>{
          if(item._id===id){
            list.items.splice(0,index)
          }
        })
      }
    });
    console.log(allLists);
    this.setState({ userLists: allLists });
  }

  //Focuses on input Element
  focusListInput(e) {
    this.listInput.current.focus();
  }

  //Renders each of the lists with their names
  renderLists() {
    const allLists = this.state.userLists.slice();
    if (allLists !== undefined && allLists.length !== 0 && this.state.mounted) {
      //The onClick event needs to trigger the handler function
      return allLists.map((currentList) => {
        return (
          <li
            onClick={(e) => this.handleListClick(currentList._id)}
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
        <button onClick={(e) => this.focusListInput(e)}>+</button>
        <ul>{this.renderLists()}</ul>
        <form onSubmit={(e) => this.handleNewList(e)}>
          <input ref={this.listInput}></input>
        </form>
        <Items
          handleNewItem={this.handleNewItem}
          renderItems={this.renderItems}
        />
      </div>
    );
  }
}
