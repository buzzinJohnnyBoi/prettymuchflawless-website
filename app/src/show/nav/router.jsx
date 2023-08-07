import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './show/mainpages/home';
import Layout from './show/mainpages/Layout';
import Page from './show/mainpages/page';
import TestComp from './components/testcompenents/testpost';
import CreateNew from './show/mainpages/createNew';

class Router extends Component {
    state = {  } 
    async updateNavLinks() {
        console.log("yo");
        try {
            let res = await Axios.post('http://192.168.1.240:3003/getAllPageNames', {text: "you bro"});
            console.log(res);
            if(this.state.editMode == true) {
                res.data.push({name: 'Create New page', link: 'createNew'})
            }
            this.setState({
                links: res.data,
            })
        }
        catch(error) {
            console.log(error);
        }
    }
    render() { 
        return (
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
        );
    }
}
 
export default Router;