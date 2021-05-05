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
      newList: "",
      newItem: "",
      listId: null,
      username: null,
      lists: [],
      items: [],
    };
  }

  equal(a, b) {
    for (var i = 0, len = a.length; i < len; i++) {
      for (var j = 0, len2 = b.length; j < len2; j++) {
        if (a[i]._id === b[j]._id) {
          return true;
        } else {
          return false;
        }
      }
    }
  }
  async getLists(i) {
    const access = getAccess();
    await axios
      .get("/me", { headers: { Authorization: `Bearer ${access}` } })
      .then((res) => {
        this.setState({
          username: res.data.username,
          listId: res.data.lists[i]._id,
          lists: res.data.lists,
          items: res.data.lists[i].items,
        });
      })
      .catch((err) => {
        console.log(err);
        if (this.state.username) {
          clearAccess();
          this.props.history.push("/login");
        }
      });
  }
  async componentDidMount() {
    //Will refresh after comparison of items
    await this.getLists(0);
  }
  async componentDidUpdate() {}
  listClick(e, i) {
    e.preventDefault();
    this.setState({
      items: this.state.lists[i].items,
      listId: this.state.lists[i]._id,
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
  renderItems() {
    return this.state.items.map((item) => {
      return (
        <Elem
          id={item._id}
          key={item._id}
          name={item.value}
          onClick={(e, id) => {
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
      if (name === "newList") {
        const newList = this.state.newList.slice(0);
        await axios
          .post(
            "/lists/",
            { name: newList },
            {
              headers: { Authorization: `Bearer ${access}` },
            }
          )
          .then(async (res) => {
            this.setState({
              newList: "",
            });
            window.location = "/";
          })
          .catch((err) => {
            console.log(err);
            clearAccess();
            this.props.history.push("/login");
          });
      }
      if (name === "newItem") {
        const newItem = this.state.newItem.slice(0);
        await axios
          .post(
            `/lists/${this.state.listId}`,
            { value: newItem },
            {
              headers: { Authorization: `Bearer ${access}` },
            }
          )
          .then(async (res) => {
            this.setState({
              newItem: "",
            });
            window.location = "/";
          })
          .catch((err) => {
            console.log(err);
            clearAccess();
            this.props.history.push("/login");
          });
      }
    } else {
      this.props.history.push("/login");
    }
  }
  //The rendering of the List components can be made into a separate function
  render() {
    return (
      <div>
        <h1>Hello {this.state.username}, </h1>
        <button>+</button>

        <form
          name="newList"
          onSubmit={(e) => {
            this.submit(e);
          }}
        >
          {this.renderLists()}
          <InputField
            name="newList"
            type="text"
            value={this.state.newList}
            onChange={(e) => {
              this.change(e);
            }}
          />
        </form>
        <button>+</button>
        <form
          name="newItem"
          onSubmit={(e) => {
            this.submit(e);
          }}
        >
          {this.renderItems()}
          <InputField
            name="newItem"
            type="text"
            value={this.state.newItem}
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
