import logo from './logo.svg';
import './App.css';
import Body from "./components/changeBody/main";
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './show/mainpages/home';
import About from './show/mainpages/about';
import Default from './show/mainpages/default';
import Layout from './show/mainpages/Layout';
import Page from './show/mainpages/page';
import TestComp from './components/testcompenents/testpost';
import CreateNew from './show/mainpages/createNew';

function App() {
  return (
  <BrowserRouter>
  <Routes>
      <Route path="/" element={<Layout />}>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/createNew" element={<CreateNew />} />
        {/* <Route exact path="/about" element={<About />} />
        <Route exact path="/page" element={<Page />} />
        <Route exact path="/test" element={<TestComp />} /> */}
        <Route path="*" element={<Page />} />
      </Route>
      </Routes>
  </BrowserRouter>
  );
}

export default App;