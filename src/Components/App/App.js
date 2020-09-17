import React from "react";
import "./App.css";
//Components
import SplashScreen from "../SplashScreen/SplashScreen.js";
import Login from "../LogIn/Login.js";
import ItemLists from "../ItemLists/ItemLists.js";

export default class App extends React.Component {
  constructor(props){
    this.state={
      loading: true,
      loggedIn: false,
      token: "",
      user:[]
    }
  }
  componentDidMount(){
    try{  
      //should contain conditional which checks if token exists in local storage
      //After attempting the 
      if(this.state.token){

      }else{
        this.setState({loading: false})
      }
    }catch{

    }
  }
  //<Splashscreen if loading === true />
  //<Log In /> or <ItemLists /> if LoggedIn === true || false
  render() {
    return (
      <div className="App">
        <h1>Grocery List</h1>
        <ItemLists />
      </div>
    );
  }
}
