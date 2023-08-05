import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";
import {Outlet} from "react-router-dom";
import mainImg from './src/mainimg.jpg';

class Nav extends Component {
    state = { 
        links: [
            {
                name: "Home", 
                link: "/"
            }, 
            {
                name: "About", 
                link: "/About"
            }, 
            {
                name: "Games/Apps", 
                link: "/gamesApps"
            },
        ],
    } 
    render() { 
        const links = this.renderLinks();
        return (links);
    }
    renderLinks() {
        return (
            <>
                <img src={mainImg}></img>
                <ul>
                    {this.state.links.map(link => <li key={link.name}><Link to={link.link} key={link.name}>{link.name}</Link></li>)}
                </ul>
                <Outlet />
            </>
        );
    }
}
 
export default Nav;