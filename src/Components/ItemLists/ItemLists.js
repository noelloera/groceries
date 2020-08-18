import React from "react";
import "./ItemLists.css";
import Items from "../Items/Items.js"

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
      loaded: false,
      currentListId: 1,
      userLists:lists,
    };
    this.renderLists = this.renderLists.bind(this);
    this.renderItems = this.renderItems.bind(this);

    //this.loadList = this.loadList.bind(this);
  }
  /*loadList(list) {
    this.setState({ currentListId: list._id });
  }*/

  componentDidMount(){
      this.setState({
          loaded: true,
          userLists:lists})
  }

  renderLists() {
    if (this.state.loaded) {
      return this.state.userLists.allLists.map((list) => {
          console.log(list)
        return <li key={list._id}>{list.name}</li>;
      });
    } else {
      return <li>There are no saved lists tap (+) to add one</li>;
    }
  }

  renderItems() {
    if (this.state.loaded) {
      this.state.userLists.allLists.map((listObj) => {
        if (listObj._id === this.state.currentListId) {
          listObj.items.map((item) => {
            return <li key={item._id}>{item.value}</li>;
          });
        } else {
          return <li>No Items</li>;
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
        <ul lists={this.state.userLists}>{this.state.userLists.allLists.map(list=>{
            console.log(list)
        return <li>{list.name}</li>
        })}</ul>
        <Items lists={this.state.userLists}/>
      </div>
    );
  }
}
