import React from "react";
import axios from "axios";
import { getAccess, clearAccess } from "../helpers/jwt";
import Elem from "./Elem.js";
import InputField from "./InputField";
import { withRouter } from "react-router-dom";

class Lists extends React.Component {
  access = getAccess();
  constructor(props) {
    super(props);
    this.state = {
      listField: "",
      itemField: "",
      listId: null,
      listIndex: 0,
      username: null,
      lists: [],
      items: [],
    };
    this.getLists = this.getLists.bind(this);
    this.itemClick = this.itemClick.bind(this);
  }
  //Helper function uses locally stored tokens to make secure axios calls
  async getLists() {
    return await axios
      .get("/me", { headers: { Authorization: `Bearer ${this.access}` } })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        if (!this.state.username) {
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
    if (this.state.lists.length !== prevState.lists.length) {
      await this.getLists().then((data) => {
        this.setState({
          lists: this.state.lists,
        });
      });
    }
    //Updates if the items changed
    if (this.state.items !== prevState.items) {
      await this.getLists().then((data) => {
        this.setState({
          lists: this.state.lists,
        });
      });
    }
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
  //Renders by mapping each of the existing list objects
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
  //Renders by mapping each of the item objects of active listId
  renderItems() {
    return this.state.items.map((item, i) => {
      return (
        <Elem
          id={item._id}
          key={item._id}
          name={item.value}
          onClick={(e, id) => {
            this.itemClick(e, i, id);
          }}
        />
      );
    });
  }
  //Sets the state by the name of the field
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
      //Makes post request to add new list if the name of triggered element name is listForm
      if (name === "listForm") {
        //Gets string from the list input field
        const listName = this.state.listField.slice(0);
        //Sends listName in a post request
        await axios
          .post(
            "/lists/",
            { name: listName },
            {
              headers: { Authorization: `Bearer ${access}` },
            }
          )
          .then(async (res) => {
            //Creates copy of state.lists and adds the new list
            const newLists = [...this.state.lists, res.data.newList];
            //Sets the new state values to reflect the change in the state
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
      //Makes post request to add new item if the name of triggered element name is itemForm
      if (name === "itemForm") {
        //Gets string from the item input field
        const itemValue = this.state.itemField.slice(0);
        //Sends itemValue in a post request
        await axios
          .post(
            `/lists/${this.state.listId}`,
            { value: itemValue },
            {
              headers: { Authorization: `Bearer ${access}` },
            }
          )
          .then(async (res) => {
            //Creates a copy of the listIndex.items to add the new item
            const newItems = [
              ...this.state.lists[this.state.listIndex].items,
              res.data.newItem,
            ];
            //Makes copy of existing lists in state
            const lists = [...this.state.lists];
            //In the copy, goes to current listIndex and overrides its items with the newItems
            lists[this.state.listIndex].items = newItems;
            //Sets the state to reflect these changes
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
  //Sends delete request for specific item _id
  async itemClick(e, i, id) {
    e.preventDefault();
    if (this.state.listId && id) {
      await axios
        .delete("/lists/" + this.state.listId, {
          headers: { Authorization: `Bearer ${this.access}` },
          data: { itemId: id },
        })
        .then(async (res) => {
          //Makes copy of existing lists in state
          const lists = [...this.state.lists];
          //Makes copy of existing items in that list
          const items = lists[this.state.listIndex].items;
          //Deletes the item at the specific item index
          items.splice(i, 1);
          //Overrides the copied indexed lists items
          lists[this.state.listIndex].items = items;
          //Sets the state to reflect the changes in lists and items
          this.setState({
            lists: lists,
            items: items,
          });
        })
        .catch((err) => {
          console.log(err);
        });
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
