import React from "react";
import "./Items.css";

export default class Items extends React.Component {
  constructor(props) {
    super(props);
    //State must contain the values reflected in the elements
    this.state = {
      input: "",
    };
    //Element references
    this.itemInput = React.createRef();
    //Method Binding:
    this.focus = this.focus.bind(this);
  }
  //Methods:
  focus(e) {
    this.itemInput.current.focus();
  }

  //Render:
  render() {
    return (
      <div className="Items">
        <h1>Items:</h1>
        <button onClick={(e) => this.focus(e)}>+</button>
        <ul className="Items-List">{this.props.renderItems()}</ul>
        <form
          onSubmit={(e) => {
            this.props.newItem(e, this.state.input.slice());
            this.setState({ input: "" });
          }}
        >
          <input
            ref={this.itemInput}
            value={this.state.input}
            onChange={(e) => {
              this.setState({ input: e.target.value });
            }}
          ></input>
        </form>
      </div>
    );
  }
}
