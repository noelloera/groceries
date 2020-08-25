import React from "react";
import "./App.css";
//Components
import SplashScreen from "../SplashScreen/SplashScreen.js";
import LogIn from "../LogIn/LogIn.js";
import ItemLists from "../ItemLists/ItemLists.js";
import Items from "../Items/Items.js";
import Editor from "../Editor/Editor.js";

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>Grocery List</h1>
        <ItemLists />
      </div>
    );
  }
}
