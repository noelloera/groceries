import React from "react";
import axios from "axios";
import { getAccess, clearAccess } from "../helpers/jwt";
import Elem from "./Elem.js";
import InputField from "./InputField";
import { withRouter } from "react-router-dom";

class Lists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listField: "",
      itemField: "",
      listId: null,
      listIndex: null,
      username: null,
      lists: [],
      items: [],
    };
    this.getLists = this.getLists.bind(this);
  }
  //Helper function uses locally stored tokens to make secure axios calls
  async getLists() {
    const access = getAccess();
    return await axios
      .get("/me", { headers: { Authorization: `Bearer ${access}` } })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        if (this.state.username) {
          clearAccess();
          this.props.history.push("/login");
        }
      });
  }
  //Runs getLists function asynchroniously
  async componentDidMount() {
    //Calls getLists and sets state
    await this.getLists().then((data) => {
      //Ternary operator if lists already exist
      data.lists.length
        ? this.setState({
            username: data.username,
            listId: data.lists[0]._id,
            listIndex: 0,
            lists: data.lists,
            items: data.lists[0].items,
          })
        : this.setState({
            username: data.username,
            listIndex: 0,
          });
    });
  }
  //Will update the state with new data
  async componentDidUpdate(prevProps, prevState) {
    //Compare the previous to current state, should run periodically
    //Should also update the items in the current chosen list like listClick
    await prevState.lists.forEach((prevList) => {
      this.state.lists.forEach((list) => {
        if (prevList.length !== list.length) {
          this.getLists().then((data) => {
            //Updates the lists
            this.setState({
              lists: data.lists,
            });
          });
        }
      });
    });
  }
  //Sets the listId to the current index of the list object
  listClick(e, i) {
    e.preventDefault();
    //Sets the items to the current items
    this.setState({
      items: this.state.lists[i].items,
      listId: this.state.lists[i]._id,
      listIndex: i,
    });
  }
  renderLists() {
    return this.state.lists.map((list, i) => {
      return (
        <Elem
          key={list._id}
          name={list.name}
          onClick={(e) => {
            this.listClick(e, i);
          }}
        />
      );
    });
  }
  //Renders the item objects of the current chosen list
  renderItems() {
    return this.state.items.map((item) => {
      return (
        <Elem
          id={item._id}
          key={item._id}
          name={item.value}
          onClick={(e, id) => {
            //Will Delete the item if clicked
            console.log(id);
          }}
        />
      );
    });
  }
  change(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  //Both new lists & items work, find a way to not refresh each time
  async submit(e) {
    e.preventDefault();
    const name = e.target.name;
    const access = getAccess();
    if (access) {
      if (name === "listForm") {
        const newList = this.state.listField.slice(0);
        await axios
          .post(
            "/lists/",
            { name: newList },
            {
              headers: { Authorization: `Bearer ${access}` },
            }
          )
          .then(async (res) => {
            //Creates copy of state.lists and adds the new one
            const newLists = [...this.state.lists, res.data.newList];
            this.setState({
              lists: newLists,
              listId: res.data.newList._id,
              listIndex: newLists.length - 1,
              listField: "",
              items: newLists[newLists.length - 1].items,
            });
          })
          .catch((err) => {
            console.log(err);
            clearAccess();
            this.props.history.push("/login");
          });
      }
      if (name === "itemForm") {
        const newItem = this.state.itemField.slice(0);
        await axios
          .post(
            `/lists/${this.state.listId}`,
            { value: newItem },
            {
              headers: { Authorization: `Bearer ${access}` },
            }
          )
          .then(async (res) => {
            const newItems = [
              ...this.state.lists[this.state.listIndex].items,
              res.data.newItem,
            ];
            console.log(newItems);
            const lists = [...this.state.lists];
            lists[this.state.listIndex].items = newItems;
            console.log(lists);
            this.setState({
              lists: lists,
              items: newItems,
              itemField: "",
            });
          })
          .catch((err) => {
            console.log(err);
            clearAccess();
            this.props.history.push("/login");
          });
      }
    } else {
      //If there is no access token user pushed to the authenticator component
      this.props.history.push("/authenticator");
    }
  }
  //The rendering of the List components can be made into a separate function
  render() {
    return (
      <div>
        {/*Displays the username with the first letter capitalized */}
        <h1>Hello {this.state.username},</h1>
        <button>+</button>

        <form
          name="listForm"
          onSubmit={(e) => {
            this.submit(e);
          }}
        >
          {this.renderLists()}
          <InputField
            name="listField"
            type="text"
            value={this.state.listField}
            onChange={(e) => {
              this.change(e);
            }}
          />
        </form>
        <button>+</button>
        <form
          name="itemForm"
          onSubmit={(e) => {
            this.submit(e);
          }}
        >
          {this.renderItems()}
          <InputField
            name="itemField"
            type="text"
            value={this.state.itemField}
            onChange={(e) => {
              this.change(e);
            }}
          />
        </form>
      </div>
    );
  }
}

export default withRouter(Lists);
