import React, { Component } from 'react';

class Default extends Component {
    state = {  } 
    componentDidMount() {
        document.title = 'Page not found';
    }
    render() { 
        return (<h1>Page not found</h1>);
    }
}
 
export default Default;