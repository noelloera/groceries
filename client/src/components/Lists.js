import React from "react";
import axios from "axios";
import { getAccess, clearAccess } from "../helpers/jwt";
import List from "./List.js";
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
    this.click = this.click.bind(this)
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
  click(e, i) {
    e.preventDefault();
    this.setState({
      items: this.state.lists[i].items,
      listId: this.state.lists[i]._id,
    });
    console.log(this.state.listId);
  }
  //List now renders and the click method sets the id as well for calls to the API
  //The rendering of the List components can be made into a separate function
  render() {
    return (
      <div>
        <h1>{this.state.username}</h1>
        <form>
          <button>+</button>
          {this.state.lists.map((list, i) => {
            return <List
              name={list.name}
              onClick={(e) => { this.click(e, i) }} />;
          })}
        </form>
        <InputField />
        <form>
          <button>+</button>
          {this.state.items.map((item) => {
            return <p>{item.value}</p>;
          })}
          <InputField />
        </form>
      </div>
    );
  }
}
