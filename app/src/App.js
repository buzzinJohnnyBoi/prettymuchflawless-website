import logo from './logo.svg';
import './App.css';
import Body from "./components/changeBody/main";
import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './show/mainpages/home';
import About from './show/mainpages/about';
import Default from './show/mainpages/default';
import Layout from './show/mainpages/Layout';
import Page from './show/mainpages/page';
import TestComp from './components/testcompenents/testpost';
import CreateNew from './show/mainpages/createNew';


class App extends Component {
  state = {
    currentLink: window.location.pathname.substring(1, window.location.pathname.length)
  }
  componentDidMount() {
    
  }
  getCurrentLink = (link) => {
    this.setState({ currentLink: link }, () => {
      // This function will be executed after the state is updated and the component has re-rendered.
      console.log(link); // This will be the correct link value
      console.log(this.state.currentLink); // This will also be the correct link value
    });
  }
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout getCurrentLink={this.getCurrentLink} />}>
            <Route exact path="/" element={<Page currentLink={this.state.currentLink}/>} />
            <Route exact path="/createNew" element={<CreateNew />} />
            {/* <Route exact path="/about" element={<About />} />
            <Route exact path="/page" element={<Page />} />
            <Route exact path="/test" element={<TestComp />} /> */}
            <Route path="*" element={<Page currentLink={this.state.currentLink} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;