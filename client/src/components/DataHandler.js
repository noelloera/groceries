import React from "react";
import axios from "axios";
import { getAccess, clearAccess } from "../helpers/jwt";
import ListedElement from "./ListedElement.js";
//React Router
import { withRouter } from "react-router-dom";
//Imports the items component
import ListsAndItems from "./ContentDisplay";
class DataHandler extends React.Component {
  access = getAccess();
  constructor(props) {
    super(props);
    let data = this.props.data;
    this.state = {
      listField: "",
      itemField: "",
      isList: true,
      listId: data ? data.lists[0]._id : null,
      listName: "",
      listIndex: 0,
      username: data.username,
      lists: data ? data.lists : [],
      items: data ? data.lists[0].items : [],
    };
    this.getData = this.getData.bind(this);
    this.itemClick = this.itemClick.bind(this);
    this.listClick = this.listClick.bind(this);
    this.renderAll = this.renderAll.bind(this);
    this.change = this.change.bind(this);
    this.submit = this.submit.bind(this);
    this.goBack = this.goBack.bind(this);
    this.changeItem = this.changeItem.bind(this);
    this.changeList = this.changeList.bind(this);
    this.setCurrent = this.setCurrent.bind(this);
    this.listDelete = this.listDelete.bind(this);
  }

  getData() {
    const access = getAccess();
    axios
      .get("/me", { headers: { Authorization: `Bearer ${access}` } })
      .then((res) => {
        let data = res.data;
        let lists = [...this.state.lists];
        //Stringifies all items in the state
        let currentListItems = "";
        for (let i = 0; i < lists.length; i++) {
          for (let j = 0; j < lists[i].items.length; j++) {
            currentListItems += JSON.stringify(lists[i].items);
          }
        }
        //Stringifies all items in the response data
        let responseListItems = "";
        for (let i = 0; i < data.lists.length; i++) {
          for (let j = 0; j < data.lists[i].items.length; j++) {
            responseListItems += JSON.stringify(data.lists[i].items);
          }
        }
        if (currentListItems !== responseListItems) {
          console.log("difference in items");
          this.setState({
            lists: data.lists,
            items: data.lists[this.state.listIndex].items,
          });
        }
        if (data.lists.length !== lists.length) {
          this.setState({
            lists: data.lists,
            items: data.lists[this.state.listIndex].items,
          });
        } else {
          return;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    setInterval(this.getData, 120000);
  }
  //Will update the state with new data
  /*
  async componentDidUpdate(prevProps, prevState) {
    //Should also update the items in the current chosen list like listClick
    if (
      this.state.lists.length !== prevState.lists.length ||
      this.state.items.length !== prevState.items.length
    ) {
      this.getData().then((data) => {
        console.log(data);
      });
    }
  }*/
  //Sets the listId to the current index of the list object
  async listClick(e, i) {
    e.preventDefault();
    let items = [...this.state.lists[i].items];
    //Sets the items to the current items
    this.setState({
      isList: false,
      items: items,
      listId: this.state.lists[i]._id,
      listIndex: i,
      listName: this.state.lists[i].name,
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
  changeItem(e, i) {
    e.preventDefault();
    let items = [...this.state.items];
    let item = items[i];
    item.value = e.target.value.slice(0);
    items[i] = item;
    this.setState({
      items: items,
    });
  }
  changeList(e, i) {
    this.setState({
      currentList: e.target.value.slice(0),
    });
  }
  setCurrent(value) {
    this.setState({
      currentList: value,
    });
  }
  //Renders by mapping each of the existing list objects
  renderAll() {
    const isList = this.state.isList;
    const type = isList ? [...this.state.lists] : [...this.state.items];
    return type.map((item, i) => {
      return (
        <ListedElement
          id={item._id}
          index={i}
          click={isList ? this.listClick : this.itemClick}
          isList={this.state.isList}
          value={isList ? item.name : this.state.items[i].value}
          currentList={isList ? this.state.currentList : null}
          onChange={isList ? this.changeList : this.changeItem}
          submit={this.submit}
          setCurrent={isList ? this.setCurrent : null}
          delete={isList ? this.listDelete : null}
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
  async submit(e, i, id) {
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

      //itemEdit
      if (name === "itemEdit") {
        let items = [...this.state.items];
        let item = items[i];
        let itemValue = item.value;
        if (itemValue !== "" && itemValue) {
          const edittedItems = [...this.state.items];
          await axios
            .put(
              `/lists/${this.state.listId}`,
              { items: edittedItems, itemId: item._id },
              { headers: { Authorization: `Bearer ${access}` } }
            )
            .then(async (res) => {
              const newItems = res.data.newItems;
              //Makes copy of existing lists in state
              const lists = [...this.state.lists];
              //In the copy, goes to current listIndex and overrides its items with the newItems
              lists[this.state.listIndex].items = newItems;
              this.setState({
                lists: lists,
                items: newItems,
                currentItem: itemValue,
              });
              this.props.history.push("/lists");
            })
            .catch((err) => {
              console.log(err);
              clearAccess();
              this.props.history.push("/login");
            });
        }
        if (itemValue === "" || itemValue === " ") {
          this.itemClick(e, i, item._id);
        }
      }
      //listEdit
      if (name === "listEdit") {
        const newListName = this.state.currentList.slice(0);
        if (newListName !== "" && newListName && id) {
          await axios
            .put(
              `/lists/`,
              { listId: id, listName: newListName },
              { headers: { Authorization: `Bearer ${access}` } }
            )
            .then(async (res) => {
              const lists = [...this.state.lists];
              const list = this.state.lists[i];
              list.name = newListName;
              lists[i] = list;
              //In the copy, goes to current listIndex and overrides its items with the newItems
              this.setState({
                lists: lists,
                currentList: "",
              });
              this.props.history.push("/lists");
            })
            .catch((err) => {
              console.log(err);
              clearAccess();
              this.props.history.push("/login");
            });
        }
        if (newListName === "" || newListName === " ") {
          alert("Cant change the list name to an empty value");
          return;
        }
      }
    } else {
      //If there is no access token user pushed to the authenticator component
      this.props.history.push("/authenticator");
    }
  }
  goBack(e) {
    e.preventDefault();
    this.setState({
      isList: true,
    });
  }

  //Sends delete request for specific list _id
  async listDelete(e, i, id) {
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
          clearAccess();
          alert(err);
          this.props.history.push("/login");
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
        editModal={this.editModal}
      />
    );
  }
}

export default withRouter(DataHandler);
