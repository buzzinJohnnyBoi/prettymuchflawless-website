import logo from './logo.svg';
import './App.css';
import Body from "./components/changeBody/main";
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './show/mainpages/home';
import About from './show/mainpages/about';
import Default from './show/mainpages/default';
import Nav from './show/nav/nav';

function App() {
  return (
  <BrowserRouter>
  <Routes>
      <Route path="/" element={<Nav />}>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route path="*" element={<Default />} />
      </Route>
      </Routes>
  </BrowserRouter>
  );
}

export default App;