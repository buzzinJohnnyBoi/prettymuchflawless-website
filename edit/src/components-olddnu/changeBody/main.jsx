import CustomContentMenu from "../customContextMenu/menu";
import React, { Component } from 'react';

class Body extends Component {
    state = {
        contextClick: {
            clickX: 0,
            clickY: 0,
            visable: false,
        }
    }
    rightClick = (e) => {
        e.preventDefault();
        this.setState({ contextClick: { clickX: e.clientX, clickY: e.clientY, visable: true } });
    }
    render() { 
        return (
            <div onContextMenu={this.rightClick}>
              <CustomContentMenu 
                x={this.state.contextClick.clickX}
                y={this.state.contextClick.clickY}
                visable={this.state.contextClick.visable}
              />
              <h1>John</h1>
              <h1>John</h1>
              <h1>John</h1>
              <h1>John</h1>
              <h1>John</h1>
            </div>
        );
    }
}
 
export default Body;