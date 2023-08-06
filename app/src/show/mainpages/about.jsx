import React, { Component } from 'react';

class About extends Component {
    state = {  } 
    componentDidMount() {
        document.title = 'About';
    }
    componentWillUnmount() {
    }
    render() { 
        return (<h1>About</h1>);
    }
}
 
export default About;