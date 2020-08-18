import React from "react";
import "./ItemLists.css";
import Items from "../Items/Items.js";

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
      currentListId: 3,
      userLists: [],
    };
    this.renderLists = this.renderLists.bind(this);
    this.renderItems = this.renderItems.bind(this);
    this.handleListClick = this.handleListClick.bind(this);
  }

  //Will be the method to retrieve data
  componentDidMount() {
    this.setState({
      mounted: true,
      userLists: lists.allLists,
    });
  }

  handleListClick(id, e) {
    this.setState({
      currentListId: id,
    });
  }

  //Renders each of the lists with their names
  renderLists() {
    if (this.state.userLists && this.state.mounted) {
      return this.state.userLists.map((list) => {
        return (
          <li onClick={(e) => this.handleListClick(list._id, e)} key={list._id}>
            {list.name}
          </li>
        );
      });
    } else {
      return <li>There are no saved lists tap (+) to add one</li>;
    }
  }

  renderItems() {
    if (this.state.userLists && this.state.mounted) {
      return this.state.userLists.map((listObj) => {
        if (listObj._id === this.state.currentListId) {
          return listObj.items.map((item) => {
            console.log(item.value);
            return <li key={item._id}>{item.value}</li>;
          });
        }
      });
    } else {
      return <li>No Items</li>;
    }
  }

  render() {
    //Should map the item lists, as well as handle methods for lists
    return (
      <div>
        <h1>LISTS:</h1>
        <ul>{this.renderLists()}</ul>
        <Items renderItems={this.renderItems} />
      </div>
    );
  }
}
