import React, { Component } from 'react';
import {Outlet} from "react-router-dom";
import Nav from "../nav/nav";
import Footer from "../footer/footer";

class Layout extends Component {
  state = {  } 
  getCurrentLink = (link) => {
    this.props.getCurrentLink(link)
  }
  render() { 
    return (
      <>
        <Outlet />
        <Nav getCurrentLink={this.getCurrentLink}/>
        <Footer />
      </>
    );
  }
}
 
export default Layout;