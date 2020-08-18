import React from 'react'
import "./Items.css"

export default class Items extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        //Should map the items within the lists
        return(
            <div>
                <h1>ITEMS:</h1>
            <ul>
                {this.props.renderItems()}
            </ul>
            </div>
        )
    }
}