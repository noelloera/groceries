import React from "react";
import axios from "axios";
import { getAccess, clearAccess } from "../helpers/jwt";
import Elem from "./ListedElement.js";
//React Router
import { withRouter } from "react-router-dom";
//Imports the items component
import ListsAndItems from "./ContentDisplay";
class DataHandler extends React.Component {
  access = getAccess();
  constructor(props) {
    super(props);
    this.state = {
      listField: "",
      itemField: "",
      isList: true,
      listId: null,
      listName: "",
      listIndex: 0,
      username: null,
      lists: [],
      items: [],
    };
    this.getLists = this.getLists.bind(this);
    this.itemClick = this.itemClick.bind(this);
    this.listClick = this.listClick.bind(this);
    this.renderAll = this.renderAll.bind(this);
    this.change = this.change.bind(this);
    this.submit = this.submit.bind(this);
    this.goBack = this.goBack.bind(this);
  }
  //Helper function uses locally stored tokens to make secure axios calls
  async getLists() {
    //Makes a get request to server for user data
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
        ? //If there is existing lists, they are set to the state
          this.setState({
            username: data.username,
            listId: data.lists[0]._id,
            listIndex: 0,
            lists: data.lists,
            items: data.lists[0].items,
          })
        : //Else there is no lists and only the username sets, and list index is 0
          this.setState({
            username: data.username,
            listIndex: 0,
          });
    });
  }
  //Will update the state with new data
  async componentDidUpdate(prevProps, prevState) {
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
      isList: false,
      items: this.state.lists[i].items,
      listId: this.state.lists[i]._id,
      listIndex: i,
      listName: this.state.lists[i].name,
    });
  }
  //Renders by mapping each of the existing list objects
  renderAll() {
    const isList = this.state.isList;
    const type = isList ? this.state.lists : this.state.items;
    return type.map((item, i) => {
      return (
        <Elem
          id={item._id}
          index={i}
          name={isList ? item.name : item.value}
          onClick={isList ? this.listClick : this.itemClick}
          isList={this.state.isList}
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
  async edit(e, i, id, elemId) {
    //conditional based on the elemId
  }
  goBack(e) {
    e.preventDefault();
    this.setState({
      isList: true,
    });
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
          alert(err);
        });
    }
  }
  //Sends delete request for specific list _id
  async listDelete(e, id, i) {
    e.preventDefault();
    if (i && id) {
      await axios
        .delete("/lists/", {
          headers: { Authorization: `Bearer ${this.access}` },
          data: { listId: id },
        })
        .then(async (res) => {
          //Makes copy of existing lists in state
          const lists = [...this.state.lists];
          //Deletes the list at the provided index
          lists.splice(i, 1);
          //Makes sure the new list index is not less than 0
          let newIndex = i - 1;
          if (newIndex < 0) newIndex = 0;
          //Overrides the copied indexed lists items
          const items = lists[newIndex].items;
          //Sets the state to reflect the changes in lists and items
          this.setState({
            lists: lists,
            listIndex: newIndex,
            items: items,
          });
        })
        .catch((err) => {
          console.log(err);
          alert(err);
        });
    }
  }
  //The rendering of the List components can be made into a separate function
  /* Add the listname to the rendered comp to display on top
        listName={this.state.lists[this.state.listIndex].name}*/
  render() {
    const isList = this.state.isList;
    return (
      <ListsAndItems
        username={this.state.username}
        listName={this.state.listName}
        change={this.change}
        submit={this.submit}
        goBack={this.goBack}
        value={isList ? this.state.listField : this.state.itemField}
        renderAll={this.renderAll}
        isList={this.state.isList}
      />
    );
  }
}

export default withRouter(DataHandler);
