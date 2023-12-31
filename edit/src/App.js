import './App.css';
import React, { Component, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/mainpages/Layout';
import Page from './components/mainpages/page';
import CreateNew from './components/mainpages/createNew';
import CreateNewArticle from'./components/mainpages/createNewArticle';
import Article from './components/mainpages/article';

class App extends Component {
  state = {
    currentLink: window.location.pathname.substring(1, window.location.pathname.length)
  }
  componentDidMount() {
    window.addEventListener("popstate", this.handlePopstate);
  }
  componentWillUnmount() {
    window.removeEventListener("popstate", this.handlePopstate);
  }
  handlePopstate = () => {
    this.getCurrentLink(window.location.pathname.substring(1, window.location.pathname.length))
    // Write your logic here to handle the back button click
  };
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
            <Route exact path="/createNewArticle" element={<CreateNewArticle />} />
            <Route path="*" element={<Page currentLink={this.state.currentLink} />} />
            <Route path="article" element={<Article currentLink={this.state.currentLink} />} />
            <Route path="article/:id" element={<Article currentLink={this.state.currentLink} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;