import React from "react";
import axios from "axios";
import { getAccess, clearAccess } from "../helpers/jwt";

export default class ItemLists extends React.Component {
  constructor(props) {
    super(props);
    //State values:
    this.state = {
      input: "",
      currentListId: null,
      username: null,
      lists: [],
    };
    //Element references
    this.listInput = React.createRef();
  }

  //Hooks
  async getLists() {}

  async componentDidMount() {
    //Will refresh after comparison of items
    const access = getAccess();
    await axios
      .get("/me", { headers: { Authorization: `Bearer ${access}` } })
      .then((res) => {
        this.setState({
          username: res.data.username,
          lists: res.data.lists,
        });
      })
      .catch((err) => {
        console.log(err);
        clearAccess();
        this.props.history.push("/Login");
      });
  }
  componentWillUnmount() {
    //Will clear the intreval
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
        const response = "response of axios call";
        const oldLists = this.state.userLists.slice();
        console.log(response.list);
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
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ value: item }),
            };
            let response = "axios method call";
          }
        });
        this.setState({ userLists: allLists });
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
    allLists.forEach((list) => {
      if (list._id === this.state.currentListId) {
        list.items.forEach(async (item, index) => {
          if (item._id === id) {
            const options = {
              method: "DELETE",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ id: item._id }),
            };
            list.items.splice(index, 1);
            //write conditional for the status of response
            let response = "axios method call";
          }
        });
      }
    });
    this.setState({ userLists: allLists });
  }

  focus(e) {
    this.listInput.current.focus();
  }

  //Rendering Methods
  renderLists() {
    /*
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
    }*/
  }

  renderItems() {
    /*
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
    }*/
  }

  render() {
    //Should map the item lists, as well as handle methods for lists
    return (
      <div>
        <h1>{this.state.username}</h1>
        {this.state.lists.map((list) => {
          return <h2>{list.name}</h2>;
        })}
      </div>
    );
  }
}
