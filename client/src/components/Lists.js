import React from "react";
import axios from "axios";
import { getAccess, clearAccess } from "../helpers/jwt";
import Elem from "./Elem.js";
import InputField from "./InputField";

export default class ItemLists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      listId: null,
      username: null,
      lists: [],
      items: [],
    };
  }

  async componentDidMount() {
    //Will refresh after comparison of items
    const access = getAccess();
    await axios
      .get("/me", { headers: { Authorization: `Bearer ${access}` } })
      .then((res) => {
        this.setState({
          username: res.data.username,
          listId: res.data.lists[0]._id,
          lists: res.data.lists,
          items: res.data.lists[0].items,
        });
      })
      .catch((err) => {
        console.log(err);
        clearAccess();
        this.props.history.push("/login");
      });
  }
  listClick(e, i) {
    e.preventDefault();
    this.setState({
      items: this.state.lists[i].items,
      listId: this.state.lists[i]._id,
    });
  }
  itemClick(e, id) {
    
  }
  renderLists() {
    return this.state.lists.map((list, i) => {
      return <Elem
              key={list._id}
              name={list.name}
              onClick={(e) => { this.listClick(e, i) }} />;
          })
  }
  renderItems() {
    return this.state.items.map((item) => {
      return <Elem
        key={item._id}
        name={item.value} />
    })
  }
  //The rendering of the List components can be made into a separate function
  render() {
    return (
      <div>
        <h1>{this.state.username}</h1>
        <form>
          <button>+</button>
          {this.renderLists()}
        </form>
        <InputField />
        <form>
          <button>+</button>
          {this.renderItems()}
          <InputField />
        </form>
      </div>
    );
  }
}
