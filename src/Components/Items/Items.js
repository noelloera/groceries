import React from "react";
import "./Items.css";

export default class Items extends React.Component {
    constructor(props){
        super(props);
        this.itemInput = React.createRef();
        this.focusItemInput = this.focusItemInput.bind(this)
    }
    focusItemInput(e){
        this.itemInput.current.focus();
      }
  //Should map the items within the lists
  render() {
    return (
      <div className="Items">
        <h1>Items:</h1>
        <button onClick={(e) => this.focusItemInput(e)}>+</button>
        <ul className="Items-List">{this.props.renderItems()}</ul>
        <form onSubmit={(e)=>{
            this.props.handleNewItem(e,this.itemInput.current.value)
            this.itemInput.current.value = null;
        }}>
            <input ref={this.itemInput}></input>
        </form>
      </div>
    );
  }
}
